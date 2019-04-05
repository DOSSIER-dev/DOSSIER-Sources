import { Annotation } from './annotation';

export class Source {
  id: number;

  title: string;
  description: string;

  embedId: string;
  sourcetype: string;

  sourceId: string; // isbn, doi etc.
  sourceURL: string; // unique resource locator
  externalServiceId: string; // unique resource identifier
  country: any;
  language: any;
  date: Date;
  fileRef: any;
  fileRef_id: number;
  annotations: Annotation[] = [];
  shareUrl: string;
  downloadUrl: string;
}
