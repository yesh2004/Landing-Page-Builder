from django.db import models
from django.contrib.auth.models import User



# Create your models here.
class Todo(models.Model):
    text=models.CharField(max_length=400)
    date=models.DateField("date published")
    status=models.BooleanField(default=False)
'''class Pages(models.Model):
    title=models.CharField(max_length=1000)
    profile_pic=models.ImageField()
    name=models.CharField(max_length=500)
    about=models.TextField(max_length=4000)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)'''
