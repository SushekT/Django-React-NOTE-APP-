from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body or 'None'
