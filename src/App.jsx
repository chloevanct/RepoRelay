import ProjectHubPage from "./pages/ProjectHubPage";
import PostProjectPage from "./pages/PostProjectPage";
// import Header from "./components/Header";
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
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;