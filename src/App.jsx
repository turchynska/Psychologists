import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PsychologistList from "./components/PsychologistList/PsychologistList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/psychologist" element={<PsychologistList />} />
    </Routes>
  );
};

export default App;
