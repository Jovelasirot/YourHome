import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignUpForm from "./components/SignUpForm";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import MyNavBar from "./components/MyNavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoriteSection from "./components/FavoriteSection";
import ViewMoreSection from "./components/ViewMoreSection";
import SellForm from "./components/SellForm";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/homepage" /> : <SignUp />}
          />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homepage/details/:propertyId"
            element={
              <ProtectedRoute>
                <ViewMoreSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
