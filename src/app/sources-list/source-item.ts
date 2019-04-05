/**
 * Source Item for lists / search results.
 */
export class SourceItem {
  id: number;
  title: string;
  public: boolean;
  description: string;
  sourcetype: string;
  tags: any;
  collection: any;
  sourceId: string; // isbn, doi etc.
  sourceURL: string; // unique resource locator
  externalServiceId: string; // unique resource identifier
  language: any;
  date: Date;
  fileRef: any;
  fileRef_id: number;
  shareUrl: string;

  bookmarked: boolean;
  highlight: any; // highlighted fragments
}
