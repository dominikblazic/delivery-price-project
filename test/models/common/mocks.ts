export const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn().mockReturnValue({ userId: 1, username: 'testuser' }),
  };
  
  export const mockConfigService = {
    get: jest.fn().mockReturnValue('mockedConfigValue'),
  };