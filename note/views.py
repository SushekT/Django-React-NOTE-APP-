from django.shortcuts import render, redirect
from rest_framework import serializers
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
def getNote(request):
    note = Note.objects.all()

    serializers = NoteSerializer(note, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getDetailNote(request, pk):
    note = Note.objects.get(id=pk)
    serializers = NoteSerializer(note, many= False)
    return Response(serializers.data)

@api_view(['POST'])
def createNote(request):
    note = Note.objects.create()
    data = request.data
    try:
        note.updated = data['updated']
        note.body = data['body']
        note.save()
        print(note.updated)
    except:
        pass
    serializers = NoteSerializer(note, many=False)
    return Response(serializers.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data

    note = Note.objects.get(id = pk)
    try:
        note.updated = data['updated']
        note.body = data['body']
        note.save()
        print(note.updated)
    except:
        pass



    serializers = NoteSerializer(note, many= False)
    return Response(serializers.data)

@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)

    note.delete()

    return Response('Deleted.')

