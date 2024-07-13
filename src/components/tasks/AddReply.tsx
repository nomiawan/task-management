import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormValidationError } from "../SharedUI/FormValidationError";
import { useDispatch } from "react-redux";
import {
  addProjectTaskAction,
  projectsTaskAction,
} from "../../store/actions/projectsTaskAction";
import {
  addCommentsAction,
  commentsAction,
} from "../../store/actions/commentsAction";

type ModalProps = {
  isReplyModalOpen: boolean;
  handleReplyCancel: () => void;
  pId: any;
  tId: any;
  rId: any;
};

const AddReply: React.FC<ModalProps> = ({
  isReplyModalOpen,
  handleReplyCancel,
  pId,
  tId,
  rId,
}) => {
  let navigate = useNavigate();
  let dispatch = useDispatch<any>();
  const [reply, setReply] = useState<string>("");
  const [replyError, setReplyError] = useState<string>("");

  const replyHandleChange = (e: any) => {
    setReply(e.target.value);
    setReplyError("");
  };

  const handleSubmit = async (e: any) => {
    let payload = {
      parent_id: rId,
      content: reply,
    };
    e.preventDefault();
    if (!reply) {
      return setReplyError("Field is required");
    }

    try {
      const res = await addCommentsAction(pId, tId, payload);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res?.data?.status == 201) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        dispatch(commentsAction(pId, tId));
        handleReplyCancel();
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
        title="Add Reply"
        open={isReplyModalOpen}
        onOk={handleSubmit}
        onCancel={handleReplyCancel}
      >
        <div className="my-4">
          <Input
            placeholder="Enter Reply"
            value={reply}
            onChange={replyHandleChange}
          />
          {replyError && <FormValidationError error={replyError} />}
        </div>
      </Modal>
    </>
  );
};

export default AddReply;
