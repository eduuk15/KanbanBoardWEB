import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
import { useAuth } from "./context/AuthContext";
import NotFoundPage from "./pages/notFound";
import BoardPage from "./pages/board";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          {isAuthenticated ? (
            <Route path="/home" element={<BoardPage />} />
          ) : null}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
