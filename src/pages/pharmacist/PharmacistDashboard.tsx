import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Package, FileText, AlertCircle, Search, Plus, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const PharmacistDashboard = () => {
  const { user } = useAuth();

  // Mock Inventory Data
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol 500mg', stock: 1200, status: 'In Stock', demand: 'High' },
    { id: 2, name: 'Amoxicillin 250mg', stock: 50, status: 'Low Stock', demand: 'Medium' },
    { id: 3, name: 'Cetirizine 10mg', stock: 0, status: 'Out of Stock', demand: 'High' },
    { id: 4, name: 'Metformin 500mg', stock: 400, status: 'In Stock', demand: 'Low' },
  ]);

  // AI Bot State
  const [botMessages, setBotMessages] = useState<{ sender: 'user' | 'bot', text: string }[]>([
    { sender: 'bot', text: 'Hello! I am your AI SOP Assistant. Ask me about dosage guidelines or side effects.' }
  ]);
  const [botInput, setBotInput] = useState('');

  const handleBotSend = () => {
    if (!botInput.trim()) return;
    const newMessages = [...botMessages, { sender: 'user' as const, text: botInput }];
    setBotMessages(newMessages);
    setBotInput('');

    // Mock Response
    setTimeout(() => {
      setBotMessages(prev => [...prev, {
        sender: 'bot',
        text: `Based on standard guidelines, ${botInput.includes('dosage') ? 'the recommended dosage is...' : 'here is the information you requested...'}`
      }]);
    }, 1000);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Complaint Registered Successfully");
  };

  return (
    <div className="space-y-6 container mx-auto max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pharmacist Portal</h1>
          <p className="text-muted-foreground">{user?.name} • {user?.email}</p>
        </div>
        <Button onClick={() => toast.info("Syncing inventory...")} variant="outline" className="gap-2">
          <Package className="h-4 w-4" /> Sync Stock
        </Button>
      </div>

      <Tabs defaultValue="stock" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="complaints">Forms</TabsTrigger>
          <TabsTrigger value="sop">SOPs</TabsTrigger>
          <TabsTrigger value="ai">AI Help</TabsTrigger>
        </TabsList>

        {/* --- STOCK & DEMAND --- */}
        <TabsContent value="stock" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search medicines..." className="pl-9" />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Demand</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.stock} units</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.stock === 0 ? 'bg-red-100 text-red-700' : item.stock < 100 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.demand}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">Restock</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- COMPLAINT FORM --- */}
        <TabsContent value="complaints">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Report Adverse Event / Complaint</CardTitle>
              <CardDescription>Log issues reported by walk-in patients</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patient Name</Label>
                    <Input placeholder="Full Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="10-digit number" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Suspected Medicine</Label>
                  <Input placeholder="Brand or Generic Name" required />
                </div>
                <div className="space-y-2">
                  <Label>Issue Description</Label>
                  <Input placeholder="Describe side effects or defects..." required />
                </div>
                <Button type="submit" className="w-full">Submit Report</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- SOP & DOSAGE --- */}
        <TabsContent value="sop">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" /> Standard Operating Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Storage of Vaccines', 'Dispensing Schedule H Drugs', 'Handling Expired Medicine', 'Narcotics Record Keeping'].map((doc) => (
                  <div key={doc} className="p-3 border rounded-lg hover:bg-muted cursor-pointer flex justify-between items-center transition-colors">
                    <span>{doc}</span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" /> Critical Drug Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 text-red-900 p-4 rounded-lg border border-red-200 text-sm">
                  <strong>Recall Notice:</strong> Batches of "Xylocain 2%" (Batch #445) recalled due to crystallization issues. Check stock immediately.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- AI ASSISTANT --- */}
        <TabsContent value="ai">
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="bg-muted/50 border-b py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="h-4 w-4" /> AI Guidelines Helper
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {botMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
              <Input
                value={botInput}
                onChange={e => setBotInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleBotSend()}
                placeholder="Ask about interactions, dosage..."
              />
              <Button onClick={handleBotSend} size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default PharmacistDashboard;
