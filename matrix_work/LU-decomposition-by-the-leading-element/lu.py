import numpy as np
from fractions import Fraction


class LongEror(Exception):
    def __init__(self, int):
        self.int = int


def create_matrix():
    '''Функция забирает матрицу с клавиатуры'''
    try:
        long = int(input("Введите колличество столбцов:"))
        if long <= 1:
            raise LongEror(long)
        print("Введите матрицу А в одну строку (через пробел):")
        entries = list(map(str, input().split()))
        for i in range(len(entries)):
            entries[i] = Fraction(entries[i])
        A = np.array(entries, dtype=Fraction).reshape(long, long)
        print("Введите матрицу b в одну строку (через пробел):")
        entries = list(map(str, input().split()))
        for i in range(len(entries)):
            entries[i] = Fraction(entries[i])
        b = np.array(entries, dtype=Fraction).reshape(long)
        return A, b
    except LongEror:
        print("Число столбцов должно быть больше 1!")
        create_matrix()
    except ValueError:
        print("Вы где-то ошиблись!")
        create_matrix()


def lu_decomposition_with_column_pivoting(matrix):
    n = len(matrix)
    L = np.eye(n, dtype=Fraction)
    U = np.copy(matrix)
    Pt = np.eye(n, dtype=Fraction)

    for k in range(n-1):
        max_row = k
        max_val = abs(U[k, k])
        for i in range(k+1, n):
            if abs(U[i, k]) > max_val:
                max_val = abs(U[i, k])
                max_row = i
        if max_row != k:
            U[[k, max_row]] = U[[max_row, k]]
            Pt[[k, max_row]] = Pt[[max_row, k]]
            if k > 0:
                L[[k, max_row], :k] = L[[max_row, k], :k]

        for i in range(k+1, n):
            factor = U[i, k] / U[k, k]
            L[i, k] = factor
            U[i, k:] -= factor * U[k, k:]

    return L, U, Pt


def search_y(L, b):
    n = len(L)
    y = [0]*n

    for i in range(n):
        y[i] = (b[i] - sum(L[i][j]*y[j] for j in range(i)))/L[i][i]
    return y


def search_x(U, y):
    n = len(U)
    x = [0]*n

    for j in reversed(range(n)):
        x[j] = (y[j] - sum(U[j][k]*x[k] for k in range(j, n)))/U[j][j]
    return x


def printer_resul(x):
    result = []
    for i in range(len(x)):
        if x[i].denominator == 1:
            result.append(x[i].numerator)
        else:
            result.append(f'{x[i].numerator}/{x[i].denominator}')
    print("х равен:")
    print(result)


def primer():
    print('Решить СЛАУ с помощью LU '
          'разложения с выбором ведущего элемента', end='\n')
    print("Пример матрици:")
    A_primer = np.array([[2, 3, 0], [6, 8, 2], [4, 4, 5]])
    b_primer = np.array([-1, 2, 10])
    print("Матрица А:")
    print(A_primer)
    print("Матрица b:")
    print(b_primer)
    A = np.array([[Fraction('2'), Fraction('3'), Fraction('0')],
                  [Fraction('6'), Fraction('8'), Fraction('2')],
                  [Fraction('4'), Fraction('4'), Fraction('5')]],)
    b = np.array([Fraction('-1'), Fraction('2'), Fraction('10')])
    L, U, Pt = lu_decomposition_with_column_pivoting(A)
    b = np.dot(Pt, b)
    y = search_y(L, b)
    x = search_x(U, y)
    printer_resul(x)
    print("Далее калькулятор матриц!")
    main()


def main():
    print("\n\n\nВремя для новой матрици")
    A, b = create_matrix()
    L, U, Pt = lu_decomposition_with_column_pivoting(A)
    b = np.dot(Pt, b)
    y = search_y(L, b)
    x = search_x(U, y)
    printer_resul(x)
    main()


primer()
