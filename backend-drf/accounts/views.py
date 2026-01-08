from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView): # This CreateAPIView is used to add the User objects into the DB
    queryset = User.objects.all() # This fetches the all users of User model/table, where it uses a postgres query internally 
    serializer_class = UserSerializer
    # permission_classes = [AllowAny] # This statement makes our RegisterView class accessable to every user, where AllowAny is a class of permissions sub-package of main package rest_framework
    permission_classes = [] # This same as the above statement
