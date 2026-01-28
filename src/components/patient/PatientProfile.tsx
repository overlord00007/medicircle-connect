import { useState } from 'react';
import { mockPatientProfile } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Save, AlertTriangle, Heart, Pill } from 'lucide-react';

const commonAllergies = [
  'Penicillin',
  'Sulfa drugs',
  'Aspirin',
  'NSAIDs',
  'Latex',
  'Shellfish',
];

const PatientProfile = () => {
  const [profile, setProfile] = useState(mockPatientProfile);
  const [isEditing, setIsEditing] = useState(false);

  const toggleAllergy = (allergy: string) => {
    setProfile((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
  };

  return (
    <div className="medical-card">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">My Health Profile</h3>
        </div>
        <Button
          variant={isEditing ? 'default' : 'outline'}
          size="sm"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={isEditing ? 'btn-medical-secondary' : ''}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" /> Save
            </>
          ) : (
            'Edit'
          )}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={profile.age}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, age: parseInt(e.target.value) || 0 }))
            }
            disabled={!isEditing}
            className="max-w-24"
          />
        </div>

        {/* Allergies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <Label>Known Allergies</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {commonAllergies.map((allergy) => (
              <label
                key={allergy}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={profile.allergies.includes(allergy)}
                  onCheckedChange={() => isEditing && toggleAllergy(allergy)}
                  disabled={!isEditing}
                />
                <span className="text-sm">{allergy}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-destructive" />
            <Label>Existing Conditions</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.conditions.map((condition) => (
              <span
                key={condition}
                className="rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        {/* Current Medicines */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" />
            <Label>Current Medicines</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.currentMedicines.map((medicine) => (
              <span
                key={medicine}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {medicine}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
