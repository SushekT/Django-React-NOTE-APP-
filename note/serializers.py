from rest_framework import serializers
from rest_framework.fields import ReadOnlyField, SerializerMethodField

from .models import *

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'