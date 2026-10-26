import React from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Globe2,
  Briefcase,
  Newspaper,
  HelpCircle,
  Star,
  Inbox,
  LogOut,
  Home,
} from 'lucide-react';
import { clearAdminSession, getAdminUsername } from '../../lib/api';

const navItems = [
  { to: '/admin/leads', label: 'Leads', icon: Inbox },
  { to: '/admin/domestic-packages', label: 'Domestic Packages', icon: MapPin },
  { to: '/admin/international-packages', label: 'International Packages', icon: Globe2 },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/blogs', label: 'Blog', icon: Newspaper },
  { to: '/admin/faqs', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-blue-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <div className="font-bold">Mundo Yatra</div>
                <div className="text-xs text-blue-200">Admin Portal</div>
              </div>
            </div>
            <Link
              to="/"
              aria-label="Back to Mundo Yatra website"
              title="Back to Mundo Yatra website"
              className="p-2 rounded-full text-blue-100 hover:text-white hover:bg-blue-800 transition-colors"
            >
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-800 text-yellow-400 border-r-4 border-yellow-400'
                    : 'text-blue-100 hover:bg-blue-800'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="text-xs text-blue-200 mb-2 px-2">
            Logged in as <span className="font-semibold">{getAdminUsername()}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2 py-2 text-sm text-blue-100 hover:text-white hover:bg-blue-800 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="p-6 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
