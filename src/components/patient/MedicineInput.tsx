import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicineInputProps {
  onSearch?: (query: string) => void;
}

const MedicineInput = ({ onSearch }: MedicineInputProps) => {
  const [medicineName, setMedicineName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSearch = () => {
    if (medicineName.trim() || imagePreview) {
      onSearch?.(medicineName);
    }
  };

  return (
    <div className="medical-card space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Search className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Medicine Lookup</h3>
          <p className="text-sm text-muted-foreground">Upload image or enter name</p>
        </div>
      </div>

      {/* Image Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/50',
          imagePreview ? 'p-2' : 'p-8'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Medicine preview"
              className="mx-auto max-h-48 rounded-lg object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Upload medicine image</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Supports JPG, PNG, WEBP
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="medicine">Medicine Name</Label>
        <div className="flex gap-2">
          <Input
            id="medicine"
            placeholder="e.g., Paracetamol 500mg"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={!medicineName.trim() && !imagePreview}
            className="btn-medical-primary"
          >
            <Search className="mr-2 h-4 w-4" />
            Lookup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicineInput;
