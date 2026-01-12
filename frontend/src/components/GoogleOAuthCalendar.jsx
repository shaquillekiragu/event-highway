import ApiCalendar from "react-google-calendar-api";

function GoogleOAuthCalendar() {
	const config = {
		clientId:
			"891301921688-7ms3rct4cfe9h22hfolm3pcl9ona71un.apps.googleusercontent.com",
		apiKey: "AIzaSyDC3gJJAJcY22P3M0Oc26KIwEcbMse5sUo",
		scope: "https://www.googleapis.com/auth/calendar",
		discoveryDocs: [
			"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
		],
	};

	const apiCalendar = new ApiCalendar(config);

	return <></>;
}

export default GoogleOAuthCalendar;
