import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { addProjectAction } from "../../store/actions/projectsAction";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { projectsAction } from "../../store/actions/projectsAction";
import { useDispatch } from "react-redux";
import { addUserAction, usersAction } from "../../store/actions/usersAction";

type ModalProps = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

const AddUser: React.FC<ModalProps> = ({ isModalOpen, handleCancel }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch<any>();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");

  const nameHandleChange = (e: any) => {
    setName(e.target.value);
    setNameError("");
  };

  const emailHandleChange = (e: any) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const passwordHandleChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const roleHandleChange = (e: any) => {
    setRole(e.target.value);
    setRoleError("");
  };

  const handleSubmit = async (e: any) => {
    let payload = {
      name,
      email,
      password,
      role,
    };
    e.preventDefault();
    if (!name) {
      return setNameError("Field is required");
    }
    if (!email) {
      return setEmailError("Field is required");
    }
    if (!password) {
      return setPasswordError("Field is required");
    }
    if (!role) {
      return setRoleError("Field is required");
    }

    try {
      const res = await addUserAction(payload);
      if (res?.data?.status == 201) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        dispatch(usersAction());
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
        title="Create User"
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
            placeholder="Enter Email"
            value={email}
            onChange={emailHandleChange}
          />
          {emailError && <FormValidationError error={emailError} />}
        </div>
        <div className="my-4">
          <Input
            placeholder="Enter Password"
            value={password}
            onChange={passwordHandleChange}
          />
          {passwordError && <FormValidationError error={passwordError} />}
        </div>
        <div className="my-4">
          <Input
            placeholder="Enter Role"
            value={role}
            onChange={roleHandleChange}
          />
          {roleError && <FormValidationError error={roleError} />}
        </div>
      </Modal>
    </>
  );
};

export default AddUser;
