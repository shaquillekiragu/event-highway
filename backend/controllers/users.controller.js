const { fetchUser, insertUser, updateUser } = require("../models/users.model");

async function getUser(request, response, next) {
  try {
    const { userId } = request.params;
    const user = await fetchUser(userId);
    response.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

async function postUser(request, response, next) {
  try {
    const { firstName, lastName, fullName, email, userPassword, isAdmin } =
      request.body;
    const user = await insertUser(
      firstName,
      lastName,
      fullName,
      email,
      userPassword,
      isAdmin
    );
    response.status(201).send({ user });
  } catch (err) {
    next(err);
  }
}

async function patchUser(request, response, next) {
  try {
    const { userId } = request.params;
    const { changedProperty, newValue } = request.body;
    const user = await updateUser(userId, changedProperty, newValue);
    response.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  postUser,
  patchUser,
};
