import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNabBar from "./components/MyNabBar";
import SignUp from "./components/SignUp";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNabBar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/register" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
