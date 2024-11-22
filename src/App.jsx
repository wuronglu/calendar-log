import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import OneDayLog from "./pages/OneDayLog";
import Video from "./pages/Video";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/onedaylog" element={<OneDayLog />} />
				<Route path="/video" element={<Video />} />
			</Routes>
		</Router>
	);
}

export default App;
