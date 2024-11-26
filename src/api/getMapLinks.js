const BASEURL = import.meta.env.VITE_API_BASE_URL;

export default function fetchMapLinks() {
	return fetch(BASEURL + "/api/v1/map-links")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error("Error fetching map links:", error);
		});
}
