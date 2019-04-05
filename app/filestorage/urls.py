from django.conf.urls import url, include
from .views import FileUploadView, FileGetView

urlpatterns = [
    url('upload', FileUploadView.as_view()),
    url('get/(?P<downloadId>[^/.]+)', FileGetView.as_view(), name='file_download'),
]
