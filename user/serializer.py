from wsgiref import validate
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist

from note.models import Note
# djoser
from djoser.serializers import UserCreateSerializer, TokenCreateSerializer

from user.models import Collaborations, UserProfile

# TOKEN OBTAIN WITH EMAIL LOGIN


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id',  'email', 'username', 'password')


# USER SERIALIZATION GET
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = 'Users'
        model = User
        fields = ['id', 'email', 'username',
                  'first_name', 'last_name', 'date_joined', ]


class CollaborationSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    collaborators = UserSerializer()

    class Meta:

        model = Collaborations
        fields = ['profile',
                  'permission', 'collaborators']

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

    class Meta:

        model = Collaborations
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'isfirst_login', 'profile_pic']
