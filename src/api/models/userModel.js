const mongoConnection = require('./connection');

const USERS = 'users';

const findByEmail = async (email) => {
  const db = await mongoConnection.getConnection();

  const filter = { email };

  const result = await db.collection(USERS).findOne(filter);

  return result;
};

const signup = async (user) => {
  const db = await mongoConnection.getConnection();
  
  const result = await db.collection(USERS).insertOne(user); 

  if (!result.acknowledged) return false;

  return { user: {
    _id: result.insertedId.toString(),
    ...user,
  } };
};

module.exports = { signup, findByEmail };