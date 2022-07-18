from rest_framework import serializers

from user.serializer import UserSerializer

from .models import *


class NoteSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False)

    class Meta:
        model = Note
        fields = ['id', 'body', 'updated', ]
