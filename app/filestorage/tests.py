from django.test import TestCase
from filestorage.util import FileSystemStorageHandler
import re


class UserMock():
    def __init__(self, id_, organisation):
        self.id = id_
        self.organisation = organisation


class OrganisationMock():
    def __init__(self, id_):
        self.id = id_


class FileMock():
    def __init__(self, name):
        self.name = name


class FileStorageTestCase(TestCase):
    def test_file_saving(self):
        org = OrganisationMock(99)
        user = UserMock(78, org)
        file = FileMock('testfile.pdf')

        handler = FileSystemStorageHandler(user, org, file)
        self.assertTrue(
            re.search('media/99/[0-9]{9}-testfile.pdf',
                      handler.get_path()) is not None
        )

