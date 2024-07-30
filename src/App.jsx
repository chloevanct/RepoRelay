import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "./redux/user/userThunks";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import ProjectHubPage from "./pages/ProjectHubPage";
import PostProjectPage from "./pages/PostProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserProfilePage from "./pages/UserProfilePage";
import { useToast } from "@chakra-ui/react";
import "./App.css";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

console.log(serverUrl);

/**
 * The App component serves as the main entry point for the application.
 * It handles authentication state and routing for the app based on the user's authentication status.
 * 
 * The component performs the following:
 * - Checks for an authentication token in local storage or URL query parameters.
 * - Fetches user data if a token is present.
 * - Sets the authentication state based on the presence of a valid token.
 * - Defines the routes for different pages, including login, dashboard, project hub, project posting, project details, about us, and user profile.
 * 
 * @returns {JSX.Element} The rendered App component with routing logic based on authentication state.
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserAsync(token));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      console.log("HELLO ", token);
      window.history.replaceState(null, null, window.location.pathname);
      navigate("/home");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Login />} />
      ) : (
        <>
          <Route index element={<ProjectHubPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/hub" element={<ProjectHubPage />} />
          <Route path="/post" element={<PostProjectPage />} />
          <Route
            path="/projectDetails/:projectId"
            element={<ProjectDetailsPage />}
          />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/userProfile" element={<UserProfilePage onLogout={handleLogout} />} />
        </>
      )}
    </Routes>
  );
}

export default App;
