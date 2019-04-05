import { UsernamePipe } from './username.pipe';

describe('UsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new UsernamePipe();
    expect(pipe).toBeTruthy();
  });

  it('users first and lastname', () => {
    const pipe = new UsernamePipe();
    expect(
      pipe.transform({ firstname: 'Test', lastname: 'User', username: 'test@test.at' })
    ).toEqual('Test User');

    // just firstname
    expect(pipe.transform({ firstname: 'Test', username: 'test@test.at' })).toEqual('Test');

    // just lastname
    expect(pipe.transform({ lastname: 'User', username: 'test@test.at' })).toEqual('User');
  });

  it('falls back to username', () => {
    const pipe = new UsernamePipe();
    expect(pipe.transform({ username: 'test@test.at' })).toEqual('test@test.at');
  });

  it('works with empty value as well', () => {
    const pipe = new UsernamePipe();
    expect(pipe.transform({})).toEqual('unknown');
    expect(pipe.transform(null)).toEqual('unknown');
  });
});
