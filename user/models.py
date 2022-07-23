from django.db import models

from note.models import Note
from django.contrib.auth.models import User

from user.constatnts import PERMISSION_TYPE

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    isfirst_login = models.BooleanField(default=True, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile')

    def __str__(self):
        return self.user.email

    @property
    def imageURL(self):
        try:
            url = self.profile_pic.url
        except Exception:
            url = ''

        return url


class Collaborations(models.Model):
    notes = models.ForeignKey(
        Note, on_delete=models.CASCADE, null=True, related_name='collaborations')
    collaborators = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True)
    permission = models.CharField(choices=PERMISSION_TYPE, max_length=10)

    def __str__(self):
        return f'{self.notes.user} had collaborated with {self.collaborators}'

    class Meta:
        unique_together = ('notes', 'collaborators')
