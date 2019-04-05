import { LinkParser } from './link-parser.interface';
import { ResourceType } from '../resource-type';

export class LinkParserYoutube implements LinkParser {
  platformsDescription = ['Youtube'];
  parse(s: string): ResourceType {
    const regex = [
      // https://www.youtube.com/watch?v=bk7CWYTJPZs
      /https?:\/\/(?:www\.)?youtube\.com\/watch.*?[\?&]v=([^\s&?\/]*)(?:.*)?/,

      // https://youtu.be/bk7CWYTJPZs
      /https?:\/\/(?:www\.)?youtu\.be\/([^\s&?\/]*)/
    ];

    for (let i = 0; i < regex.length; i++) {
      const res = s.match(regex[i]);
      if (!!res) {
        return new ResourceType('VIDEO', 'youtube', res[1]);
      }
    }
    return new ResourceType(null);
  }
}
