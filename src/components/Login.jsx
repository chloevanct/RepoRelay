import React from "react";
import { Button } from "@chakra-ui/react";

const CLIENT_ID = "Ov23li1yHM1QOlk2RKrV";

function loginWithGithub() {
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  );
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Button onClick={loginWithGithub}>Login with GitHub</Button>
    </div>
  );
}

export default Login;
