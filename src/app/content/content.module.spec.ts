import { ContentModule } from './content.module';

describe('ContentModule', () => {
  let contentModule: ContentModule;

  beforeEach(() => {
    contentModule = new ContentModule();
  });

  it('should create an instance', () => {
    expect(contentModule).toBeTruthy();
  });
});
