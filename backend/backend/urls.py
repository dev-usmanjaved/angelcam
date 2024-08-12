from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from angelcam import views

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('angelcam.urls'))
]
