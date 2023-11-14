export const responseMock = {
  json: jest.fn((response) => response),
  status: jest.fn(() => ({ json: jest.fn() })),
} as any;
