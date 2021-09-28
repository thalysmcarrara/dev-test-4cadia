const { expect } = require('chai');

const userModel = {
  create: () => {}
}

describe('testing route /register', () => {
  const user = {
    name: 'John doe',
    email: 'johndoe@gmail.com',
    password: 'Mysupersecretpassword123'
  }

  describe('when the user already exists', () => {
    it('returns false', async () => {
      const result = await userModel.create(user);
      expect(result).to.be.equal(false);
    });
  });

  describe('when the user does not exist', () => {
    it('returns an object with the user property', async () => {
      const result = await userModel.create(user);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('user')
    });
    it('the user object must have the properties...', async () => {
      const result = await userModel.create(user);
      expect(result.user).to.be.a('object');
      expect(result.user).to.have.a.property('name');
      expect(result.user).to.have.a.property('email');
      expect(result.user).to.have.a.property('_id');
      expect(result.user).to.have.a.property('releaseDate');
    })
  });
});