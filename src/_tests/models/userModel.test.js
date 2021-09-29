const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnect = require('../../api/models/connection');
const userModel = require('../../api/models/userModel');

const USERS = 'users'
const DBNAME = 'openbank'

describe('testing the model layer of the /register route', () => {
  const user = {
    name: 'John doe',
    email: 'johndoe@gmail.com',
    password: 'Mysupersecretpassword123',
    releaseDate: '2021-09-28T15:56:44.332Z'
  }
  
  let DBserver = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBserver.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
    .then((conn) => conn.db(DBNAME));

    sinon.stub(mongoConnect, 'getConnection').resolves(connectionMock)
  });

  after(async () => {
    await mongoConnect.getConnection.restore();
  })

  describe('when the user is successfully inserted', () => {
    beforeEach(async () => {
      await connectionMock.collection(USERS).deleteMany({});
    });

    it('returns an object with the user property', async () => {
      const result = await userModel.signup(user);
      expect(result).to.be.a('object');
      expect(result).to.have.a.property('user')
    });

    it('the user property need to be a object', async () => {
      const result = await userModel.signup(user);
      expect(result.user).to.be.a('object');
    })

    it('the user property needs to have the properties e-mail, _id, name, releaseDate', async () => {
      const result = await userModel.signup(user);
      expect(result.user).to.have.a.property('name');
      expect(result.user).to.have.a.property('email');
      expect(result.user).to.have.a.property('_id');
      expect(result.user).to.have.a.property('releaseDate');
    })
  });
});