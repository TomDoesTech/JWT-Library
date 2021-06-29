import sign from '../src/sign';
describe('sign', () => {
  it('should produce different signatures for different payloads', () => {
    const secret = 'shhhh';
    const jwtOne = sign({
      payload: { name: 'Tom' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];
    const jwtTwo = sign({
      payload: { name: 'Tom' },
      secret: `${secret}-13323`,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];

    expect(jwtOne).not.toBe(jwtTwo);
  });

  it('should add the expiry to the payload', () => {
    const secret = 'shhhhh';
    const jwtOne = sign({
      payload: { name: 'Tom' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[1];

    expect(typeof JSON.parse(atob(jwtOne)).exp).toBe('number');
  });
});
