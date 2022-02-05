from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, permissions, mixins
from rest_framework_simplejwt.views import TokenObtainPairView

from user.serializer import RegisterSerializations, UserSerializer
# Create your views here.


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializations

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully"
        })
