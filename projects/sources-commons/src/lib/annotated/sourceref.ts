/**
 * Part of what a source is.
 * The parts that are available when the source with its sourcetype and
 * source-reference is created.
 */
export class SourceRef {
  sourcetype: string;
  sourceId: string; // isbn, doi etc.
  sourceURL: string; // unique resource locator
  externalServiceId: string; // unique resource identifier
  fileRef: any;
  fileRef_id: number;

  downloadUrl: string;
}
