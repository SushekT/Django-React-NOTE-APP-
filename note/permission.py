from re import L
from rest_framework import permissions
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User


class IsNoteOwner(permissions.BasePermission):
    """
    Object level permission to only allow allow of an object to edit it
    Assumes the model instance has an 'owner' attribute
    """

    def has_permission(self, request, view):

        if request.user.id:
            return True
        return False

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

        if request.user.id:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.notes.user.id == request.user.id:
            return True
        else:
            raise PermissionDenied()
