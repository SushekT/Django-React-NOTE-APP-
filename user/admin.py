from django.contrib import admin
from .models import Collaborations, UserProfile

# Register your models here.
admin.site.register(Collaborations)
admin.site.register(UserProfile)