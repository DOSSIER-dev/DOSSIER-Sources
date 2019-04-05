import { SourcesInputsModule } from './sources-inputs.module';

describe('SourcesInputsModule', () => {
  let sourcetypesModule: SourcesInputsModule;

  beforeEach(() => {
    sourcetypesModule = new SourcesInputsModule();
  });

  it('should create an instance', () => {
    expect(sourcetypesModule).toBeTruthy();
  });
});
