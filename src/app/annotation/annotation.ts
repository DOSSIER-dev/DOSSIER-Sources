import { LocationInput } from './location-input/location-input';

/**
 * Annotation.
 * Linked to a source.
 * Has a title and description.
 * Has location information - which can vary, from type to type.
 * This data structure, however, contains *all* possible fields for
 * the location infomation.
 */
export class Annotation implements LocationInput {
  id: number;
  source_id: number;

  title: string;
  description: string;
  public: boolean;

  // 2d like document and image
  page: number;
  pageX: number;
  pageY: number;
  width: number;
  height: number;

  // linear / time based
  timecodeFrom: number;
  timecodeTo: number;

  // fallback, human readable string description
  locationText: string;
}
