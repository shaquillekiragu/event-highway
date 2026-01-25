function convertPostgresTimestampToUnix(timestamp) {
	if (!timestamp) return null;
	return new Date(timestamp).getTime();
}

module.exports = {
	convertPostgresTimestampToUnix,
};
