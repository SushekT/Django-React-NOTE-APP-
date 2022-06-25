from rest_framework import serializers
from rest_framework.fields import ReadOnlyField, SerializerMethodField
from user.serializer import UserProfileSerializer

from user.models import UserProfile

from .models import *


class NoteSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = Note
        fields = ['profile','id', 'body', 'updated', ]

    def get_profile(self, data):
        profile = UserProfile.objects.get(user_id=data.user_id)
        serializer = UserProfileSerializer(profile, many=False)

        return serializer.data