from rest_framework import serializers

class SnapshotSerializer(serializers.Serializer):
    url = serializers.URLField()
    created_at = serializers.DateTimeField()

class StreamSerializer(serializers.Serializer):
    format = serializers.CharField()
    url = serializers.URLField()

class OwnerSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class CameraSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    type = serializers.CharField()
    snapshot = SnapshotSerializer()
    status = serializers.CharField()
    live_snapshot = serializers.URLField()
    streams = StreamSerializer(many=True)
    applications = serializers.ListField(child=serializers.DictField())
    owner = OwnerSerializer()
    has_recording = serializers.BooleanField()
    has_notifications = serializers.BooleanField()
    audio_enabled = serializers.BooleanField()
    low_latency_enabled = serializers.BooleanField()

class RecordingSerializer(serializers.Serializer):
    format = serializers.CharField()
    url = serializers.URLField()
    stream_info = serializers.URLField()
    stream_controls = serializers.DictField(child=serializers.URLField())
