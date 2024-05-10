import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyNabBar from "./components/MyNabBar";
import SignUp from "./components/SignUp";
import SignUpForm from "./components/SignUpForm";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <MyNabBar />
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/homepage" /> : <SignUp />}
          />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
