from ninja import NinjaAPI , ModelSchema,Schema
from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from ninja.errors import HttpError
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate,login,logout
from .models import Todo
from typing import List
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.db import IntegrityError
from pydantic import EmailStr
api = NinjaAPI()

class TodoSchema(ModelSchema):
     class Meta:
          model=Todo
          fields=["id","text","date","status"]
          fields_optional = ["id"]
class UserRegisterSchema(Schema):
    username: str
    email: EmailStr
    password: str
@api.get("/hello")
def hello(request):
    return "Hello world"
@api.get("/id/{id}")
def param(request,id:int):
     return f"Hello {id}"
@api.get("/todo",response=List[TodoSchema])
def getTodo(request):
     allTodo=Todo.objects.all()
     return list(allTodo)
@api.post("/todo")
def postTodo(request,todo:TodoSchema):
     item=Todo.objects.create(**todo.dict())
     return {
          "id":item.id,
          "text":item.text,
            "date":item.date,
            "status":item.status
     }
     
class LoginSchema(Schema):
    username: str
    password: str

@api.post("/login")
def login_user(request, payload: LoginSchema):
    user = authenticate(username=payload.username, password=payload.password)
    if user is not None:
        login(request, user)
        response = HttpResponse(status=200)
        response.set_cookie(
            key='sessionid',
            value=request.session.session_key,
            httponly=True,
            secure=True,  # Use True in production to ensure cookie is sent over HTTPS
        )
        return response
    return {"error": "Invalid credentials"}, 401

@api.post("/logout")
def logout_user(request):
    logout(request)
    response = HttpResponse(status=200)
    response.delete_cookie('sessionid')
    return response

@api.get("/user")
def get_user(request):
    try:
        if request.user.is_authenticated:
            return {"id": request.user.id, "username": request.user.username}
        else:
            # If the user is not authenticated
            raise HttpError(401, "Not authenticated")
    except (PermissionDenied, ObjectDoesNotExist):
        # Handle cases where request.user or attributes are missing
        raise HttpError(401, "User information not accessible")
    except Exception as e:
        # Catch unexpected errors and return a 500 error
        raise HttpError(500, f"An unexpected error occurred: {str(e)}")
@api.post("/register")
def register_user(request, payload: UserRegisterSchema):
    try:
        user = User.objects.create(
            username=payload.username,
            email=payload.email,
            password=make_password(payload.password)  # Hash the password
        )
        user.save()
        return {"message": "User registered successfully!"}
    except IntegrityError:
        return {"error": "Username or email already exists"}, 400