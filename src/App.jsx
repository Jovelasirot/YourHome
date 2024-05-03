import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import MyNabBar from "./components/MyNabBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNabBar />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
