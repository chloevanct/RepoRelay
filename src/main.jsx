// import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";

import store from './redux/store'
import { BrowserRouter } from "react-router-dom";

// const CLIENT_ID = "Ov23li1yHM1QOlk2RKrV";

// function loginWithGithub() {
//   window.location.assign(
//     "https://github.com/login/oath/authorize?client_id=" + CLIENT_ID
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
  // </React.StrictMode>,
);
