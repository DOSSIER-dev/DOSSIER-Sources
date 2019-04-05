import { SharedFormsModule } from './shared-forms.module';

describe('SharedFormsModule', () => {
  let sharedFormsModule: SharedFormsModule;

  beforeEach(() => {
    sharedFormsModule = new SharedFormsModule();
  });

  it('should create an instance', () => {
    expect(sharedFormsModule).toBeTruthy();
  });
});
