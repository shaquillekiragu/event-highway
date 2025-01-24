export default function fetchUserObject(
  usersList,
  userObjProperty,
  propertyValue
) {
  return usersList.filter((user) => {
    return user[userObjProperty] === propertyValue;
  });
}
