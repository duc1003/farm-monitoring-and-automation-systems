import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Star } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import './Login.scss';
import { auth, provider, signInWithPopup, signOut } from "../../configs/firebase/firebaseConfig.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post("http://localhost:8888/api/users/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setError("Đăng nhập thành công!");
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };
  const handleSubmitWithGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post("http://localhost:8888/api/users/google-login", { token });

      localStorage.setItem("token", token);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Google login success:", res.data.user);
      
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="login-container">
      {/* Left Image Section */}
      <div className="login-container__image">
        <div className="login-container__image-logo">
          <Star color="white" size={40} />
        </div>
        <h2 className="login-container__image-title">Welcome Back</h2>
        <p className="login-container__image-subtitle">
          Dive into your personalized dashboard and take control of your business insights
        </p>
      </div>

      {/* Right Login Form Section */}
      <div className="login-container__form">
        <div className="login-container__form-wrapper">
          <div className="login-container__form-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-container__form-input">
              <label htmlFor="email">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="email" 
                  id="email"
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="login-container__form-input">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="password" 
                  id="password"
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="login-container__form-actions">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button 
              type="button" 
              className="login-container__form-submit"
              onClick={handleSubmit}
            >
              Sign In
            </button>

            <button 
              type="button"
              className="login-container__form-google-btn"
              onClick={handleSubmitWithGoogleLogin}
            >
              <FcGoogle size={24} />
              <span>Sign in with Google</span>
            </button>

            <div className="login-container__form-signup">
              Don&apos;t have an account? <a href="/register">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;