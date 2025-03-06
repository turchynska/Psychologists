import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginFormModal from "./components/LoginForm/LoginFormModal"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginFormModal />} />
      </Routes>
    </Router>
  );
};

export default App;
