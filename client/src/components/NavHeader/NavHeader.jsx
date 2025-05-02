import { Search } from 'lucide-react';
import "./NavHeader.scss";

function NavHeader() {
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
              <div className="avatar">
                <img src="/api/placeholder/40/40" alt="User avatar" />
              </div>
            </div>
          </header>
  )
}

export default NavHeader