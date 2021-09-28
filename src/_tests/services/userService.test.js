const { expect } = require('chai');

const userService = {
  signup: () => {}
}

const user = {
  name: 'John doe',
  email: 'johndoe@gmail.com',
  password: 'Mysupersecretpassword123'
}

describe('testing the service layer of the /register route' , () => {
  describe('when the user already exists', () => {
    it('returns an object with an error property', async () => {
      const result = await userService.signup(user);
      expect(result).to.be.an('object');
      expect(result).to.have.property('error');
    });

    it('error is an object', async () => {
      const result = await userService.signup(user);
      const { error } = result;
      expect(error).to.be.an('object');
    });

    it('error contains the code and message properties', async () => {
      const result = await userService.signup(user);
      const { error } = result;
      expect(error).to.have.property('message');
      expect(error).to.have.property('code');
    })
  });

  describe('when the user does not exist', () => {
    it('returns an object with the user property', async () => {
      const result = await userService.signup(user);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('user')
    });

    it('the user property need to be a object', async () => {
      const result = await userService.signup(user);
      expect(result.user).to.be.a('object');
    })

    it('the user property needs to have the fields e-mail, _id, name, releaseDate', async () => {
      const result = await userService.signup(user);
      expect(result.user).to.have.a.property('name');
      expect(result.user).to.have.a.property('email');
      expect(result.user).to.have.a.property('_id');
      expect(result.user).to.have.a.property('releaseDate');
    })
  })
});