export class ResourceType {
  sourcetypecode = 'MISC';
  service: string;
  embedId: string;
  hasMatch = false;
  constructor(sourcetypecode: string, service?, embedId?) {
    if (!!sourcetypecode) {
      this.sourcetypecode = sourcetypecode;
      this.hasMatch = true;
    }
    this.service = service || null;
    this.embedId = embedId || null;
  }
}
