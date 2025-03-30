import { dummy } from '@/dummy';

describe('dummy', (): void => {
  test('dummy returns "dummy"', async (): Promise<void> => {
    const res = dummy();

    expect(res).toBe('dummy');
  });
});
