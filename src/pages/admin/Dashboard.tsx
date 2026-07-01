import { useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { CalendarCheck, Wallet, Users, Clock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useBookingsRecordStore } from '../../store/bookingsRecordStore';
import { formatZmw } from '../../utils/format';

const ROOM_COLORS: Record<string, string> = {
  standard: '#a0d1ba',
  executive: '#e6c366',
};

function KpiCard({ icon: Icon, label, value }: { icon: typeof Wallet; label: string; value: string }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-soft-beige flex items-center justify-center text-forest-green-deep">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-label-sm text-on-surface-variant uppercase tracking-wide">{label}</p>
        <p className="font-display text-headline-md text-forest-green-deep">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { records, loading, error, fetchRecords } = useBookingsRecordStore();

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const stats = useMemo(() => {
    const pending = records.filter((r) => r.status === 'pending');
    const confirmed = records.filter((r) => r.status === 'confirmed');
    const projectedRevenue = confirmed.reduce((sum, r) => sum + r.total, 0);
    const totalGuests = records.reduce((sum, r) => sum + r.guests, 0);
    return { pendingCount: pending.length, confirmedCount: confirmed.length, projectedRevenue, totalGuests };
  }, [records]);

  const byDay = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((r) => {
      const day = format(parseISO(r.createdAt), 'MMM d');
      map.set(day, (map.get(day) ?? 0) + r.total);
    });
    return Array.from(map.entries()).map(([day, total]) => ({ day, total }));
  }, [records]);

  const roomSplit = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach((r) => {
      map.set(r.roomName, (map.get(r.roomName) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [records]);

  return (
    <AdminLayout>
      <h1 className="font-display text-headline-lg-mobile text-forest-green-deep mb-1">Dashboard</h1>
      <p className="text-body-md text-on-surface-variant mb-8">
        Live view of requests submitted through the website booking widget.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <KpiCard icon={Clock} label="Pending requests" value={String(stats.pendingCount)} />
        <KpiCard icon={CalendarCheck} label="Confirmed bookings" value={String(stats.confirmedCount)} />
        <KpiCard icon={Wallet} label="Confirmed revenue" value={formatZmw(stats.projectedRevenue)} />
        <KpiCard icon={Users} label="Total guests requested" value={String(stats.totalGuests)} />
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 text-error rounded-lg px-5 py-4 mb-6 text-body-md">
          Couldn't load bookings: {error}
        </div>
      )}

      {loading ? (
        <div className="bg-surface-container-lowest rounded-xl p-12 text-center ambient-shadow">
          <p className="text-body-lg text-on-surface-variant">Loading bookings…</p>
        </div>
      ) : records.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-12 text-center ambient-shadow">
          <p className="text-body-lg text-on-surface-variant">
            No booking requests yet. Once a guest submits the booking widget on the website, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 ambient-shadow">
            <h2 className="label-caps text-on-surface-variant mb-6">Requested value by day</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={byDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e3e2e2" />
                <XAxis dataKey="day" stroke="#717974" fontSize={12} />
                <YAxis stroke="#717974" fontSize={12} tickFormatter={(v) => `K${v}`} />
                <Tooltip formatter={(v: number) => formatZmw(v)} />
                <Bar dataKey="total" fill="#755b00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow">
            <h2 className="label-caps text-on-surface-variant mb-6">Room split</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={roomSplit} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {roomSplit.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.name.toLowerCase().includes('executive') ? ROOM_COLORS.executive : ROOM_COLORS.standard}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              {roomSplit.map((r) => (
                <span key={r.name} className="text-label-sm text-on-surface-variant flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: r.name.toLowerCase().includes('executive') ? ROOM_COLORS.executive : ROOM_COLORS.standard }}
                  />
                  {r.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
