import sign from '../src/sign';
import decode from '../src/decode';
describe('decode', () => {
  it('should decode the token payload', () => {
    const token = sign({ payload: { name: 'TomDoesTech' }, secret: 'shhhh' });

    const decoded = decode({ token });

    expect(decoded.name).toBe('TomDoesTech');
  });
});
