import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider, signInWithPopup, signOut } from "../../configs/firebase/firebaseConfig.js";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8888/api/users/login", {
        email: username,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      setError("Đăng nhập thành công!");
      navigate("/home");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post("http://localhost:8888/api/users/google-login", { token });

      localStorage.setItem("token", token);
      setUser(res.data.user);
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Đăng nhập</button>
      <button onClick={handleGoogleLogin}>Đăng nhập với Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
