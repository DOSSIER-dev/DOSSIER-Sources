import { ViewersModule } from './viewers.module';

describe('ViewersModule', () => {
  let viewersModule: ViewersModule;

  beforeEach(() => {
    viewersModule = new ViewersModule();
  });

  it('should create an instance', () => {
    expect(viewersModule).toBeTruthy();
  });
});
