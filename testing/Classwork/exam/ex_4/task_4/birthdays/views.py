from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Birthday
from .forms import BirthdayForm

class BirthdayListView(ListView):
    model = Birthday
    template_name = 'birthdays/birthday_list.html'
    context_object_name = 'birthdays'

class BirthdayCreateView(CreateView):
    model = Birthday
    form_class = BirthdayForm
    template_name = 'birthdays/birthday_form.html'
    success_url = reverse_lazy('birthdays:list')

class BirthdayUpdateView(UpdateView):
    model = Birthday
    form_class = BirthdayForm
    template_name = 'birthdays/birthday_form.html'
    success_url = reverse_lazy('birthdays:list')

class BirthdayDeleteView(DeleteView):
    model = Birthday
    template_name = 'birthdays/birthday_confirm_delete.html'
    success_url = reverse_lazy('birthdays:list')