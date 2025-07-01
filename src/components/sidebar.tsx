import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  LogOut,
  Send,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LifeBuoy,
  FileBarChart2,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { useUserProfile } from '@/hooks/useUserProfile';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { data: userProfile } = useUserProfile();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { name: 'Pay in', icon: <ArrowRightLeft size={20} />, href: '/pay-in' },
    { name: 'Accounts', icon: <Wallet size={20} />, href: '/accounts' },
    { name: 'Payout', icon: <Send size={20} />, href: '/payout' },
    { name: 'Billings', icon: <CreditCard size={20} />, href: '/billings' },
    { name: 'Reconciliation', icon: <FileBarChart2 size={20} />, href: '/reconciliation' },
    { name: 'Reports', icon: <BarChart3 size={20} />, href: '/reports' }
  ];

  const bottomNavItems = [
    { name: 'Notifications', icon: <Bell size={20} />, href: '/notifications' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/settings' },
    { name: 'Support', icon: <LifeBuoy size={20} />, href: '/support' },
    { name: 'Logout', icon: <LogOut size={20} />, href: '/logout' }
  ];

  const displayName = userProfile?.first_name || 'User';
  const initials = userProfile?.first_name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className={cn("w-60 min-h-screen bg-slate-50 border-r flex flex-col", className)}>
      <div className="p-4">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 pt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md",
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-4 mt-auto">
        <div className="py-4 space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center relative">
              <span className="text-gray-600">{initials}</span>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <div className="text-xs text-gray-500">Welcome back 👋</div>
              <div className="font-medium text-sm">{displayName}</div>
            </div>
            <button className="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;