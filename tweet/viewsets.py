# -*- coding: utf-8 -*-
from rest_framework import viewsets
from .models import Tweet
from .serializer import TweetSerializer
class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
