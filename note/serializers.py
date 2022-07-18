from rest_framework import serializers
from rest_framework.fields import ReadOnlyField, SerializerMethodField
from user.serializer import CollaborationSerializer, UserProfileSerializer

from user.models import Collaborations, UserProfile

from .models import *

class NoteSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False)

    owner = serializers.SerializerMethodField()
    collaborators = serializers.SerializerMethodField()
    class Meta:
        model = Note
        fields = ['owner','id', 'body', 'updated', 'collaborators']

    def get_owner(self, data):
        profile = UserProfile.objects.get(user_id=data.user_id)
        serializer = UserProfileSerializer(profile, many=False)

        return serializer.data
    
    def get_collaborators(self, data):
        collab = Collaborations.objects.filter(notes_id=data.id)
        serializer = CollaborationSerializer(collab, many=True)

        return serializer.data
