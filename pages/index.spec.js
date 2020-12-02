describe('AJAX functions with Jest', () => {
    const mockUrl = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2006';
    const mockUsers = [{ name: 'jack', name: 'jill' }];
    const getUsers = jest.fn(url => mockUsers);
    it('returns returns users from an api call', () => {
      expect(getUsers(mockUrl)).toBe(mockUsers);
      console.log(getUsers);
    });
    it('called getUser with a mockUrl', () => {
      expect(getUsers).toHaveBeenCalledWith(mockUrl);
    });
  });