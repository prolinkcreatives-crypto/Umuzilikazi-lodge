import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, LogOut } from 'lucide-react';
import ShieldMark from '../ShieldMark';
import { useAuthStore } from '../../store/authStore';
import { lodgeInfo } from '../../design-system/tokens';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen flex bg-soft-beige">
      <aside className="w-64 shrink-0 bg-forest-green-deep text-ivory-white flex flex-col">
        <div className="flex items-center gap-3 px-6 py-7 border-b border-ivory-white/10">
          <ShieldMark className="h-9 w-auto text-ivory-white" />
          <div>
            <p className="font-display text-body-lg leading-tight">{lodgeInfo.name}</p>
            <p className="label-caps text-warm-gold-bright text-[10px]">Reception</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded label-caps transition-colors ${
                  isActive ? 'bg-warm-gold text-ivory-white' : 'text-ivory-white/70 hover:bg-ivory-white/10'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-4 mx-4 mb-6 rounded label-caps text-ivory-white/60 hover:bg-ivory-white/10 transition-colors"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 px-6 md:px-10 py-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
