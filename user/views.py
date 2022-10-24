from urllib import response
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from note.models import Note
from note.permission import IsCollaborationOwner, IsCollaborationOwnerPatch, IsNoteOwner
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from djoser.views import UserViewSet
from djoser import signals
from djoser.compat import get_user_email
from djoser.conf import settings

from user.models import Collaborations, UserProfile
from user.serializer import CollaborationSerializer, CreateCollaborationSerializer, UserProfileSerializer, UserSerializer
from activitylog.signal import log_user_login
from rest_framework import filters

from user.constatnts import PERMISSION_TYPE


class MyTokenObtainPairSerializer(TokenObtainSerializer):

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        log_user_login(self.user)

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterAPI(UserViewSet):

    def perform_create(self, serializer):
        user = serializer.save()
        UserProfile.objects.create(
            user=user,
            user__is_active=True
        )
        signals.user_registered.send(
            sender=self.__class__, user=user, request=self.request
        )
        context = {"user": user}
        to = [get_user_email(user)]
        if settings.SEND_ACTIVATION_EMAIL:
            settings.EMAIL.activation(self.request, context).send(to)
        elif settings.SEND_CONFIRMATION_EMAIL:
            settings.EMAIL.confirmation(self.request, context).send(to)


class AddColloaborations(generics.ListCreateAPIView):
    queryset = Collaborations.objects.all()
    serializer_class = CreateCollaborationSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, IsCollaborationOwner, ]

    def post(self, request, **kwargs):
        user = User.objects.get(email=request.data.get('collaborators'))
        note = Note.objects.get(id=kwargs.get('note_id'))
        data = {
            'collaborators': user.id,
            'notes': note.id
        }

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        serializer.save(
            collaborators=user,
            notes=note
        )
        return Response({'message': 'Collaboration Added.'})

    def get_queryset(self):
        return super().get_queryset().select_related('notes__user', 'collaborators').filter(notes_id=self.kwargs['note_id'])


class UpdateDeleteCollobaorations(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collaborations.objects.all()
    serializer_class = CollaborationSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, IsCollaborationOwnerPatch]

    def get_object(self):
        return Collaborations.objects.get(id=self.kwargs.get('note_id'))

    def perform_update(self, serializer):
        """
        Gets the object and update partially

        You may override this if you need to perform
        custom update. Default returns serializers
        """
        serializer.save(notes_id=self.kwargs.get('note_id'))

    def patch(self, request, *args, **kwargs):
        obj = self.get_object()
        data = request.data.get('permission')
        if data == 'READ_ONLY':
            obj.permission = PERMISSION_TYPE[0][1]
        elif data == 'EDITOR':
            obj.permission = PERMISSION_TYPE[1][1]
        obj.save()

        return Response({'message': 'Successfully Changed.'})


class ProfileViewUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserProfile.objects.filter(user__id=self.request.user.id).first()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        user_serilaizer = UserSerializer(
            instance.user, data=request.data, partial=partial)
        user_serilaizer.is_valid(raise_exception=True)
        self.perform_update(user_serilaizer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class UserView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__email', 'user__username']
