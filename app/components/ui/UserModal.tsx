"use client";
import { ReactNode } from "react";
import { AlertDialog ,AlertDialogContent,AlertDialogAction,AlertDialogCancel,AlertDialogHeader,AlertDialogFooter,AlertDialogDescription,AlertDialogTitle} from "./alert-dialog";

type DynamicModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function DynamicModal({
  isOpen,
  onClose,
  title,
  children,
}: DynamicModalProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}  >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Captue image</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}