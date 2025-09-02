import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import FacultyProfile from "./components/Faculty/FacultyProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/faculty/:slug" element={<FacultyProfile />} />
      </Routes>
    </Router>
  );
}
export default App;
