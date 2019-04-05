import { ResourceType } from '../resource-type';

export interface LinkParser {
  platformsDescription: string[];
  parse(s: string): ResourceType;
}
