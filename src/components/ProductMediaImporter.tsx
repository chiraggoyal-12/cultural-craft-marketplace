import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Check, AlertCircle } from 'lucide-react';

interface CSVRow {
  product_id: string;
  media_url: string;
  media_type: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
}

export const ProductMediaImporter = () => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const parseCSV = (csvText: string): CSVRow[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const rows: CSVRow[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',');
      if (values.length >= 6) {
        rows.push({
          product_id: values[0].trim(),
          media_url: values[1].trim(),
          media_type: values[2].trim(),
          alt_text: values[3].trim(),
          sort_order: parseInt(values[4].trim()),
          is_primary: values[5].trim().toUpperCase() === 'TRUE'
        });
      }
    }
    
    return rows;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      
      setProgress({ current: 0, total: rows.length });
      
      // Clear existing product_media
      const { error: deleteError } = await supabase
        .from('product_media')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (deleteError) throw deleteError;

      // Insert in batches of 50
      const batchSize = 50;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        
        const { error: insertError } = await supabase
          .from('product_media')
          .insert(batch.map(row => ({
            product_id: row.product_id,
            media_url: row.media_url,
            media_type: row.media_type,
            alt_text: row.alt_text,
            sort_order: row.sort_order,
            is_primary: row.is_primary
          })));
        
        if (insertError) throw insertError;
        
        setProgress({ current: Math.min(i + batchSize, rows.length), total: rows.length });
      }
      
      toast.success(`Successfully imported ${rows.length} media items!`);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import media. Please check the console for details.');
    } finally {
      setImporting(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-card">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Import Product Media</h3>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file with columns: product_id, media_url, media_type, alt_text, sort_order, is_primary
        </p>
      </div>
      
      {importing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 animate-spin" />
            <span>Importing... {progress.current} / {progress.total}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <Button asChild>
              <span className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Choose CSV File
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  );
};
