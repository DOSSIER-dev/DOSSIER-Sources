from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfpage import PDFTextExtractionNotAllowed
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
from pdfminer.converter import TextConverter
from io import StringIO


def get_pdf_contents(path):
    """
    https://stackoverflow.com/questions/5725278/how-do-i-use-pdfminer-as-a-library
    """

    with open(path, 'rb') as fp:
        # Create a PDF parser object associated with the file object.
        parser = PDFParser(fp)

        # Create a PDF document object that stores the document structure.
        # Supply the password for initialization.
        document = PDFDocument(parser)

        # Check if the document allows text extraction. If not, abort.
        if not document.is_extractable:
            raise PDFTextExtractionNotAllowed

        # Create a PDF resource manager object that stores shared resources.
        rsrcmgr = PDFResourceManager()

        # Place to put extracted contents
        retstr = StringIO()

        # Create a PDF device object (here, of type TextConverter)
        device = TextConverter(rsrcmgr, retstr)

        # Create a PDF interpreter object.
        interpreter = PDFPageInterpreter(rsrcmgr, device)

        # Process each page contained in the document.
        for page in PDFPage.create_pages(document):
            interpreter.process_page(page)

        return retstr.getvalue()

