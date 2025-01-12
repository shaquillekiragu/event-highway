const {
  fetchUsers,
  fetchUser,
  insertUser,
  updateUser,
} = require("../models/users.model");

async function getUsers(request, response, next) {
  try {
    const users = await fetchUsers();
    return response.status(200).send({ users });
  } catch (err) {
    next(err);
  }
}

async function getUser(request, response, next) {
  try {
    const { user_id } = request.params;
    const user = await fetchUser(user_id);
    return response.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

async function postUser(request, response, next) {
  try {
    const {
      first_name,
      last_name,
      display_name,
      email,
      user_password,
      is_admin,
    } = request.body;
    const user = await insertUser(
      first_name,
      last_name,
      display_name,
      email,
      user_password,
      is_admin
    );
    return response.status(201).send({ user });
  } catch (err) {
    next(err);
  }
}

async function patchUser(request, response, next) {
  try {
    const { user_id } = request.params;
    const {
      first_name,
      last_name,
      display_name,
      email,
      user_password,
      is_admin,
    } = request.body;
    const user = await updateUser(
      user_id,
      first_name,
      last_name,
      display_name,
      email,
      user_password,
      is_admin
    );
    return response.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUser,
};
