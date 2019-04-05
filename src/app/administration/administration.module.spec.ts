import { AdministrationModule } from './administration.module';

describe('AdministrationModule', () => {
  let administrationModule: AdministrationModule;

  beforeEach(() => {
    administrationModule = new AdministrationModule();
  });

  it('should create an instance', () => {
    expect(administrationModule).toBeTruthy();
  });
});
