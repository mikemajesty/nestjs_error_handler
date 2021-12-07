jest.setTimeout(2000);
process.env.ENV = 'test';

jest.mock(
  'moment-timezone',
  () =>
    jest.fn(() => ({
      tz: () => ({
        format: jest.fn(),
      }),
    })) as any,
);