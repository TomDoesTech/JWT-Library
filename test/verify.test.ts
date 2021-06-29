import { verify, sign } from '../src';

describe('verify', () => {
  it('should verify and decode a valid token', () => {
    const secret = 'shhhhh';

    const token = sign({ payload: { name: 'TomDoesTech' }, secret });

    const verified = verify({ token, secret });

    expect(verified.name).toBe('TomDoesTech');
  });

  it('should throw if the signature is invalid', () => {
    const secretOne = 'shhhhh';
    const secretTwo = 'secretTwo';
    const token = sign({ payload: { name: 'Tom' }, secret: secretOne });

    try {
      verify({ token, secret: secretTwo });
    } catch (e) {
      expect(e.message).toBe('Invalid signature');
    }
  });

  it('should throw if the token has expired', () => {
    const secret = 'shhhhh';

    const token = sign({
      payload: { name: 'TomDoesTech' },
      secret,
      options: {
        expiresIn: -8.64e7,
      },
    });

    try {
      verify({ token, secret });
    } catch (e) {
      expect(e.message).toBe('Token has expired');
    }
  });
});
