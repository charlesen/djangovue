# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# My Poor Man's Twitter Model.
class Tweet(models.Model):
    tweet_id = models.AutoField(primary_key=True)
    tweet_message = models.CharField(max_length=50)
    tweet_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True) ==> Keeps it for Poor Man's Twitter V2 :-)


class Meta:
    ordering = ['-created_at']

    def __str__(self):
        return self.content
