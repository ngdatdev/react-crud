import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isshowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="login-container col-12 col-sm-4">
      <h3 className="title">Log in</h3>
      <div className="info-text">Email or username</div>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email or username"
      />
      <input
        type={isshowPassword ? 'password' : 'text'}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <div className="eyes">
        <i
          className={
            isshowPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
          }
          onClick={() => setIsShowPassword(!isshowPassword)}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={!(email && password)}
      >
        Login
      </button>
      <div className="backward">
        <i className="fa-solid fa-angles-left"></i> Go back
      </div>
    </div>
  );
};

export default Login;
