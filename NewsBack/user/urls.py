from django.urls import path
from .views import *

urlpatterns = [
    path("all/", UserListView.as_view())
]
