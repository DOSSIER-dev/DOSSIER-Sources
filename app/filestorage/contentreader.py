"""
Reading the contents of filerefs for indexing.
"""
from .pdf import get_pdf_contents
from .models import File
import csv
import json


class ContentReaderException(Exception):
    """ Generic content reader exception """
    pass


def get_encoding(path):
    """
    Try a few encodings and return the one that does not
    produce an error upon reading from the file
    """
    encodings = ('utf-8', 'latin-1')
    for enc in encodings:
        try:
            with open(path, encoding=enc) as fp:
                fp.read()
                return enc
        except UnicodeDecodeError:
            pass
    return None


class ContentReader():
    """
    Base class and null implementation
    """

    def __init__(self, fileref: File):
        self.fileref = fileref

    def read_all(self):
        return ""

    @staticmethod
    def factory(fileref: File):
        """
        Factory method for instantiating the
        suitable reader implementation
        """
        mimetype = fileref.mimeType

        if 'pdf' in mimetype:
            return PdfContentReader(fileref)
        elif 'csv' in mimetype:
            return CsvContentReader(fileref)
        elif 'text' in mimetype:
            return TextContentReader(fileref)
        else:
            return ContentReader(fileref)


class PdfContentReader(ContentReader):
    """
    Extract content of pdf files
    """
    def read_all(self):
        return get_pdf_contents(self.fileref.path)


class CsvContentReader(ContentReader):
    """
    Read CSV and normalize. Stores in JSON format.
    """
    def read_all(self):
        encoding = get_encoding(self.fileref.path)
        if encoding is None:
            raise ContentReaderException("No suitable encoding found for {}".format(
                self.fileref.path))
        with open(self.fileref.path, encoding=encoding, newline='') as csvfile:
            dialect = csv.Sniffer().sniff(csvfile.read(2048))
            csvfile.seek(0)
            reader = csv.DictReader(csvfile, dialect=dialect)
            data = [row for row in reader]
            return json.dumps(data)


class TextContentReader(ContentReader):
    """
    Simply read the file. Trivial implementation with read().
    """
    def read_all(self):
        encoding = get_encoding(self.fileref.path)
        if encoding is None:
            raise ContentReaderException("No suitable encoding found for {}".format(
                self.fileref.path))
        with open(self.fileref.path, encoding=encoding) as fp:
            return fp.read()
