# Задание 1.

def all_sum(data):
    # Конкатенирует все элементы списка, приводя их к строкам.
    result = ''
    for i in data:
        result += str(i)
    return result


def test_1():
    mixed_numbers = [1, 2.3, 5]     # Список из int и float.
    result_numbers = '12.35'
    result_function = all_sum(mixed_numbers)
    assert result_function == result_numbers, (
        'Функция series_sum() некорректно обрабатывает смешанный список из int и float.'
    )


def test_2():
    mixed_numbers_strings = [1, '2.3', 5]   # Cписок из чисел и строк.
    result_numbers_strings = '12.35'    # Ожидаемый результат, который должна вернуть series_sum().
    assert result_numbers_strings == all_sum(mixed_numbers_strings), (
        'Функция series_sum() некорректно обрабатывает смешанный список из чисел и строк.'
    )


def test_3():
    empty = []  # Пустой список.
    result_empty = ''   # Ожидаемый результат, который должна вернуть series_sum().
    assert result_empty == all_sum(empty), (
        'Функция series_sum() некорректно обрабатывает пустой список'
    )


test_1()
test_2()
test_3()

# Задание 2.


class Patient:

    def __init__(self, name, year_birth, is_healthy):
        self.name = name
        self.year_birth = year_birth
        self.is_healthy = is_healthy

    def age_category_define(self):
        if 1946 < self.year_birth < 1980:
            return 'Взрослый'
        if self.year_birth >= 1980:
            return 'Молодой'
        return 'Пожилой'

    def health_status_define(self):
        if self.is_healthy:
            return 'Здоров'
        return 'Болен'

    def show_patient(self):
        return (
            f'{self.name}, '
            f'возраст: {self.age_category_define()}, '
            f'статус: {self.health_status_define()}'
        )


test_ung_unhealthy = Patient('Степан', 2005, True)
assert test_ung_unhealthy.health_status_define() == 'Здоров', (
    'Со статусом проблема'
    )
assert test_ung_unhealthy.age_category_define() == 'Молодой', (
    'С возрастом проблеммы'
    )

test_old_unhealthy = Patient('Степан', 1940, False)

assert test_old_unhealthy.health_status_define() == 'Болен', (
    'Со статусом проблема'
    )
assert test_old_unhealthy.age_category_define() == 'Пожилой', (
    'С возрастом проблеммы'
    )
