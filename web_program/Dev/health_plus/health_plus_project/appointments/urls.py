from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello),
    path('appointments/', views.appointment_list),
    path('appointments/<int:appointment_id>/', views.appointment_detail),
    path('appointments/create/', views.create_appointment),
]
