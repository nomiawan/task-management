import { Input,Col, Row } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addProfileAction } from "../../store/actions/profileAction";
import { FormValidationError } from "../SharedUI/FormValidationError";

export const Settings = () => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  console.log("🚀 ~ Settings ~ userData:", userData);

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

  useEffect(() => {
    setName(userData?.user?.name);
    setEmail(userData?.user?.email);
    setPassword(userData?.user?.password);
  }, []);

  const handleSubmit = async (e: any) => {
    let payload = {
      name,
      email,
      password,
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

    try {
      const res = await addProfileAction(payload);
      if (res?.data?.status == 201) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
      } else {
        toast.success(res?.data?.message, {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      if (err?.response?.status == 403) {
        toast.error(err?.response?.data?.message, {
          toastId: "catch-error-msg-1",
        });
      }
    }
  };

  return (
    <div className="bg-white w-full h-screen px-4 py-4">
      <h2 className="text-lg font-medium">Profile</h2>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="my-4">
            <Input
              placeholder="Enter Name"
              value={name}
              onChange={nameHandleChange}
            />
            {nameError && <FormValidationError error={nameError} />}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="my-4">
            <Input
              placeholder="Enter Email"
              value={email}
              onChange={emailHandleChange}
            />
            {emailError && <FormValidationError error={emailError} />}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="my-4">
            <Input
              placeholder="Enter Password"
              value={password}
              onChange={passwordHandleChange}
            />
            {passwordError && <FormValidationError error={passwordError} />}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
          <button
            className="bg-black text-white w-full h-[35px] rounded-sm"
            onClick={handleSubmit}
          >
            Save
          </button>
        </Col>
      </Row>
    </div>
  );
};
