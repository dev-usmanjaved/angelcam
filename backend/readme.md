instructions, usage, and endpoints for the API.

# Django Angelcam API

This is a Django-based API designed to interact with the Angelcam API. It provides endpoints for managing and retrieving camera feeds and recordings.

## Features

    •	List cameras associated with your Angelcam account
    •	Retrieve live video streams from selected cameras
    •	Access and playback recorded video segments
    •	Control video playback (play, pause, speed)

## Requirements

    •	Python 3.8+
    •	Django 4.0+
    •	Django REST Framework
    •	requests library for making HTTP requests

## Installation

1.  Clone the repository:
    `git clone <repository-url>`
    `cd <repository-directory>`
2.  Create a virtual environment:
    `python -m venv venv`
3.  Install the dependencies:
    `pip install -r requirements.txt`
4.  Apply the migrations:
    `python manage.py migrate`
5.  Run the development server:
    `python manage.py runserver`

### Configuration

Place the ANGELCAM_API_BASE_URL in settings.py

## Endpoints

### Authentication

    •	POST /api/auth/
    Authenticate with your Personal Access Token. (Note: Adjust this endpoint based on your authentication setup.)

### Cameras

    •	GET /api/cameras/
    List all cameras associated with your Angelcam account.

### Recordings

    •	GET /api/cameras/<id>/recordings/

List recordings for a specific camera.
