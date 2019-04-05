from django.http.response import HttpResponse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import UploadedFile
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from organisation.models import Organisation
from .models import File
from .serializers import FileSerializer
from .util import FileSystemStorageHandler
from .util import get_file_download_response
from .util import get_mimetype
from rest_framework.authtoken.models import Token


class FileGetView(APIView):
    """
    Download file via dowbloadId. Download id is a part of the path.
    """

    def get(self, request, downloadId):
        """
        Serve file.
        Access is given when either
        - logged in user (request.organisation set) and organisation
        matches the file.
        - a source is attached to the file and the source is public
        """

        try:
            dbfile = File.objects.get(downloadId=downloadId)
        except Exception:
            return HttpResponse(status=404)

        if request.organisation == dbfile.organisation:
            # Internal access - this is allowed,
            # via just the file (don't have to check related source)
            return get_file_download_response(dbfile)

        else:
            # External access - check if the related source is public
            try:
                source = dbfile.source.get()
                if source.public:
                    return get_file_download_response(dbfile)
                else:
                    return HttpResponse(status=403)

            except Exception:
                # No source
                return HttpResponse(status=403)


class FileUploadView(APIView):
    """
    Uploading view - accepts file as form data.
    Request data is handed off to storage handlers.
    Upon successfull storage, the file object is created and returned
    as the response.
    """
    parser_classes = (MultiPartParser,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        file_obj = request.data['file']
        dbfile = self._handle_uploaded_file(file_obj,
                                            self.request.user,
                                            self.request.organisation)

        serializer = FileSerializer(dbfile)
        return Response(status=200, data=serializer.data,
                        content_type="application/json")

    def _handle_uploaded_file(self, file: UploadedFile, user: User,
                              organisation: Organisation):
        storageHandler = FileSystemStorageHandler(user, organisation, file)
        path, hashvalue = storageHandler.store_file()
        file = File(name=file.name, owner=user, organisation=organisation,
                    path=path, hashed=hashvalue)
        file.mimetype = get_mimetype(file.path)
        file.save()
        return file

