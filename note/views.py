from django.shortcuts import render, redirect
from rest_framework import serializers
from rest_framework import generics
from django.db.models import Q

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch

from note.filters import NoteFilter
from note.permission import IsNoteOwner
from user.models import Collaborations

from django.core.exceptions import PermissionDenied


from .models import *
from .serializers import *

# Create your views here.
# @api_view(['GET'])
# def getNote(request):
#     note = Note.objects.all()

#     serializers = NoteSerializer(note, many=True)
#     return Response(serializers.data)

# @api_view(['GET'])
# def getDetailNote(request, pk):
#     note = Note.objects.get(id=pk)
#     serializers = NoteSerializer(note, many= False)
#     return Response(serializers.data)

# @api_view(['POST'])
# def createNote(request):
#     note = Note.objects.create()
#     data = request.data
#     try:
#         note.updated = data['updated']
#         note.body = data['body']
#         note.save()
#         print(note.updated)
#     except:
#         pass
#     serializers = NoteSerializer(note, many=False)
#     return Response(serializers.data)

# @api_view(['PUT'])
# def updateNote(request, pk):
#     data = request.data

#     note = Note.objects.get(id = pk)
#     try:
#         note.updated = data['updated']
#         note.body = data['body']
#         note.save()
#         print(note.updated)
#     except:
#         pass


#     serializers = NoteSerializer(note, many= False)
#     return Response(serializers.data)

# @api_view(['DELETE'])
# def deleteNote(request, pk):
#     note = Note.objects.get(id=pk)

#     note.delete()

#     return Response('Deleted.')


class MyNotesListView(generics.ListCreateAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', ]
    ordering_fields = ['updated', ]
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return super().get_queryset().filter(Q(user=self.request.user) | Q(collaborations__collaborators=self.request.user))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyNotesDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication, ]
    permission_classes = [IsNoteOwner]

    def get_object(self):
        """
        Returns the object the view is displaying.

        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        return get_object_or_404(Note, id=self.kwargs['pk'])

    def perform_update(self, serializer):
        """
        Gets the object and update partially

        You may override this if you need to perform
        custom update. Default returns serializers
        """
        self.check_object_permissions(self, self.get_object())

        serializer.save(updated=datetime.datetime.now())

    def check_object_permissions(self, request, obj):
        """
        Check if the request should be permitted for a given object.
        Raises an appropriate exception if the request is not permitted.
        """

        if obj.user.id == self.request.user.id:
            return True
        try:
            if collaborations := Collaborations.objects.select_related('collaborators', 'notes__user').get(notes=obj, collaborators=self.request.user):
                if 'READ_ONLY' in collaborations.permission:
                    raise PermissionDenied
                return True
            raise PermissionDenied
        except:
            raise PermissionDenied
