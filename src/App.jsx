import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import OneDayLog from './pages/OneDayLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onedaylog" element={<OneDayLog />} />
      </Routes>
    </Router>
  );
}

export default App;
