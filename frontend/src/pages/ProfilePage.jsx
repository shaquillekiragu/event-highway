import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getUser from "../api.js";
import Loading from "../components/Loading/Loading.jsx";
import "../stylesheets/ProfilePage.css";

function ProfilePage() {
  const user_id = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser(user_id);
        setUserInfo(response.data.user);
        console.log(response.data.user, " <<< response.data.user");
        setIsLoading(false);
      } catch (err) {
        console.error(err, " << fetchUser error");
      }
    }
    fetchUser();
  }, []);

  console.log(userInfo, " <<< userInfo");

  // const passwordStarCount = userInfo.user_password.length;
  // console.log(passwordStarCount, " <<< passwordStarCount");
  // const starredPassword = "*".repeat(passwordStarCount);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <h2>Account Details:</h2>
      <p>First Name: {userInfo.first_name}</p>
      <p>Last Name: {userInfo.last_name}</p>
      <p>Display Name: {userInfo.display_name}</p>
      <p>Email Address: {userInfo.email}</p>
      {/* <p>Password: {starredPassword}</p> */}
      <p>Admin Status: {userInfo.is_admin ? "ADMIN" : "MEMBER"}</p>
    </>
  );
}

export default ProfilePage;
