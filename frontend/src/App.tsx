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
import EditUser from "./pages/edit-user";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/user/:id" element={<EditUser />} />
        </>
      ) : null}
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
