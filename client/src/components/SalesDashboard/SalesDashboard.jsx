import './SalesDashboard.scss';
import { Bell, PlusIcon , MoreHorizontal } from 'lucide-react';

const SalesDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.avatar);
  
  const recentSales = [
    { 
      name: 'Timothy Williams', 
      status: 'New', 
      amount: '+$324.99', 
      time: 'Today' 
    },
    { 
      name: 'Glen Wood', 
      status: 'New', 
      amount: '+$200.00', 
      time: '2 Day Ago' 
    },
    { 
      name: 'Raymond Johnson', 
      status: 'Cancelled', 
      amount: '', 
      time: '1 Day Ago' 
    },
    { 
      name: 'Kenneth Henderson', 
      status: 'Completed', 
      amount: '+$840.99', 
      time: '2 Days Ago' 
    }
  ];

  const topItemSales = [
    { name: 'DualSense', amount: '$320.24' },
    { name: 'Gamepad', amount: '$180.9' },
    { name: 'VR2', amount: '$124.0' },
    { name: 'Steam codes', amount: '$100.4' }
  ];

  return (
    <div className="sales-dashboard">
      <div className="header">
        <div className="search-container">
          <input type="text" placeholder="Start searching here..." />
        </div>
        <div className="header-icons">
          <Bell />
          <div className="profile-icon">
            <img src={user.avatar} alt={user.fullname} />
          </div>
        </div>
      </div>

      <h1>Your Sales Analysis</h1>

      <div className="dashboard-grid">
        <div className="ai-assistant">
          <div className="ai-content">
            <h3>AI Assistant</h3>
            <p>Analyze product sales over last year</p>
            <p>Compare revenue, quality, sales and brand</p>
            <button>
              Analyze product sales
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="total-sales">
          <div className="sales-header">
            <h4>Total Sales</h4>
            <div className="dropdown">
              Week <MoreHorizontal />
            </div>
          </div>
          <div className="sales-chart">
            {/* Bar chart placeholder */}
            <div className="bar-chart">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`bar ${i === 2 ? 'highlighted' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="sales-revenue">
          <div className="sales-header">
            <h4>Sales Revenue</h4>
            <div className="dropdown">
              <MoreHorizontal />
            </div>
          </div>
          <div className="revenue-amount">
            <div className="previous">$1,609.18</div>
            <div className="current">$2,189.21</div>
          </div>
        </div>

        <div className="recent-sales">
          <div className="sales-header">
            <h4>Recent sales</h4>
            <div className="dropdown">
              Week <MoreHorizontal />
            </div>
          </div>
          <div className="sales-list">
            {recentSales.map((sale, index) => (
              <div key={index} className="sale-item">
                <div className="sale-avatar">
                  <img src="/api/placeholder/40/40" alt={sale.name} />
                </div>
                <div className="sale-details">
                  <span className="name">{sale.name}</span>
                  <span className={`status ${sale.status.toLowerCase()}`}>
                    {sale.status}
                  </span>
                </div>
                <div className="sale-amount">{sale.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="growth-section">
          <div className="sales-header">
            <h4>Growth</h4>
          </div>
          <div className="growth-chart">
            <div className="growth-percentage">+73.1%</div>
            <div className="growth-circle"></div>
          </div>
        </div>

        <div className="top-item-sales">
          <div className="sales-header">
            <h4>Top Item Sales</h4>
            <a href="#">View All</a>
          </div>
          <div className="top-items-list">
            {topItemSales.map((item, index) => (
              <div key={index} className="top-item">
                <span className="item-name">{item.name}</span>
                <span className="item-amount">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;