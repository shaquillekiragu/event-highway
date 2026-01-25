export default function convertDatetimeLocalToUnix(datetimeLocal) {
	if (!datetimeLocal) {
		return null;
	}
	const date = new Date(datetimeLocal);
	return date.getTime();
}
