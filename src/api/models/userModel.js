const mongoConnection = require('./connection');

const USERS = 'users';

const findByEmail = async (email) => {
  const db = await mongoConnection.getConnection();

  const filter = { email };

  const result = await db.collection(USERS).findOne(filter);

  return result;
};

const signup = async ({ name, email, password }) => {
  const exists = await findByEmail(email);

  if (exists) return false;

  const releaseDate = new Date();

  const userWithDate = {
    name,
    email,
    password,
    releaseDate,
  };

  const db = await mongoConnection.getConnection();
  
  const result = await db.collection(USERS).insertOne(userWithDate); 

  if (!result.acknowledged) return false;

  return { user: {
    name,
    email,
    releaseDate,
    _id: result.insertedId.toString(),
  } };
};

module.exports = { signup, findByEmail };