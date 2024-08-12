import requests
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import CameraSerializer, RecordingSerializer
from .models import Camera
from rest_framework.decorators import api_view
from .services.angelcam import get_user, get_cameras, get_recording_data


class AngelCamView(viewsets.ModelViewSet):
    queryset = Camera.objects.all()

@api_view(['POST'])
def auth(request):
    try:
        token = request.data.get('token')
        auth = get_user(token)
        return Response(auth)
    except requests.RequestException:
        return Response({'error': 'Failed to login'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def list_cameras(request):
    try:
        token = request.headers.get('Authorization')
        cameras = get_cameras(token)
        serializer = CameraSerializer(cameras, many=True)
        return Response(serializer.data)
    except requests.RequestException:
        return Response({'error': 'Failed to retrieve cameras'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_camera_recordings(request, camera_id):
    try:
        token = request.headers.get('Authorization')
        recordings = get_recording_data(camera_id, token)
        serializer = RecordingSerializer(recordings, many=False)
        return Response(serializer.data)
    except requests.RequestException:
        return Response({'error': 'Failed to retrieve recordings'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

