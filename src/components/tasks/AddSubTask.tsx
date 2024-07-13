import React, { useState } from "react";
import { Button, Input, Modal, DatePicker } from "antd";
import { toast } from "react-toastify";
import { addProjectAction } from "../../store/actions/projectsAction";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { useDispatch } from "react-redux";
import { addProjectSubTaskAction } from "../../store/actions/projectsSubTaskAction";
import { projectsSingleTaskAction } from "../../store/actions/projectsSingleTaskAction";

type ModalProps = {
  isSubTaskModalOpen: boolean;
  handleSubTaskCancel: () => void;
  pId: any;
  tId: any;
};

const AddSubTask: React.FC<ModalProps> = ({
  isSubTaskModalOpen,
  handleSubTaskCancel,
  pId,
  tId,
}) => {
  let navigate = useNavigate();
  let dispatch = useDispatch<any>();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");

  const nameHandleChange = (e: any) => {
    setName(e.target.value);
    setNameError("");
  };

  const descriptionHandleChange = (e: any) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const onChange = (date: any, dateString: any) => {
    console.log("date", date, dateString);
    setDate(dateString);
  };

  const statusHandleChange = (e: any) => {
    setStatus(e.target.value);
    setStatusError("");
  };

  const handleSubmit = async (e: any) => {
    let payload = {
      parent_id: tId,
      name,
      description,
      due_date: date,
      status,
    };
    e.preventDefault();
    if (!name) {
      return setNameError("Field is required");
    }
    if (!description) {
      return setDescriptionError("Field is required");
    }
    if (!date) {
      return setDateError("Field is required");
    }

    try {
      const res = await addProjectSubTaskAction(pId, payload);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res?.data?.status == 201) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        dispatch(projectsSingleTaskAction(pId, tId));
        handleSubTaskCancel();
      } else {
        toast.success(res?.data?.message, {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {
      if (err?.response?.status == 422) {
        toast.error(err?.response?.data?.message, {
          toastId:"cache-error"
        })
      }
    }
  };

  return (
    <>
      <Modal
        title="Create Sub Task"
        open={isSubTaskModalOpen}
        onOk={handleSubmit}
        onCancel={handleSubTaskCancel}
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
        <div className="my-4">
          <DatePicker className="w-full" onChange={onChange} />
          {dateError && <FormValidationError error={dateError} />}
        </div>
        <div className="my-4">
          <Input
            placeholder="Enter Status"
            value={status}
            onChange={statusHandleChange}
          />
          {statusError && <FormValidationError error={statusError} />}
        </div>
      </Modal>
    </>
  );
};

export default AddSubTask;
