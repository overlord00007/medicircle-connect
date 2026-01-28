import { useState } from 'react';
import { mockMedicineQueries } from '@/data/mockData';
import { MedicineQuery } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Pill,
  MessageSquare,
  Clock,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PharmacistDashboard = () => {
  const { user } = useAuth();
  const [queries, setQueries] = useState(mockMedicineQueries);
  const [selectedQuery, setSelectedQuery] = useState<MedicineQuery | null>(null);
  const [response, setResponse] = useState('');

  const openCount = queries.filter(q => q.status === 'open').length;

  const handleAnswer = (id: string) => {
    setQueries(queries.map(q => q.id === id ? { ...q, status: 'answered' as const } : q));
    setSelectedQuery(null);
    setResponse('');
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome, {user?.name}! 💊
        </h1>
        <p className="mt-1 text-muted-foreground">
          Answer medicine queries and help patients
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="stats-card">
          <div className="flex items-center gap-3">
            <Pill className="h-8 w-8 text-primary" />
            <div>
              <p className="text-3xl font-bold">{queries.length}</p>
              <p className="text-sm text-muted-foreground">Total Queries</p>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-warning" />
            <div>
              <p className="text-3xl font-bold">{openCount}</p>
              <p className="text-sm text-muted-foreground">Open Queries</p>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-3xl font-bold">{queries.length - openCount}</p>
              <p className="text-sm text-muted-foreground">Answered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Queries Grid */}
      <div className="medical-card">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="h-5 w-5 text-primary" />
          Medicine Queries
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {queries.map((query, index) => (
            <div
              key={query.id}
              onClick={() => query.status === 'open' && setSelectedQuery(query)}
              className={cn(
                'animate-fade-in rounded-lg border border-border p-4 transition-all',
                query.status === 'open'
                  ? 'cursor-pointer hover:border-primary/50 hover:shadow-md'
                  : 'opacity-60'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{query.medicineName}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTime(query.timestamp)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={query.status === 'open' ? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'}
                >
                  {query.status === 'open' ? 'Open' : 'Answered'}
                </Badge>
              </div>

              <p className="mt-3 text-sm text-foreground">{query.question}</p>

              {query.patientInfo && (
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  {query.patientInfo}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Answer Dialog */}
      <Dialog open={!!selectedQuery} onOpenChange={() => setSelectedQuery(null)}>
        <DialogContent>
          {selectedQuery && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  {selectedQuery.medicineName}
                </DialogTitle>
                <DialogDescription>
                  Provide guidance for this medicine query
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm font-medium">{selectedQuery.question}</p>
                  {selectedQuery.patientInfo && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Patient: {selectedQuery.patientInfo}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Your Response</p>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your professional guidance..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="btn-medical-primary flex-1 gap-2"
                  onClick={() => handleAnswer(selectedQuery.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Answer Query
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => handleAnswer(selectedQuery.id)}
                >
                  <RefreshCw className="h-4 w-4" />
                  Suggest Alternative
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PharmacistDashboard;
