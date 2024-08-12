from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.auth, name='auth'),
    path('cameras/', views.list_cameras, name='list_cameras'),
    path('cameras/<str:camera_id>/recordings/', views.get_camera_recordings, name='get_camera_recordings'),
]
