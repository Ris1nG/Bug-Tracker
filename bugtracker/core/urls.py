from django.urls import path, include
from .views import views
urlpatterns = [
    path('dashboard/', views.dashboard, name="dashboard"),
]
