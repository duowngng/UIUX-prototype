"use client"

import { use, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
    return (
    <Modal 
    title="Bạn có chắc chắn không?"
    description="Thao tác này không thể hoàn tác."
    isOpen={isOpen} 
    onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
}