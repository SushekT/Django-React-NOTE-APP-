from re import L
from rest_framework import permissions
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from note.models import Note


class IsNoteOwner(permissions.BasePermission):
    """
    Object level permission to only allow allow of an object to edit it
    Assumes the model instance has an 'owner' attribute
    """

    def has_permission(self, request, view):

        return bool(request.user.id)

    def has_object_permission(self, request, view, obj):
        if obj.user.id == request.user.id:
            return True
        else:
            raise PermissionDenied()


class IsCollaborationOwner(permissions.BasePermission):
    """
    Object level permission to only allow allow of an object to edit it
    Assumes the model instance has an 'owner' attribute
    """

    def has_permission(self, request, view):

        # if view.get_queryset().filter(notes_id=request.user.id).exists():
        #     return True
        # return False
        # print(request.user.id)
        print(request.user)
        return bool(Note.objects.filter(id=view.kwargs['note_id'], user=request.user))

    def has_object_permission(self, request, view, obj):

        return bool(obj.notes.user.id == request.user.id)
