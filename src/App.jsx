import ProjectHubPage from "./pages/ProjectHubPage";
import PostProjectPage from "./pages/PostProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AboutUsPage from "./pages/AboutUsPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <div> */}
        <Routes>
          {/* <PostProjectPage></PostProjectPage> */}
          <Route index element={<ProjectHubPage />} />
          <Route path="/home" element={<ProjectHubPage />} />
          <Route path="/post" element={<PostProjectPage />} />
          <Route path="/projectDetails" element={<ProjectDetailsPage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;
