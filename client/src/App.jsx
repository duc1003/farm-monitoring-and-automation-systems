import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
