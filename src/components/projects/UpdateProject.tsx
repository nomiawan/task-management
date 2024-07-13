import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import {
  addProjectAction,
  updateProjectAction,
} from "../../store/actions/projectsAction";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { projectsAction } from "../../store/actions/projectsAction";
import { useDispatch } from "react-redux";

type ModalProps = {
  isEditModalOpen: boolean;
  handleEditCancel: () => void;
  params: any;
};

const UpdateProject: React.FC<ModalProps> = ({
  isEditModalOpen,
  handleEditCancel,
  params,
}) => {
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

  useEffect(() => {
    setName(params?.name);
    setDescription(params?.description);
  }, [dispatch,params?.id]);

  const handleSubmit = async (e: any) => {
    let payload = {
      name,
      description,
      is_active: true,
    };
    e.preventDefault();
    if (!name) {
      return setNameError("Field is required");
    }
    if (!description) {
      return setDescriptionError("Field is required");
    }

    try {
      const res = await updateProjectAction(params?.id, payload);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res?.data?.status == 200) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        dispatch(projectsAction());
        handleEditCancel();
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
        title="Update Project"
        open={isEditModalOpen}
        onOk={handleSubmit}
        onCancel={handleEditCancel}
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

export default UpdateProject;
