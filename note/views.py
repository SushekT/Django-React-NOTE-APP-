from django.shortcuts import render, redirect
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authentication import BasicAuthentication
from django.shortcuts import get_object_or_404

from note.filters import NoteFilter
from note.permission import IsNoteOwner

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
    authentication_classes = [BasicAuthentication, ]

    def get_queryset(self):
        return super().get_queryset().filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyNotesDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    authentication_classes = [BasicAuthentication, ]
    permission_classes = [IsAuthenticated, IsNoteOwner, ]

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
        serializer.save(updated=datetime.datetime.now())
