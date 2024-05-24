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
import NotFound from "./components/NotFound";
import ModifyProfile from "./components/ModifyProfile";
import ModifyProperty from "./components/ModifyProperty";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import AppointmentSection from "./components/AppointmentSection";

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
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/details/:propertyId"
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
          <Route
            path="/profile/modify"
            element={
              <ProtectedRoute>
                <ModifyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/modify/:propertyId"
            element={
              <ProtectedRoute>
                <ModifyProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/appointment/:propertyId"
            element={
              <ProtectedRoute>
                <AppointmentSection />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
