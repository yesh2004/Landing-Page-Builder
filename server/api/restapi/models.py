from django.db import models
from django.contrib.auth.models import User
import uuid


# Create your models here.
class Todo(models.Model):
    text=models.CharField(max_length=400)
    date=models.DateField("date published")
    status=models.BooleanField(default=False)
class Pages(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)
    title=models.CharField(max_length=1000)
    profile_pic=models.ImageField(upload_to="profile_pics")
    name=models.CharField(max_length=500)
    about=models.TextField(max_length=4000)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    
class Projects(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)
    page_id=models.ForeignKey(Pages,on_delete=models.CASCADE)
    title=models.CharField(max_length=1000)
    desc=models.TextField()
class Experiences(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)
    page_id=models.ForeignKey(Pages,on_delete=models.CASCADE)
    title=models.CharField(max_length=1000)
    company=models.CharField(max_length=1000)
    period=models.CharField(max_length=1000)
    desc=models.TextField()