import { mockDashboardStats, medicineStats, regionStats, allergyTrends, mockRecentActivity } from '@/data/mockData';
import { AlertTriangle, Pill, MapPin, Activity, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard 📊</h1>

      {/* Priority Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stats-card border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <p className="text-3xl font-bold text-destructive">{stats.urgentCasesToday}</p>
          <p className="text-sm">🚨 Urgent Cases Today</p>
        </div>
        <div className="stats-card border-warning/50 bg-warning/5">
          <Pill className="h-8 w-8 text-warning" />
          <p className="text-3xl font-bold">{stats.highRiskMedicines}</p>
          <p className="text-sm">⚠️ High Risk Medicines</p>
        </div>
        <div className="stats-card">
          <MapPin className="h-8 w-8 text-primary" />
          <p className="text-3xl font-bold">{stats.regionsWithAlerts}</p>
          <p className="text-sm">🌍 Regions with Alerts</p>
        </div>
        <div className="stats-card">
          <Users className="h-8 w-8 text-secondary" />
          <p className="text-3xl font-bold">{stats.totalPatients.toLocaleString()}</p>
          <p className="text-sm">Total Patients</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Medicine Stats */}
        <div className="medical-card">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><Pill className="h-5 w-5 text-primary" />Medicine-wise Stats</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="pb-2 text-left">Medicine</th><th className="pb-2 text-right">Queries</th><th className="pb-2 text-right">Alerts</th><th className="pb-2 text-right">Conflicts</th></tr></thead>
              <tbody>
                {medicineStats.slice(0, 6).map((m) => (
                  <tr key={m.name} className="border-b last:border-0">
                    <td className="py-2">{m.name}</td>
                    <td className="py-2 text-right">{m.queries}</td>
                    <td className="py-2 text-right text-warning">{m.alerts}</td>
                    <td className="py-2 text-right text-destructive">{m.allergyConflicts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Region Stats */}
        <div className="medical-card">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><MapPin className="h-5 w-5 text-primary" />Region-wise Stats (India)</h2>
          <div className="space-y-3">
            {regionStats.map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-lg border p-3">
                <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.users.toLocaleString()} users</p></div>
                <div className="text-right">
                  <p className={cn('font-bold', r.urgentCases > 25 ? 'text-destructive' : 'text-foreground')}>{r.urgentCases} urgent</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Allergy Trends */}
        <div className="medical-card">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><Activity className="h-5 w-5 text-primary" />Allergy Trends</h2>
          <div className="space-y-3">
            {allergyTrends.map((a) => (
              <div key={a.name} className="space-y-1">
                <div className="flex justify-between text-sm"><span>{a.name}</span><span>{a.cases} cases ({a.percentage}%)</span></div>
                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-destructive" style={{ width: `${a.percentage}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="medical-card">
          <h2 className="mb-4 flex items-center gap-2 font-semibold"><TrendingUp className="h-5 w-5 text-primary" />Recent Activity</h2>
          <div className="space-y-3">
            {mockRecentActivity.map((a) => (
              <div key={a.id} className={cn('flex items-center justify-between rounded-lg border p-3', a.type === 'urgent' && 'border-destructive/50 bg-destructive/5')}>
                <div><p className="text-sm font-medium">{a.action}</p><p className="text-xs text-muted-foreground">by {a.user}</p></div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
