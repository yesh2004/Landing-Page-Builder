from ninja import NinjaAPI , ModelSchema,Schema
from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from ninja.errors import HttpError
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate,login,logout
from .models import Todo,Pages,Projects,Experiences
from typing import List ,Optional
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.db import IntegrityError
from pydantic import EmailStr
import uuid
from ninja.security import django_auth
api = NinjaAPI()

# Project schema for nested structure
class ProjectSchema(Schema):
    id: uuid.UUID
    title: str
    desc: str

# Experience schema for nested structure
class ExperienceSchema(Schema):
    id: uuid.UUID
    title: str
    company: str
    period: str
    desc: str

# Page schema, including nested Projects and Experiences
class PageSchema(Schema):
    id: uuid.UUID
    title: str
    profile_pic: Optional[str]  # URL to the profile picture
    name: str
    about: str
    projects: List[ProjectSchema]
    experiences: List[ExperienceSchema]

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


class PageIn(Schema):
    title:str
@api.get("/pages",response=List[PageSchema])
def getPages(request):
    try:
        if request.user.is_authenticated:
            pages=Pages.objects.filter(user_id=request.user.id).prefetch_related("projects_set","experiences_set")

            results=[]
            for page in pages:
                results.append({
            "id": page.id,
            "title": page.title,
            "profile_pic": page.profile_pic.url if page.profile_pic else None,
            "name": page.name,
            "about": page.about,
            "projects": [
                {
                    "id": project.id,
                    "title": project.title,
                    "desc": project.desc,
                }
                for project in page.projects_set.all()
            ],
            "experiences": [
                {
                    "id": experience.id,
                    "title": experience.title,
                    "company": experience.company,
                    "period": experience.period,
                    "desc": experience.desc,
                }
                for experience in page.experiences_set.all()
            ]
        })

            return results
            
        else:
            # If the user is not authenticated
            raise HttpError(401, "Not authenticated")
    except (PermissionDenied, ObjectDoesNotExist):
        # Handle cases where request.user or attributes are missing
        raise HttpError(401, "User information not accessible")
    except Exception as e:
        # Catch unexpected errors and return a 500 error
        raise HttpError(500, f"An unexpected error occurred: {str(e)}")

class GetPageSchema(Schema):
    page_id:uuid.UUID

@api.get("/page/{id}",auth=django_auth)
def getPage(request,id:uuid.UUID):
    page=get_object_or_404(Pages,id=id,user_id=request.user.id)
    projects=Projects.objects.filter(page_id=page.id)
    experiences=Experiences.objects.filter(page_id=page.id)

    response={
        "id":page.id,
        "title":page.title,
        "profile_pic":page.profile_pic.url if page.profile_pic else None,
        "name":page.name,
        "about":page.about,
        "projects":[
            {
                "id":project.id,
                "title":project.title,
                "desc":project.desc
            }for project in projects
        ],
        "experiences": [
            {"id": experience.id, "title": experience.title, "company": experience.company, "period": experience.period, "desc": experience.desc}
            for experience in experiences
        ],
    }
    return response


@api.post("/createpage")
def createPage(request,payload:PageIn):
    try:
        if request.user.is_authenticated:
            page=Pages.objects.create(user_id=request.user,title=payload.title,name="john Doe",about="about")
            project=Projects.objects.create(page_id=page,title="project 1",desc="Description")
            experience=Experiences.objects.create(page_id=page,title="Experince 1",company="Innovative Tech",period="2012-2014",desc="Description")
            return {"message":"success"}
        else:
            # If the user is not authenticated
            raise HttpError(401, "Not authenticated")
    except (PermissionDenied, ObjectDoesNotExist):
        # Handle cases where request.user or attributes are missing
        raise HttpError(401, "User information not accessible")
    except Exception as e:
        # Catch unexpected errors and return a 500 error
        raise HttpError(500, f"An unexpected error occurred: {str(e)}")
    
class UpdateProjectSchema(Schema):
    id: uuid.UUID = None  # Make id optional for new projects
    page_id: uuid.UUID  # Required to link to the Page
    title: str
    desc: str

@api.put("/projects/update")
def update_projects(request, payload: List[UpdateProjectSchema]):
    try:
        if request.user.is_authenticated:
            updated_projects = []

            for project_data in payload:
                # If an id is provided, try to get the project, else create a new one
                if project_data.id:
                    # Try to update existing project
                    project, created = Projects.objects.update_or_create(
                        id=project_data.id,
                        defaults={
                            'page_id_id': project_data.page_id,  # Use `page_id_id` to set the foreign key directly
                            'title': project_data.title,
                            'desc': project_data.desc
                        }
                    )
                else:
                    # Create a new project if no id is provided
                    project = Projects.objects.create(
                        page_id_id=project_data.page_id,  # Set the foreign key directly
                        title=project_data.title,
                        desc=project_data.desc
                    )
                    created = True

                updated_projects.append({
                    "id": project.id,
                    "created": created,
                    "title": project.title,
                    "desc": project.desc
                })

            return {"message": "success", "projects": updated_projects}
        else:
            raise HttpError(401, "Not authenticated")

    except (PermissionDenied, ObjectDoesNotExist):
        raise HttpError(401, "User information not accessible")
    except Exception as e:
        raise HttpError(500, f"An unexpected error occurred: {str(e)}")

class UpdatedExperienceSchema(Schema):
    id: uuid.UUID = None
    page_id:uuid.UUID
    title: str
    company: str
    period: str
    desc: str

@api.put("/experiences/update")
def update_experiences(request, payload: List[UpdatedExperienceSchema]):
    try:
        if request.user.is_authenticated:
            updated_experiences = []

            for experience_data in payload:
                # If an id is provided, try to get the experience, else create a new one
                if experience_data.id:
                    # Try to update existing experience
                    experience, created = Experiences.objects.update_or_create(
                        id=experience_data.id,
                        defaults={
                            'page_id_id': experience_data.page_id,  # Use `page_id_id` to set the foreign key directly
                            'title': experience_data.title,
                            'company': experience_data.company,
                            'period': experience_data.period,
                            'desc': experience_data.desc
                        }
                    )
                else:
                    # Create a new experience if no id is provided
                    experience = Experiences.objects.create(
                        page_id_id=experience_data.page_id,  # Set the foreign key directly
                        title=experience_data.title,
                        company=experience_data.company,
                        period=experience_data.period,
                        desc=experience_data.desc
                    )
                    created = True

                updated_experiences.append({
                    'id': experience.id,
                    'created': created,
                    'title': experience.title,
                    'company': experience.company,
                    'period': experience.period,
                    'desc': experience.desc
                })

            return {"message": "success", "experiences": updated_experiences}
        else:
            raise HttpError(401, "Not authenticated")

    except (PermissionDenied, ObjectDoesNotExist):
        raise HttpError(401, "User information not accessible")
    except Exception as e:
        raise HttpError(500, f"An unexpected error occurred: {str(e)}")
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