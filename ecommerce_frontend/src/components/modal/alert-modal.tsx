import React from "react";
import {Modal} from "@/components/ui/modal.tsx";
import {Button} from "@/components/ui/button.tsx";

interface AlertModalProps {
  isOpen: boolean;
  onclose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
                                                        isOpen,
                                                        onclose,
                                                        onConfirm,
                                                        loading
                                                      }) => {
  return (
    <Modal title="Are you sure?"
     description={"This action cannot be up done"}
     isOpen={isOpen}
     onClose={onclose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onclose}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
          className="cursor-pointer"
        >
          Continue
        </Button>
      </div>
    </Modal>
  )
}