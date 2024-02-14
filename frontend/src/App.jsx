import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FileList from "./components/FileList";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/files" element={<FileList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
