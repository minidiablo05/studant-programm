from django.urls import path
from . import views

app_name = 'birthdays'

urlpatterns = [
    path('', views.BirthdayListView.as_view(), name='list'),
    path('add/', views.BirthdayCreateView.as_view(), name='add'),
    path('<int:pk>/edit/', views.BirthdayUpdateView.as_view(), name='edit'),
]