from django.db import models

class Birthday(models.Model):
    first_name = models.CharField(verbose_name='Имя', max_length=20)
    last_name = models.CharField(
        verbose_name='Фамилия', blank=True, help_text='Необязательное поле', max_length=20
    )
    birthday = models.DateField(verbose_name='Дата рождения')

    class Meta:
        verbose_name = 'День рождения'
        verbose_name_plural = 'Дни рождения'
        ordering = ['birthday']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'