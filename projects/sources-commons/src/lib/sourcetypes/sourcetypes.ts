import { SourceTypeMimeType, SourceType } from './sourcetype.interface';

const MIME_TYPES_IMAGES: SourceTypeMimeType[] = [
  { mimetype: 'image/gif' },
  { mimetype: 'image/jpeg' },
  { mimetype: 'image/png' }
];

const MIME_TYPES_PDF = [{ mimetype: 'application/pdf' }];

// const MIME_TYPES_DATA = [{ mimetype: 'text/csv' }, { mimetype: 'text/tab-separated-values' }];

export const DEFAULT_SOURCETYPES: SourceType[] = [
  {
    code: 'DOC',
    type: 'file',
    icon: 'src-type-document',
    name: 'Document',
    mimetypes: [...MIME_TYPES_IMAGES, ...MIME_TYPES_PDF]
  },
  {
    code: 'IMG',
    type: 'file',
    icon: 'src-type-image',
    name: 'Image',
    mimetypes: [...MIME_TYPES_IMAGES, ...MIME_TYPES_PDF]
  },
  {
    code: 'VIDEO',
    type: 'link',
    icon: 'src-type-video',
    name: 'Video'
  }
  //  {
  //    code: 'AUDIO',
  //    type: 'link',
  //    icon: 'src-type-audio',
  //    name: 'Audio',
  //  },
  //  {
  //    code: 'LINK',
  //    type: 'link',
  //    icon: 'src-type-link',
  //    name: 'Weblink',
  //  },
  //  {
  //    code: 'DATA',
  //    type: 'file',
  //    icon: 'src-type-dataset',
  //    name: 'Dataset',
  //    mimetypes: MIME_TYPES_DATA
  //  }
];
