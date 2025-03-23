import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Psychologist from "./pages/Psychologists/Psychologists";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/psychologist" element={<Psychologist />} />
    </Routes>
  );
};

export default App;
