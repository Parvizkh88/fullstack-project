import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-blue-800 text-white p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <ul>
        <li className={`mb-2 ${activeTab === 'products' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('products')}>
          Product Management
        </li>
        <li className={`mb-2 ${activeTab === 'users' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('users')}>
          User Management
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
