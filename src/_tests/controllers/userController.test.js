const sinon = require('sinon');
const { expect } = require('chai');

const userController = require('../../api/controllers/userController');
const userService = require('../../api/services/userService');

describe('testing the controller layer of the /register route', () => {
  describe('when the user is successfully registered', () => {
    const response = {};
		const request = {};

    const userServiceMock = {
      user: {
        _id: '61534953a59a3b9bf7719e82',
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '$2b$10$wkehE5MXWgdRNMZfs6C.sOZWOoMqzK.Spbs5mUis5Tc4bNfBB3hh2',
      releaseDate: '2021-09-28T16:56:51.456Z'
      }
    }

    before(() => {
			request.body = 	{
        name: 'john doe',
        email: 'johndoe@gmail.com',
        password: 'Mysupersecretpassword123'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
      sinon.stub(userService, 'signup').resolves(userServiceMock);
		});

    after(async () => {
      await userService.signup.restore();
    });

		it('reponse.status is called with code 201', async () => {
			await userController.signup(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
		});

		it('reponse.json is called with the user object as a parameter', async () => {
			await userController.signup(request, response);

			expect(response.json.calledWith(userServiceMock)).to.be.equal(true);
		});

  });

  describe('when the user is already registered', () => {
    const response = {};
		const request = {};

    const errorMock = {
      error: {
        message: 'email already exists',
        code: 409,
      },
    }

    before(() => {
      response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
      sinon.stub(userService, 'signup').resolves(errorMock);
		});

    after(async () => {
      await userService.signup.restore();
    });

		it('reponse.status is called with code 409', async () => {
			await userController.signup(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
		});

		it('reponse.json is called with the message "email already exists"', async () => {
			await userController.signup(request, response);

			expect(response.json.calledWith({ message: 'email already exists' })).to.be.equal(true);
		});
  });
});