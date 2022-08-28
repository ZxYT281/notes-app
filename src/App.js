import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Home from "./components/Home";
import React from "react";
import ToggleColorMode from "./context/ColorMode";

function App() {
  return (
    <ToggleColorMode>
      <Routes>
        {/* Non PROTECTED ROUTES */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Layout />}>
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Route>
      </Routes>
    </ToggleColorMode>
  );
}

export default App;
