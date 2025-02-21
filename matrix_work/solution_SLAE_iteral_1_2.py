import numpy as np
import math
import matplotlib.pyplot as plt


def task_condition():
    n = int(input("Введите n:"))
    task1 = int(input("Нужно ли задать точность(по умолчанию 10^-6):\n\
                      если да введите 1;\n\
                      если нет введите 2."))

    if task1 == 1:
        tol = float(input("Введите число:"))
    else:
        tol = 1e-6

    task2 = int(input("Нужно ли задать кол-во итераций(по умолчанию 200):\n\
                    если да введите 1;\n\
                    если нет введите 2."))

    if task2 == 1:
        max_iter = int(input("Введите число:"))
    else:
        max_iter = 200

    return n, tol, max_iter


def create_f(n, f):
    '''Создаём столбец заполненный f(i,j) от 1 до n.'''
    hx = hy = 1/n
    count = 0
    for i in range(1, n):
        for j in range(1, n):
            x = i * hx
            y = j * hy
            f[count] = 25 * math.sin(10 * math.sqrt(x**2 + y**2))
            count += 1
    return f


def create_u0(n, u0):
    '''Создаём матрицу с краевыми условиями.'''
    hx = hy = 1/n
    for i in range(n+1):
        for j in range(n+1):
            x = i * hx
            y = j * hy
            u0[i, 0] = 0
            u0[0, j] = 0
            u0[i, n] = x
            u0[n, j] = y**2
    return u0


def create_b(n, b, f, h, u0):
    '''Создаём столбец заполненный b(i,j) от 1 до n,
      из которого вычитаем краевые условия
      '''
    count = 0
    for i in range(1, n):
        for j in range(1, n):
            if i == 1 and j == 1:
                b[count] = f[count]*h**2 - u0[i-1, j] - u0[i, j-1]
            elif i == 1 and j == n-1:
                b[count] = f[count]*h**2 - u0[i-1, j] - u0[i, j+1]
            elif i == n-1 and j == n-1:
                b[count] = f[count]*h**2 - u0[i+1, j] - u0[i, j+1]
            elif i == n-1 and j == 1:
                b[count] = f[count]*h**2 - u0[i+1, j] - u0[i, j-1]
            elif i == 1:
                b[count] = f[count]*h**2 - u0[i-1, j]
            elif i == n-1:
                b[count] = f[count]*h**2 - u0[i+1, j]
            elif j == 1:
                b[count] = f[count]*h**2 - u0[i, j-1]
            elif j == n-1:
                b[count] = f[count]*h**2 - u0[i, j+1]
            else:
                b[count] = f[count]*h**2
            count += 1
    return b


def minimize_residuals(A, b, x0, tol, max_iter):
    x = x0
    r = b - np.dot(A, x)
    while np.linalg.norm(r) > tol and max_iter:
        tay = np.dot(np.dot(A, r), r) / np.dot(np.dot(A, r), np.dot(A, r))
        x = x + tay * r
        r = b - np.dot(A, x)
        max_iter -= 1

    return x


def writing_matrix_to_a_file(n, u):
    with open("matrix.txt", "w") as file:
        file.write("row\tcolumn\tvalue\n")
        count = 0
        for i in range(1, n):
            for j in range(1, n):
                file.write(f"{i}\t{j}\t{u[count]}\n")
                count += 1


def create_3D_plot(n, u0):
    # Создание и заполнение массивов для координат и значений функции
    plt.style.use('_mpl-gallery-nogrid')
    X, Y = np.meshgrid(np.linspace(0, 1, n+1), np.linspace(0, 1, n+1))

    # Построение графика решения
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.plot_surface(X, Y, u0, cmap='viridis')
    ax.set_xlabel('y')
    ax.set_ylabel('x')
    ax.set_zlabel('u')
    plt.show()


def create_Gridded_data_plot(n, u0):
    plt.style.use('_mpl-gallery-nogrid')

    # make data
    X, Y = np.meshgrid(np.linspace(0, 1, n+1), np.linspace(0, 1, n+1))
    levels = np.linspace(u0.min(), u0.max(), n)
    # plot
    fig, ax = plt.subplots()
    ax.contourf(Y, X, u0, levels=levels)
    plt.show()


def main():
    print("начало программы")

    n, tol, max_iter = task_condition()

    h = 1/n
    long = (n-1)**2
    f = np.zeros(long)
    u0 = np.zeros((n+1, n+1))
    A = np.zeros((long, long))
    b = np.zeros(long)
    x0 = np.zeros(long)

    f = create_f(n, f)
    u0 = create_u0(n, u0)
    b = create_b(n, b, f, h, u0)

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

    '''Решаем СЛАУ'''
    u = minimize_residuals(A, b, x0, tol, max_iter)

    '''Записываем матрицу в фаил'''
    writing_matrix_to_a_file(n, u)

    '''Добовляем краевые условия на график'''
    count = 0
    for i in range(1, n):
        for j in range(1, n):
            u0[i, j] = u[count]
            count += 1

    '''3D график распредиления'''
    create_3D_plot(n, u0)

    '''Тепловая диограмма распредиления'''
    # create_Gridded_data_plot(n, u0)


main()
