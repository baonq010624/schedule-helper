'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemName: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  isDangerous?: boolean;
}

export function DeleteConfirmation({
  isOpen,
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
  isDangerous = false,
}: DeleteConfirmationProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {isDangerous && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
            )}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            {message}
            {itemName && (
              <span className="mt-1 block font-medium text-foreground">"{itemName}"</span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
