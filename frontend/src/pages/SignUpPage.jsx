import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { postUser } from "../api";
// import SignUpForm from "../components/SignUpForm/SignUpForm";
import "../stylesheets/SignUpPage.css";

function SignUpPage() {
  const [hasPosted, setHasPosted] = useState(true);
  const [hasInputtedInfo, setHasInputtedInfo] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [adminStatus, setAdminStatus] = useState(null);

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();
}

export default SignUpPage;
