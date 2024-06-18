import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
import { useAuth } from "./context/AuthContext";
import NotFoundPage from "./pages/not-found";
import BoardPage from "./pages/board";
import ForgotPassword from "./pages/forgot-password";
import RegisterUser from "./pages/register-user";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      {isAuthenticated ? <Route path="/board" element={<BoardPage />} /> : null}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default App;
