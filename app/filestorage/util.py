import os
import re
from django.http.response import HttpResponse
from django.contrib.auth.models import User
from organisation.models import Organisation
from django.core.files.uploadedfile import UploadedFile
from sources.settings import MEDIA_ROOT
from random import randint
import mimetypes
import hashlib as hash

"""
Handling of uploaded files.

Maybe adapting, re-using django storage classes is better:
https://docs.djangoproject.com/en/2.0/ref/models/fields/#django.db.models.FileField
https://docs.djangoproject.com/en/2.0/ref/files/storage/#django.core.files.storage.Storage.size

"""

class FileValidationException(Exception):
    pass


ALLOWED_MIMES = (
    'image/gif',
    'image/jpeg',
    'image/png',
    'application/pdf',
    'text/csv',
    'text/tab-separated-values'
)


def to_safe_name(filename):
    """ Clean filename to have more 'safe' characters """
    filename_decoded = filename.encode('ASCII', 'ignore').decode('UTF-8')
    alnum_ascii_filename = re.sub(r'[^\d\w\.-]', '', filename_decoded)
    return alnum_ascii_filename


class BaseStorageHandler():
    def __init__(self, user: User, organisation: Organisation,
                 file: UploadedFile, **kwargs):
        self.user = user
        self.file = file
        self.organisation = organisation
        self.basepath = MEDIA_ROOT

    def get_path(self):
        path = os.path.join(
            self.basepath,
            self.clean_filename(self.file.name)
        )
        return path

    def store_file(self, no_validation=False):
        # Perform validation first
        if not no_validation:
            self.validate_file()

        path = self.get_path()
        with open(path, 'wb+') as destination:
            for chunk in self.file.chunks():
                destination.write(chunk)
        hashvalue = file_get_hash(path)
        return path, hashvalue

    def validate_file(self):
        """ Simplistic file validation - just examine the filename """
        mimetype = get_mimetype(self.file.name)
        if mimetype not in ALLOWED_MIMES:
            raise FileValidationException('Mime type rejected for `{}`'
                                      .format(self.file.name))
        return True

    def clean_filename(self, filename):
        """ Dummy implementation """
        return filename


class FileSystemStorageHandler(BaseStorageHandler):
    """
    FileSystemStorageHandler - store the file in the local filesystem.
    """

    def get_directory(self):
        return os.path.join(self.basepath, str(self.organisation.id))

    def get_path(self):
        """
        Add random prefix to the filename to prevent filename duplicates.
        """

        directory = self.get_directory()
        if not os.path.exists(directory):
            os.makedirs(directory)

        rval = randint(pow(10, 8), pow(10, 9) - 1)
        filename = str(rval) + '-' + self.clean_filename(self.file.name)

        path = os.path.join(directory, filename)
        return path

    def clean_filename(self, filename):
        return to_safe_name(filename)


def get_file_download_response(dbfile):
    """
    Create the HttpResponse for serving a file.

    The file is not read our output - instead, by setting `X-Accel-Redirect`-
    header, the web server (nginx) directly serves the file.
    """
    mimetype = dbfile.mimeType

    response = HttpResponse(content_type=mimetype)
    response["Content-Disposition"] = "inline; filename={0}".format(
        to_safe_name(dbfile.name)
    )
    response['X-Accel-Redirect'] = "/{0}".format(dbfile.path)
    return response


def file_get_hash(path):
    """
    TODO: make sure this does not take an awful lot of time.
          especially given that the hash value is not yet used
          anywhere.
    """

    # Specify how many bytes of the file you want to open at a time
    BLOCKSIZE = 65536

    sha = hash.sha256()
    with open(path, 'rb') as f:
        file_buffer = f.read(BLOCKSIZE)
        while len(file_buffer) > 0:
            sha.update(file_buffer)
            file_buffer = f.read(BLOCKSIZE)

    return sha.hexdigest()


def get_mimetype(path):
    """
    Get (guess) the mimetype of a file.
    """
    mimetype, _ = mimetypes.guess_type(path)
    return mimetype