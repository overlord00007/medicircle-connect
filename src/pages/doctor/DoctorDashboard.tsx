import { useState } from 'react';
import { mockPatientCases } from '@/data/mockData';
import { PatientCase } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ClipboardList, Clock, AlertTriangle, CheckCircle2, AlertCircle, ArrowUpRight, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState(mockPatientCases);
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);

  // Sort: urgent cases first
  const sortedCases = [...cases].sort((a, b) => {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    return (riskOrder[a.riskLevel || 'low'] - riskOrder[b.riskLevel || 'low']);
  });

  const getRiskBadge = (level?: string) => {
    switch (level) {
      case 'high': return <Badge className="bg-destructive">High Risk</Badge>;
      case 'medium': return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      default: return <Badge variant="secondary">Low</Badge>;
    }
  };

  const handleUpdateStatus = (id: string, status: PatientCase['status']) => {
    setCases(cases.map(c => c.id === id ? { ...c, status } : c));
    setSelectedCase(null);
  };

  const urgentCount = cases.filter(c => c.riskLevel === 'high').length;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Hello, Dr. {user?.name?.split(' ')[0]}! 👨‍⚕️</h1></div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stats-card"><ClipboardList className="h-8 w-8 text-primary" /><div><p className="text-3xl font-bold">{cases.length}</p><p className="text-sm text-muted-foreground">Total Cases</p></div></div>
        <div className="stats-card border-destructive/50"><AlertTriangle className="h-8 w-8 text-destructive" /><div><p className="text-3xl font-bold text-destructive">{urgentCount}</p><p className="text-sm text-muted-foreground">Urgent Cases</p></div></div>
        <div className="stats-card"><CheckCircle2 className="h-8 w-8 text-secondary" /><div><p className="text-3xl font-bold">{cases.filter(c => c.status === 'reviewed').length}</p><p className="text-sm text-muted-foreground">Reviewed</p></div></div>
      </div>

      {/* Cases List */}
      <div className="medical-card">
        <h2 className="mb-4 font-semibold">Patient Cases</h2>
        <div className="space-y-3">
          {sortedCases.map((caseItem) => (
            <div key={caseItem.id} onClick={() => setSelectedCase(caseItem)}
              className={cn('cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md',
                caseItem.riskLevel === 'high' ? 'border-destructive/50 bg-destructive/5' : 'border-border')}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{caseItem.patientName}</h3>
                  <p className="text-sm text-primary">{caseItem.medicineName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{caseItem.query}</p>
                  {caseItem.region && <span className="text-xs text-muted-foreground">{caseItem.region}</span>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getRiskBadge(caseItem.riskLevel)}
                  {caseItem.isPregnant && <Badge variant="outline" className="border-warning text-warning">Pregnant</Badge>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <SheetContent>
          {selectedCase && (
            <>
              <SheetHeader><SheetTitle>Case: {selectedCase.patientName}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4">
                <p><strong>Medicine:</strong> {selectedCase.medicineName}</p>
                <p><strong>Query:</strong> {selectedCase.query}</p>
                {selectedCase.allergies.length > 0 && <p className="text-warning"><AlertTriangle className="inline h-4 w-4" /> Allergies: {selectedCase.allergies.join(', ')}</p>}
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleUpdateStatus(selectedCase.id, 'reviewed')}><MessageSquare className="mr-2 h-4 w-4" />Respond</Button>
                  <Button variant="destructive" onClick={() => handleUpdateStatus(selectedCase.id, 'escalated')}><ArrowUpRight className="mr-2 h-4 w-4" />Escalate</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DoctorDashboard;
