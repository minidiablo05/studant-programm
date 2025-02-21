import numpy as np
from scipy import linalg
import cmath
import math


def task_condition():
    n = int(input("Введите n:"))
    task1 = float(input("Нужно ли задать критерий остановки(по умолчанию 0,01):\n\
                      если да введите 1;\n\
                      если нет введите 2."))

    if task1 == 1:
        criteriy = float(input("Введите число:"))
    else:
        criteriy = 0.01

    task2 = int(input("Нужно ли задать кол-во максимальных итераций(по умолчанию 300):\n\
                    если да введите 1;\n\
                    если нет введите 2."))

    if task2 == 1:
        max_iter = int(input("Введите число:"))
    else:
        max_iter = 300

    return n, criteriy, max_iter


def gram_schmidt(A):
    '''QR-разложение с ортагонолизацией Грамма-Шмидта'''
    m, n = A.shape
    Q = np.zeros((m, n))
    R = np.zeros((n, n))
    for j in range(n):
        v = A[:, j]
        for i in range(j):
            R[i, j] = np.dot(Q[:, i], A[:, j])
            v = v - R[i, j] * Q[:, i]
        R[j, j] = np.linalg.norm(v)
        Q[:, j] = v / R[j, j]

    return Q, R


def main():
    print("начало программы")

    '''Задаемколичесиво итераций и размер матрици'''
    n, criteriy, max_iter = task_condition()

    long = (n-1)**2
    spicok_lamd = list()
    A = np.zeros((long, long)) #Единственное условие использования метода Qr алгоритмизации
                               # квадратичность матрици.

    '''Создаём матрицу А.'''
    index = n-1
    for i in range(0, long):
        A[i, i] = -4
        if i != long-1 and i % index != index-1:
            A[i, i+1] = 1
        if i <= long-n:
            A[i, i+index] = 1
        if i and i % index != 0:
            A[i, i-1] = 1
        if i > index - 1:
            A[i, i-index] = 1

    '''Поиск собственных чисел при помощи QR-алгоритма с использоманием
    метода Грама-Шмидта.'''
    criteriy_ostanovki = 10000
    iteration = 0
    while iteration < max_iter and math.sqrt(criteriy_ostanovki) > criteriy:
        criteriy_ostanovki = 0
        iteration += 1
        if n <= 30:
            Q, R = gram_schmidt(A)
        else:
            Q, R = linalg.qr(A, overwrite_a=True)   # Всилу скорости выполнения программы лучше выполнять
                                                    # встроенноев scilab qr-разложение с использованием
                                                    # модифицированного метода Грама-Шмидта "Modified Gram-Schmidt"
        A = np.dot(R, Q)
        for i in range(0, long-1):
            criteriy_ostanovki += A[i+1, i] * A[i+1, i]

    '''Поиск комплексных чисел.'''
    for i in range(0, long):
        for j in range(0, long):
            if i != 0 and i == j and abs(A[j, i-1]) > 0.1:
                D = (A[j, i] + A[j-1, i-1])**2 - 4*(A[j, i] * A[j-1, i-1] - A[j-1, i] * A[j, i-1])
                lamda1 = ((A[j, i] + A[j-1, i-1]) + cmath.sqrt(D))/2
                lamda2 = ((A[j, i] + A[j-1, i-1]) - cmath.sqrt(D))/2
                spicok_lamd.pop()
                spicok_lamd.append(lamda1)
                spicok_lamd.append(lamda2)
            if i == j:
                spicok_lamd.append(A[j, i])

    '''Вывод собственных чисел.'''
    for i in range(0, long):
        print(f'лямбда{i+1} = {spicok_lamd[i]}')

    with open("lamda.txt", "w") as file:
        file.write("lamda\tvalue\n")
        for i in range(0, long):
            file.write(f"{i+1}\t{spicok_lamd[i]}\n")


main()
