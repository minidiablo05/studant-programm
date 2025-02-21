from datetime import datetime


def check_correct_data(package):
    global Last_storage_data
    global counter

    # Проверка на пакет меньшей или большей длины.
    if len(package) != 2:
        print("Не верная длина запроса")
        return 0

    time = package[0]
    heart_rate = package[1]

    if time == '':
        print("Время несодержит значений")
        return 0

    time_split = time.split(sep=':')

    if len(time_split) != 3:
        print("Недостаёт значения времени")
        return 0

    for time_split_one in time_split:
        if time_split_one == '':
            print("Время содержит пустое значение")
            return 0

    if heart_rate == '':
        print("ЧСС содержит пустое значение")
        return 0

    time = datetime.strptime(package[0], "%H:%M:%S")
    heart_rate = package[1]

    if Last_storage_data >= time:
        if counter == 0:
            counter = 1
            if Last_storage_data != datetime.strptime('00:00:00', "%H:%M:%S"):
                print("Несоответствие времени")
                return 0
        else:
            print("Несоответствие времени")
            return 0

    Last_storage_data = time

    return 1


def recommendation(package):
    heart_rate = int(package[1])
    if heart_rate >= 100:
        message = "Осторожно что-то не так! Обратитесь к врачу."
    elif heart_rate >= 80:
        message = "Осторожно успокойтесь!"
    elif heart_rate >= 60:
        message = "Хороший результат, Вы движетесь в правильном направлении!"
    else:
        message = "Главное — быть активным!"

    return message


def print_result(package, message):
    print(f'\nВремя: {package[0]}. \n'
          f'Частота сердечных сокращений за сегодня: {package[1]}уд/мин. \n'
          f'{message}\n'
          )


def accept_package(package):
    result_check = check_correct_data(package)
    if result_check:
        message = recommendation(package)
        print_result(package, message)
        storage_data.update({package[0]: package[1]})

        return storage_data
    return storage_data


if __name__ == "__main__":
    package = input("Введите кортеж: Если нажать"
                    " enter будет введино это: (\'10:15:30\', 70)")
    if package == '':
        package = ("10:15:30", "70")
    else:
        package = package.replace('"', '')
        package = package.replace('\'', '')
        package = package.replace('(', '')
        package = package.replace(')', '')
        package = package.replace(' ', '')
        package = package.replace(' ', '')
        package_split = package.split(sep=',')
        package = (package_split[0], package_split[1])

    # packages = [
    #     ("00:00:00", "14"),
    #     ("00:00:00", "14"),
    #     ("10:15:30", "70"),
    #     ("11:20:45"),
    #     ("12:35:", "85"),
    #     ("13:50:15", ""),
    #     ("145:30", "65"),
    #     ("15:20:45", "140"),
    #     ("15:20:45", "14")
    # ]
    storage_data = {}
    Last_storage_data = datetime.strptime('00:00:00', "%H:%M:%S")
    counter = 0

    # for package in packages:
    storage_data = accept_package(package)
