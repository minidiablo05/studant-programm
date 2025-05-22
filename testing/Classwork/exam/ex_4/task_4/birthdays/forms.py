from django import forms
from .models import Birthday
from django.core.exceptions import ValidationError

class BirthdayForm(forms.ModelForm):
    class Meta:
        model = Birthday
        fields = '__all__'
        widgets = {
            'birthday': forms.DateInput(attrs={'type': 'date'})
        }

    def clean_first_name(self):
        first_name = self.cleaned_data['first_name']
        return first_name.strip().title()

    def clean_last_name(self):
        last_name = self.cleaned_data['last_name']
        return last_name.strip().title() if last_name else ''