import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../components/User/types";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loggedUserInfo: () => UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/board");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const loggedUserInfo = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        console.log(jwtDecode<UserData>(token));
        return jwtDecode<UserData>(token);
      } catch (error) {
        console.error("Erro ao decodificar o token", error);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loggedUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
