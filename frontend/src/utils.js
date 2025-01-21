export default function fetchUserObject(usersList, userProperty) {
  return usersList.filter((user) => {
    return (user[userProperty] = userProperty);
  });
}
