import { Source } from 'src/app/sources/source';

export class SourceElement {
  domElement: any;
  embedId: string;
  micropageUrl: string;
  source: Source;

  constructor(embedId?: string, micropageUrl?: string) {
    this.embedId = embedId;
    this.micropageUrl = micropageUrl;
  }
}
