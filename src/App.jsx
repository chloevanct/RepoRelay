import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import ProjectHubPage from "./pages/ProjectHubPage";
import PostProjectPage from "./pages/PostProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      console.log("HELLO ", token);

      window.history.replaceState(null, null, window.location.pathname);
      navigate("/home");
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsAuthenticated(true);
      }
    }
  }, [navigate]);

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route index element={<ProjectHubPage />} />
          <Route path="/home" element={<ProjectHubPage />} />
          <Route path="/post" element={<PostProjectPage />} />
          <Route path="/projectDetails" element={<ProjectDetailsPage />} />
          <Route path="/user" element={<UserProfilePage />} />
        </>
      )}
    </Routes>
  );
}

export default App;