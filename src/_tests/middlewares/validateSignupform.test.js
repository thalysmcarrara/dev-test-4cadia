const sinon = require('sinon');
const { expect } = require('chai');

const { validateSignupForm } = require('../../api/middlewares');

describe('testing the middleware layer of the /register route', () => {
  describe('when the schema is valid', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        name: 'john doe',
        email: 'johndoe@gmail.com',
        password: 'Mysupersecretpassword123'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status isn\'t called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(false);
		});

		it('reponse.json isn\'t called with the message "invalid entries, try again"', async () => {
			await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(false);
		});
  });

  describe('when the name is empty', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        name: '',
        email: 'johndoe@gmail.com',
        password: 'Mysupersecretpassword123'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status is called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(true);
		});

    it('reponse.json is called with the message "invalid entries, try again"', async () => {
      await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(true);
    });
  });

  describe('when the email is invalid', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        name: 'john doe',
        email: 'johndoegmail.com',
        password: 'Mysupersecretpassword123'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status is called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(true);
		});

    it('reponse.json is called with the message "invalid entries, try again"', async () => {
      await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(true);
    });
  });

  describe('when the password is less than 8 characters long', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        name: 'john doe',
        email: 'johndoe@gmail.com',
        password: 'Mysuper'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status is called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(true);
		});

    it('reponse.json is called with the message "invalid entries, try again"', async () => {
      await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(true);
    });
  });

  describe('when the name field does not exist', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        email: 'johndoe@gmail.com',
        password: 'Mysupersecretpassword123'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status is called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(true);
		});

    it('reponse.json is called with the message "invalid entries, try again"', async () => {
      await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(true);
    });
  });

  describe('when the email field does not exist', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        name: 'john doe',
        password: 'Mysupersecretpassword123'
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status is called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(true);
		});

    it('reponse.json is called with the message "invalid entries, try again"', async () => {
      await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(true);
    });
  });

  describe('when the password field does not exist', () => {
    const response = {};
		const request = {};
    const next = () => {}

    before(() => {
			request.body = 	{
        name: 'john doe',
        email: 'johndoe@gmail.com',
      };

			response.status = sinon.stub().returns(response);
			response.json = sinon.stub().returns();
		});

    it('reponse.status is called with code 400', async () => {
			await validateSignupForm(request, response, next);

      expect(response.status.calledWith(400)).to.be.equal(true);
		});

    it('reponse.json is called with the message "invalid entries, try again"', async () => {
      await validateSignupForm(request, response, next);

			expect(response.json.calledWith({ message: 'invalid entries, try again' })).to.be.equal(true);
    });
  });
});