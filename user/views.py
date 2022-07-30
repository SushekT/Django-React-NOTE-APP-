from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from note.permission import IsCollaborationOwner

from user.models import Collaborations
from user.serializer import CollaborationSerializer, CreateCollaborationSerializer, RegisterSerializations, UserSerializer
# Create your views here.


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializations
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully"
        })

class AddColloaborations(generics.ListCreateAPIView):
    queryset = Collaborations.objects.all()
    serializer_class = CreateCollaborationSerializer
    authentication_classes = [JWTAuthentication,BasicAuthentication, ]
    permission_classes = [IsAuthenticated, IsCollaborationOwner, ]


    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            collaborators = request.data['collaborators'],
            notes = kwargs.get('note_id')
        )
        return Response({'message':'Collaboration Added.'})

    def get_queryset(self):
        return super().get_queryset().select_related('notes__user', 'collaborators').filter(notes_id=self.kwargs['note_id'])


class UpdateDeleteCollobaorations(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collaborations.objects.all()
    serializer_class = CollaborationSerializer
    authentication_classes = [BasicAuthentication, ]
    permission_classes = [IsAuthenticated, IsCollaborationOwner]

    def perform_update(self, serializer):
        """
        Gets the object and update partially

        You may override this if you need to perform
        custom update. Default returns serializers
        """
        serializer.save(notes_id=self.kwargs.get('pk'))
