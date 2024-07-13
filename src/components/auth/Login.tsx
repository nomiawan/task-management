import { Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { addLogin } from "../../store/actions/AddLoginAction";
import { toast } from "react-toastify";

export const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState<String>("");
  const [emailError, setEmailError] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordError, setPasswordError] = useState<String>("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) {
      return setEmailError("Email is required");
    }
    if (!password) {
      return setPasswordError("Password is required");
    }
    let payload = {
      email,
      password,
    };

    try {
      const res = await addLogin(payload);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res?.data?.status == 200) {
        localStorage.setItem("userData", JSON.stringify(res?.data?.data));
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        navigate("dashboard");
        window.location.reload()
      } else {
        toast.success(res?.data?.message, {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {
      if (err?.response?.status == 422) {
        toast.error(err?.response?.data?.message, {
          toastId: "catch-error-msg-1",
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-96 px-4 bg-teal-900 rounded-md">
        <div className="w-full text-center my-3">
          <h2 className="text-2xl text-black font-medium">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <Input
              placeholder="Enter your email"
              onChange={handleEmailChange}
            />
            {emailError && <FormValidationError error={emailError} />}
          </div>
          <div className="">
            <Input
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              type="password"
            />
            {passwordError && <FormValidationError error={passwordError} />}
          </div>
          <div className="mt-7 py-2">
            <button className="bg-black text-white w-full h-[35px] rounded-sm">
              Login
            </button>
          </div>
          <div className="pb-8">
            <h2>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("register")}
                className="text-blue-700 cursor-pointer"
              >
                Sign Up
              </span>{" "}
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};
