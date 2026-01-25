export default function formatDatetimeForUI(sqlTimestamp) {
	if (!sqlTimestamp) return null;
	const date = new Date(sqlTimestamp);

	const formattedDate = date.toLocaleDateString();
	const formattedTime = date.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return `${formattedDate} ${formattedTime}`;
}
