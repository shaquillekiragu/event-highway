function currentDatetimeForDB() {
  const currentDatetime = new Date();

  const currentDate = `${currentDatetime.getFullYear()}-${currentDatetime.getMonth()}-${currentDatetime.getDay()}`;
  const currentTime = `T${currentDatetime.getHours()}:${currentDatetime.getMinutes()}:00`;

  const datetime = `${currentDate}${currentTime}`;
  console.log(datetime, " <<< dateTime");

  return datetime;
}

function formatDatetimeForDB(datetime) {
  const formattedDatetime = datetime.replace(
    /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/,
    "$3-$2-$1T$4:$5:00"
  );
  console.log(backendDatetime, " << backendDatetime");
  return formattedDatetime;
}

module.exports = { currentDatetimeForDB, formatDatetimeForDB };
