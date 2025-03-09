from django.db import models


# Create your models here.


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)


class MedicalRecord(models.Model):
    record_details = models.TextField()


class Treatment(models.Model):
    treatment_name = models.CharField(max_length=100)


class Patient(models.Model):
    name = models.CharField(max_length=100, blank=False)
    age = models.IntegerField(blank=False)
    contact_info = models.CharField(max_length=255, blank=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patients')
    medical_record = models.OneToOneField(MedicalRecord, on_delete=models.CASCADE)


class PatientTreatment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE)
    date_started = models.DateField()
    notes = models.TextField(blank=True)


# class Patient(models.Model):
#     name = models.CharField(max_length=100, blank=False)
#     age = models.IntegerField(blank=False)
#     contact_info = models.CharField(max_length=255, blank=False)
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     medical_record = models.OneToOneField(MedicalRecord, on_delete=models.CASCADE)
#     treatments = models.ManyToManyField(Treatment)


