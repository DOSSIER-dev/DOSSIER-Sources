import { Annotation } from '../annotation/annotation';

export class Source {
  id: number;
  title: string;
  public = false;
  description: string;
  sourcetype: string;
  tags: any;
  stories: any;
  collection: any;
  collection_id: number;
  sourceId: string; // isbn, doi etc.
  sourceURL: string;
  externalServiceId: string; // embed id etc. of external website
  externalServiceName: string; // name of external website
  country: any;
  language: any;
  date: Date;
  fileRef: any;
  fileRef_id: number;
  annotations: Annotation[] = [];
  shareUrl: string;
  downloadUrl: string;
}
