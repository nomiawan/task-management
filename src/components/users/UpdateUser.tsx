import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { useDispatch } from "react-redux";
import { updateUserAction, usersAction } from "../../store/actions/usersAction";

type ModalProps = {
  isEditModalOpen: boolean;
  handleEditCancel: () => void;
  params: any;
};

const UpdateUser: React.FC<ModalProps> = ({
  isEditModalOpen,
  handleEditCancel,
  params,
}) => {
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

  useEffect(() => {
    setName(params?.name);
    setEmail(params?.email);
    setPassword(params?.password);
    setRole(params?.role);
  }, []);

  const handleSubmit = async (e: any) => {
    let payload = {
      name,
      email,
      password,
      role,
      is_active: true,
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
      const res = await updateUserAction(params?.id, payload);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res?.data?.status == 200) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        dispatch(usersAction());
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
        title="Update User"
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

export default UpdateUser;
