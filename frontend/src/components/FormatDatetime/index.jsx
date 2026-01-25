// Utility functions for datetime conversion
export function convertDatetimeLocalToUnix(datetimeLocal) {
	if (!datetimeLocal) {
		return null;
	}
	const date = new Date(datetimeLocal);
	return date.getTime();
}

export function convertUnixToDatetimeLocal(unixTimestamp) {
	if (!unixTimestamp) {
		return "";
	}

	const date = new Date(unixTimestamp);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getCurrentUnixInMilliseconds() {
	return Date.now();
}

// React component for displaying formatted datetime
export default function FormatDatetimeFrontend({ sqlTimestamp }) {
	if (!sqlTimestamp) return null;
	const date = new Date(sqlTimestamp);

	const formattedDate = date.toLocaleDateString();
	const formattedTime = date.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return <span>{`${formattedDate} ${formattedTime}`}</span>;
}
