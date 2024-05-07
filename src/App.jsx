import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNabBar from "./components/MyNabBar";
import SignUp from "./components/SignUp";
import SignUpForm from "./components/SignUpForm";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNabBar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
