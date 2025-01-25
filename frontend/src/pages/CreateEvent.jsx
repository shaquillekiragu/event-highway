import "../stylesheets/CreateEvent.css";
import { useState, useEffect } from "react";
import { postEvent } from "../api";
import Loading from "../components/Loading/Loading";

function CreateEvent() {
  const [isLoading, setIsLoading] = useState(true);
  const [,] = useState(true);

  useEffect(() => {}, []);

  if (isLoading) {
    <Loading page="" />;
  }
}

export default CreateEvent;
