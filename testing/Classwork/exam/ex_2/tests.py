import pytest
from datetime import datetime


class Patient:

    def __init__(self, name, birth, is_healthy):
        self.name = name
        self.birth = birth
        self.is_healthy = is_healthy

    def age_category_define(self):
        if 1946 < self.birth.year < 1980:
            return 'Взрослый'
        if self.birth.year >= 1980:
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

@pytest.fixture
def generate_berstday_data():
    data  = datetime.now()
    return {'data': data}


class TestExample:
    def test_low_year(self, generate_berstday_data):
        patient = Patient('Степан', generate_berstday_data['data'], True)
        assert patient.health_status_define() == 'Здоров', 'Со статусом проблема'
        assert patient.age_category_define() == 'Молодой', 'С возрастом проблемы'

    def test_2(self):
        patient = Patient('Степан', 1940, False)
        assert patient.health_status_define() == 'Болен', 'Со статусом проблема'
        assert patient.age_category_define() == 'Пожилой', 'С возрастом проблемы'
