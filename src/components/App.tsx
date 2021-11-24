import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import MainPage from "./MainPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/first">First</Link>
          </li>
          <li>
            <Link to="/second">Second</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/first" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
