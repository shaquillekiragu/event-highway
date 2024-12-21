const { fetchUser, insertUser, updateUser } = require("../models/users.model");

async function getUser(request, response, next) {
  try {
    const { userId } = request.body;
    const user = await fetchUser(userId);
    response.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

async function postUser(request, response, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function patchUser(request, response, next) {
  try {
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  postUser,
  patchUser,
};
