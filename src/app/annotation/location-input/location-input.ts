/**
 * Part of the annotation type that is related to location.
 * ("Union" of all possible fields)
 */
export interface LocationInput {
  page: number;
  pageX: number;
  pageY: number;
  width: number;
  height: number;
  timecodeFrom: number;
  timecodeTo: number;
  locationText: string;
}
