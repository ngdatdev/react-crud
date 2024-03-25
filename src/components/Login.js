import { useEffect, useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { postLoginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/contextUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isshowPassword, setIsShowPassword] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/password is empty");
      return;
    }
    setIsLoadApi(true);
    let res = await postLoginUser("eve.holt@reqres.in", "pistol");
    if (res?.token) {
      loginContext(email.trim(), res.token)
      navigate("/users");
    } else {
      if (res?.status === 400) toast.error(res?.data?.error);
    }
    setIsLoadApi(false);
  };

  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleBackward = () => {
    navigate('/')
  }

  return (
    <div className="login-container col-12 col-sm-4">
      <h3 className="title">Log in</h3>
      <div className="info-text">Email or username(eve.holt@reqres.in) </div>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email or username"
        onKeyDown={handleEnter}
      />
      <input
        type={isshowPassword ? "password" : "text"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
        onKeyDown={handleEnter}

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
        onClick={handleLogin}
      >
        {" "}
        {isLoadApi && (
          <div
            className="spinner-border"
            style={{ width: "15px", height: "15px" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
        Login
      </button>
      <div className="backward" onClick={handleBackward}>
        <i className="fa-solid fa-angles-left"></i> Go back
      </div>
    </div>
  );
};

export default Login;
