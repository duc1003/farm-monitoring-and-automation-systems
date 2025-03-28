import { useState } from 'react';
import styles from './LeftSidebar.module.scss';
import { 
  LayoutGrid, 
  PlusSquare, 
  Settings, 
  BarChart2, 
  FileText, 
  HelpCircle 
} from 'lucide-react';

const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { 
      icon: LayoutGrid, 
      name: 'dashboard',
      title: 'Dashboard'
    },
    { 
      icon: PlusSquare, 
      name: 'add-widget',
      title: 'Add Widget'
    },
    { 
      icon: BarChart2, 
      name: 'analytics',
      title: 'Analytics'
    },
    { 
      icon: FileText, 
      name: 'documents',
      title: 'Documents'
    }
  ];

  const bottomItems = [
    { 
      icon: HelpCircle, 
      name: 'help',
      title: 'Help'
    },
    { 
      icon: Settings, 
      name: 'settings',
      title: 'Settings'
    }
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.menuTop}>
        {menuItems.map((item) => (
          <div 
            key={item.name}
            className={`${styles.menuItem} ${activeTab === item.name ? styles.active : ''}`}
            onClick={() => setActiveTab(item.name)}
            title={item.title}
          >
            <item.icon 
              className={`${styles.icon} ${activeTab === item.name ? styles.activeIcon : ''}`}
              strokeWidth={activeTab === item.name ? 2 : 1.5}
            />
            {activeTab === item.name && <div className={styles.activeIndicator}></div>}
          </div>
        ))}
      </div>

      <div className={styles.menuBottom}>
        {bottomItems.map((item) => (
          <div 
            key={item.name}
            className={styles.menuItem}
            title={item.title}
          >
            <item.icon 
              className={styles.icon}
              strokeWidth={1.5}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;