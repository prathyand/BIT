from django.urls import path
from . import views


# URLConfigs
urlpatterns = [
    path('hello/', views.say_hello)
]