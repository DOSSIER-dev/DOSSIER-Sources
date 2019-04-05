export interface SourceType {
  code: string;
  name: string;
  translatedName?: string;
  type: string;
  icon?: string;
  mimetypes?: SourceTypeMimeType[];
}

export interface SourceTypeMimeType {
  mimetype: string;
  extensions?: string[];
}

export interface SourceTypesConfigInterface {
  sourceTypes: Array<SourceType>;
}
