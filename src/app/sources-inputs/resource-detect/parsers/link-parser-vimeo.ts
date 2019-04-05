import { LinkParser } from './link-parser.interface';
import { ResourceType } from '../resource-type';

export class LinkParserVimeo implements LinkParser {
  platformsDescription = ['Vimeo'];
  parse(s: string): ResourceType {
    const regex = /^https?:\/\/(?:www\.)?vimeo\.com\/([0-9]+)$/;
    let res = s.match(regex);
    if (!!res) {
      return new ResourceType('VIMEO', 'vimeo', res[1]);
    }
    return new ResourceType(null);
  }
}
