from wsgiref import validate
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist

from note.models import Note
#djoser
from djoser.serializers import UserCreateSerializer

from user.models import Collaborations, UserProfile

# TOKEN OBTAIN WITH EMAIL LOGIN

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id',  'email', 'username', 'password')

# Resgister Serializations
class RegisterSerializations(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['email'],
            email=validated_data['email'], password=make_password(validated_data['password']))
        return user


# USER SERIALIZATION GET
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'date_joined', ]


class CollaborationSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        
        model = Collaborations
        fields = ['collaborators','profile', 'permission']

    def get_profile(self, obj):
        try:
            profile = UserProfile.objects.get(user=obj.collaborators)
            serializer = UserProfileSerializer(profile, many=False)
            return serializer.data
        except ObjectDoesNotExist:
            return None
            
        # ToDo items belong to a parent list, and have an ordering defined
        # by the 'position' field. No two items in a given list may share
        # the same position.
    
class CreateCollaborationSerializer(serializers.ModelSerializer):
    collaborators = UserSerializer(many=True,read_only=True, allow_null=True, required=False)
    
    class Meta:
        
        model = Collaborations
        fields = '__all__'

    def create(self,validated_data):   
        validated_data['collaborators'] = User.objects.get(
            email=validated_data.pop('collaborators')
        )

        validated_data['notes'] = Note.objects.get(  
              id = validated_data.pop('notes')
        )
        return Collaborations.objects.get_or_create(
            **validated_data,
        )
        
        
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
         model = UserProfile
         fields = ['id', 'username', 'isfirst_login','imageURL']    

    def get_username(self, data):
        return data.user.username