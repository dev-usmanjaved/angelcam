# camera/services/angelcam.py

import requests
import json
from django.conf import settings

def get_user(token):
    url = f"{settings.ANGELCAM_API_BASE_URL}/me"
    headers = {
        'Authorization': f"PersonalAccessToken {token}",
    }
    response = requests.get(url, headers=headers)
    data = json.loads(response.content)
    response.raise_for_status()
    return data

def get_cameras(token):
    url = f"{settings.ANGELCAM_API_BASE_URL}/shared-cameras"
    headers = {
        'Authorization': f"PersonalAccessToken {token}",
    }
    response = requests.get(url, headers=headers)
    data = json.loads(response.content)
    results = data.get('results', [])

    response.raise_for_status()
    return results

def get_recording_data(camera_id, token):
    url = f"{settings.ANGELCAM_API_BASE_URL}/shared-cameras/{camera_id}/recording"
    headers = {
        'Authorization': f"PersonalAccessToken {token}",
    }
    response = requests.get(url, headers=headers)
    recording_details  = response.content

    if response.status_code == 200:
        string_response = recording_details.decode('utf-8')
        data = json.loads(string_response)

        start_time = data.get('recording_start')

        url = f"{settings.ANGELCAM_API_BASE_URL}/shared-cameras/{camera_id}/recording/stream?start={start_time}"
        headers = {
            'Authorization': f"PersonalAccessToken {token}",
        }

        response = requests.get(url, headers=headers)
        recordings_data = response.content
        response.raise_for_status()

        string_response = recordings_data.decode('utf-8')
        data = json.loads(string_response)
        return data
    else:
        response.raise_for_status()
        return response.json()
