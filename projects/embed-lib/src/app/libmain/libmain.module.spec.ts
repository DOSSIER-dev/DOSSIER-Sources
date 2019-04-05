import { LibmainModule } from './libmain.module';

describe('LibmainModule', () => {
  let libmainModule: LibmainModule;

  beforeEach(() => {
    libmainModule = new LibmainModule();
  });

  it('should create an instance', () => {
    expect(libmainModule).toBeTruthy();
  });
});
