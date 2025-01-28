function FormatDateTime({ sqlTimestamp }) {
  const date = new Date(sqlTimestamp);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return <span>{`${formattedDate} ${formattedTime}`}</span>;
}

export default FormatDateTime;
