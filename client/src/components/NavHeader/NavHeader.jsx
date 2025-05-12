import { Search, LogOut, Settings, User, Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import "./NavHeader.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Xử lý khi click vào avatar
  const handleAvatarClick = () => {
    setShowUserMenu(!showUserMenu);
  };
  // Xử lý đăng xuất
  const handleLogout = () => {
    axios.post('http://localhost:8888/api/users/logout')
      .then((res) => {
        console.log(res.data);
        // Xóa token và thông tin người dùng khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Chuyển hướng về trang đăng nhập
        alert('Đăng xuất thành công');
        navigate('/login');
      })
      .catch((err) => {
        console.error('Error logging out:', err);
        alert('Đăng xuất không thành công');
      });
  };
  return (
    <header className="header">
      <div className="header-left">
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="search-bar">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Start searching here..." 
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="date-pill">
          <span>Sat, 26 Sep</span>
          <div className="notification-badge">23</div>
        </div>
        <div className="avatar-container" ref={userMenuRef}>
          <div className="avatar" onClick={handleAvatarClick}>
            <img src="/api/placeholder/40/40" alt="User avatar" />
          </div>
          
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  <img src="/api/placeholder/40/40" alt="User avatar" />
                </div>
                <div className="user-details">
                  <h4>User Name</h4>
                  <p>user@example.com</p>
                </div>
              </div>
              <div className="menu-divider"></div>
              <ul className="menu-items">
                <li>
                  <User size={16} />
                  <span>Hồ sơ cá nhân</span>
                </li>
                <li>
                  <Bell size={16} />
                  <span>Thông báo</span>
                </li>
                <li>
                  <Settings size={16} />
                  <span>Cài đặt tài khoản</span>
                </li>
                <div className="menu-divider"></div>
                <li className="logout-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Đăng xuất</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavHeader