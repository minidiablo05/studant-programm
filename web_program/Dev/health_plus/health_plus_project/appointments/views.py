from django.http import HttpResponse


def hello(request):
    return HttpResponse("Добро пожаловать.")


def appointment_list(request):
    """ Отображает список всех записей на прием. """
    # Заглушка: Возвращаем текстовое сообщение
    return HttpResponse("Список всех записей на прием.")


def appointment_detail(request, appointment_id):
    """ Отображает детали конкретной записи на прием. """
    # Заглушка: Возвращаем текстовое сообщение с ID записи
    return HttpResponse(f"Детали записи на прием с ID: {appointment_id}.")


def create_appointment(request):
    """ Форма для создания новой записи на прием. """
    # Заглушка: Возвращаем текстовое сообщение
    return HttpResponse("Форма для создания новой записи на прием.")
