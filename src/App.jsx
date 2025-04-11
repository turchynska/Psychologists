import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Psychologist from "./pages/Psychologists/Psychologists";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";


const App = () => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(refreshUser());
    }, [dispatch]);
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/psychologist" element={<Psychologist />} />
    </Routes>
  );
};

export default App;
