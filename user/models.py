from django.db import models

from note.models import Note
from django.contrib.auth.models import User

from user.constatnts import PERMISSION_TYPE

# Create your models here.


class Collaborations(models.Model):
    notes = models.ForeignKey(Note, on_delete=models.SET_NULL, null=True)
    collaborators = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    permission = models.CharField(choices=PERMISSION_TYPE, max_length=10)

    def __str__(self):
        return f'{self.notes.user} had collaborated with {self.collaborators}'
