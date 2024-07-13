import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { addProjectAction } from "../../store/actions/projectsAction";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { projectsAction } from "../../store/actions/projectsAction";
import { useDispatch } from "react-redux";

type ModalProps = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

const AddProject: React.FC<ModalProps> = ({ isModalOpen, handleCancel }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch<any>();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const nameHandleChange = (e: any) => {
    setName(e.target.value);
    setNameError("");
  };

  const descriptionHandleChange = (e: any) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handleSubmit = async (e: any) => {
    let payload = {
      name,
      description,
    };
    e.preventDefault();
    if (!name) {
      return setNameError("Field is required");
    }
    if (!description) {
      return setDescriptionError("Field is required");
    }

    try {
      const res = await addProjectAction(payload);
      if (res?.data?.status == 201) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        dispatch(projectsAction());
        handleCancel();
      } else {
        toast.success(res?.data?.message, {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {}
  };

  return (
    <>
      <Modal
        title="Create Project"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="my-4">
          <Input
            placeholder="Enter Name"
            value={name}
            onChange={nameHandleChange}
          />
          {nameError && <FormValidationError error={nameError} />}
        </div>
        <div className="my-4">
          <Input
            placeholder="Enter Description"
            value={description}
            onChange={descriptionHandleChange}
          />
          {descriptionError && <FormValidationError error={descriptionError} />}
        </div>
      </Modal>
    </>
  );
};

export default AddProject;
