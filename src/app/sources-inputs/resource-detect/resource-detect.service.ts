import { Injectable } from '@angular/core';
import { LinkParserYoutube } from './parsers/link-parser-youtube';
import { LinkParserVimeo } from './parsers/link-parser-vimeo';
import { ResourceType } from './resource-type';

const PARSERS = [LinkParserYoutube, LinkParserVimeo];

@Injectable({
  providedIn: 'root'
})
export class ResourceDetectService {
  parsers;
  constructor() {
    this.parsers = PARSERS;
  }

  getSupportedPlatforms() {
    const platforms = this.parsers.reduce(
      (cur, next) => cur.concat(new next().platformsDescription),
      []
    );
    return platforms;
  }

  detectResourceTypeFromUrl(url: string): ResourceType {
    let match;
    for (const p of this.parsers) {
      const parser = new p();
      match = parser.parse(url);
      if (match.hasMatch) {
        return match;
      }
    }
    return new ResourceType(null);
  }
}
