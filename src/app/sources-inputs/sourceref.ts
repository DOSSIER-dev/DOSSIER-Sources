/**
 * Part of what a source is.
 * The parts that are available when the source with its sourcetype and
 * source-reference is created.
 */
export class SourceRef {
  sourcetype: string;
  sourceId: string; // isbn, doi etc.
  sourceURL: string;
  externalServiceId: string; // embed id etc. of external website
  externalServiceName: string; // name of external website
  fileRef: any;
  fileRef_id: number;
  downloadUrl: string;
}
