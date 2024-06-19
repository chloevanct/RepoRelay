// Login.js

const CLIENT_ID = "Ov23li1yHM1QOlk2RKrV";
const REDIRECT_URI = "http://localhost:3000/oauth/callback";

function loginWithGithub() {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
}

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginWithGithub}>Login with GitHub</button>
    </div>
  );
};

export default Login;
