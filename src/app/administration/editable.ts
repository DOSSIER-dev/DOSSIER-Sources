export class Editable<T> {
  payload: T;
  editing: boolean;
  constructor(payload, editing = false) {
    this.payload = payload;
    this.editing = editing;
  }
}
