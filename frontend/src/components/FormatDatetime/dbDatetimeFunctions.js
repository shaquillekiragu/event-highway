export default function formatDatetimeForDB(datetime) {
	const formattedDatetime = datetime.replace(
		/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/,
		"$3-$2-$1T$4:$5:00"
		// Causing an error upon patchEvent due to var value of undefined.
	);
	// console.log(formattedDatetime, " << formattedDatetime");
	return formattedDatetime;
}

export function currentDatetimeForDB() {
	const currentDatetime = new Date();

	const currentDate = `${currentDatetime.getFullYear()}-${currentDatetime.getMonth()}-${currentDatetime.getDay()}`;
	const currentTime = `T${currentDatetime.getHours()}:${currentDatetime.getMinutes()}:00`;

	const datetime = `${currentDate}${currentTime}`;
	// console.log(datetime, " <<< dateTime");

	return datetime;
}
