import { comparePassword, hashPassword } from '../../server/helpers/bcrypt';

describe('Test Bcrypt', () => {
  it('Test compare and hashing password', async () => {
    const password = 'test';
    const falsePassword = 'test1';
    const hashedPassword = await hashPassword(password);
    expect(await comparePassword(password, hashedPassword)).toBe(true);
    expect(await comparePassword(falsePassword, hashedPassword)).toBe(false);
  });
});
