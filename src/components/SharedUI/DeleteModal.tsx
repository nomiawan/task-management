import React, { useState } from "react";
import { Button, Modal } from "antd";

type ModalProps = {
  handleDelete: () => void;
  isModalOpen: boolean;
  handleCancel: () => void;
};

const DeleteModal: React.FC<ModalProps> = ({
  isModalOpen,
  handleCancel,
  handleDelete,
}) => {
  return (
    <>
      <Modal
        title="Delete"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleDelete}
      >
        <p className="text-lg font-sm">Are you sure you want to delete this?</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
