from rest_framework import serializers
from rest_framework.fields import ReadOnlyField, SerializerMethodField
from user.serializer import CollaborationSerializer, UserProfileSerializer, UserSerializer

from user.models import Collaborations, UserProfile

from .models import *

class NoteSerializer(serializers.ModelSerializer):
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

class CreateCollaborationSerializer(serializers.ModelSerializer):
    collaborators = UserSerializer(read_only=True, allow_null=True, required=False)
    collaborators_id = serializers.IntegerField(write_only=True)
    notes = NoteSerializer(read_only=True)
    notes_id = serializers.IntegerField(write_only=True)

    class Meta:
        
        model = Collaborations
        fields = '__all__'

    # def create(self,validated_data): 
    #     validated_data['collaborators'] = User.objects.get(
    #         email=validated_data.pop('collaborators')
    #     )

    #     validated_data['notes'] = Note.objects.get(  
    #           id = validated_data.pop('notes')
    #     )
    #     
    #     return Collaborations.objects.get_or_create(
    #         **validated_data,
    #     )
        
        