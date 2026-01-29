import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Users, Activity, TrendingUp, Search, MapPin, Pill, ArrowRight, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import api from '@/lib/api';
import { toast } from 'sonner';

const AdminDashboard = () => {

  // Mock Data for Charts
  const trendData = [
    { name: 'Mon', reported: 12, resolved: 10 },
    { name: 'Tue', reported: 19, resolved: 15 },
    { name: 'Wed', reported: 3, resolved: 5 },
    { name: 'Thu', reported: 25, resolved: 20 },
    { name: 'Fri', reported: 15, resolved: 12 },
    { name: 'Sat', reported: 8, resolved: 8 },
    { name: 'Sun', reported: 5, resolved: 4 },
  ];

  const riskData = [
    { name: 'Low Risk', value: 400, color: '#4ade80' },
    { name: 'Medium Risk', value: 300, color: '#facc15' },
    { name: 'High Risk', value: 100, color: '#f87171' },
    { name: 'Critical', value: 20, color: '#ef4444' },
  ];

  // Mock Users
  const users = [
    { id: 'DR001', name: 'Dr. Sarah Smith', role: 'Doctor', region: 'Mumbai', status: 'Active' },
    { id: 'PH002', name: 'Apollo Pharmacy', role: 'Pharmacist', region: 'Delhi', status: 'Active' },
    { id: 'PT003', name: 'Raj Kumar', role: 'Patient', region: 'Bangalore', status: 'Flagged' },
    { id: 'DR004', name: 'Dr. John Doe', role: 'Doctor', region: 'Chennai', status: 'Pending Review' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Medicine Form State
  const [medName, setMedName] = useState('');
  const [medStock, setMedStock] = useState('');

  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/medicines/', {
        name: medName,
        stock_level: parseInt(medStock),
        description: "Added via Admin Portal"
      });
      toast.success("Medicine Enlisted Successfully");
      setMedName('');
      setMedStock('');
    } catch (error) {
      toast.error("Failed to add medicine");
    }
  };

  return (
    <div className="space-y-6 container mx-auto max-w-7xl pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Command Center</h1>
          <p className="text-muted-foreground">System Overview & Governance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Activity className="mr-2 h-4 w-4" /> System Health: 98%</Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="mr-2 h-4 w-4" /> 5 Critical Alerts
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Mgmt</TabsTrigger>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* --- OVERVIEW --- */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Cases</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">23</div>
                <p className="text-xs text-muted-foreground">+2 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <UserCheck className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users Onboarded</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">+12 this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Case Activity</CardTitle>
                <CardDescription>Reported vs Resolved cases over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="reported" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity Feed</CardTitle>
                <CardDescription>Live system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px]">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">New Adverse Event Reported</p>
                          <p className="text-xs text-muted-foreground">Patient ID #{1000 + i} reported mild dizziness.</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Just now</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- USER MANAGEMENT --- */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, ID, or region..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0"
            />
            <Button>Add User</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-mono text-xs">{u.id}</TableCell>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                      <TableCell>{u.region}</TableCell>
                      <TableCell>
                        <Badge className={`${u.status === 'Active' ? 'bg-green-100 text-green-700' :
                          u.status === 'Flagged' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- MEDICINES MANAGEMENT --- */}
        <TabsContent value="medicines" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enlist New Medicine</CardTitle>
                <CardDescription>Add new drugs to the global registry</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMedicine} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Medicine Name</label>
                    <Input value={medName} onChange={e => setMedName(e.target.value)} placeholder="e.g. Paracetamol 500mg" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Initial Stock</label>
                    <Input type="number" value={medStock} onChange={e => setMedStock(e.target.value)} placeholder="0" required />
                  </div>
                  <Button type="submit" className="w-full">Enlist Medicine</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Additions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground text-center py-8">
                  (List will appear here after fetch implementation)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- ANALYTICS --- */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Risk Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Medicine Risk Assessment</CardTitle>
                <CardDescription>Distribution of reported cases by severity level</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Heatmap Placeholder */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Regional Heatmap</CardTitle>
                <CardDescription>Live cluster analysis of adverse events</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 min-h-[300px] bg-slate-50 dark:bg-slate-900 rounded-lg m-4 relative overflow-hidden group">
                {/* Mock Map Visual */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <MapPin className="h-40 w-40 text-primary" />
                </div>

                {/* Mock Hotspots */}
                <div className="absolute top-1/4 left-1/4 h-8 w-8 bg-red-500/50 rounded-full animate-ping" />
                <div className="absolute top-1/4 left-1/4 h-4 w-4 bg-red-600 rounded-full" />

                <div className="absolute bottom-1/3 right-1/3 h-12 w-12 bg-yellow-500/30 rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 h-6 w-6 bg-yellow-500 rounded-full" />

                <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs shadow-sm">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-600" /> High Incidence Areas</div>
                  <div className="flex items-center gap-1 mt-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Emerging Signals</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Flagged Medicines</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Adverse Events</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold text-primary">MedX-500</TableCell>
                    <TableCell>124</TableCell>
                    <TableCell className="text-red-500 flex items-center"><TrendingUp className="h-4 w-4 mr-1" /> High Increase</TableCell>
                    <TableCell>98% (Signal Confirmed)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">CureAll-Plus</TableCell>
                    <TableCell>89</TableCell>
                    <TableCell className="text-yellow-500">Stable</TableCell>
                    <TableCell>75% (Monitoring)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default AdminDashboard;
