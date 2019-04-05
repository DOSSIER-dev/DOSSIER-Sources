import { SourceItem } from './source-item';

export class SearchResult {
  results: SourceItem[];
  count: number;
  page: number;
  numPages: number;
}

const SINGULAR_KEY = 'SOURCE_LIST.RESULTS_SINGULAR';
const PLURARL_KEY = 'SOURCE_LIST.RESULTS_PLURAL';
export class SearchResultSummary {
  translateKey: string;
  params: { n: number };
  count: number;
  page: number;
  numPages: number;

  constructor(resultCount: SearchResult | number) {
    if (typeof resultCount === 'number') {
      this._setResultCount(resultCount);
    } else {
      this.count = resultCount.count || 0;
      this.page = resultCount.page || 0;
      this.numPages = resultCount.numPages || 0;
      this._setResultCount(this.count);
    }
  }

  private _setResultCount(resultCount: number) {
    this.params = { n: resultCount };
    this.translateKey = resultCount === 1 ? SINGULAR_KEY : PLURARL_KEY;
  }
}
