import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import DashboardComponent from "./components/DashboardComponent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />}
          <Route path="/dashboard" element={<DashboardComponent />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
