import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos/Todos";
import Homepage from "./pages/Homepage/Homepage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Homepage}></Route>
        <Route path="/todos" Component={Todos}></Route>
      </Routes>
    </Router>
  );
}
