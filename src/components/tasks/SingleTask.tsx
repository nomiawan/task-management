import React, { useEffect, useState } from "react";
import { Button, Modal, Divider, Tooltip, Input } from "antd";
import { projectsSingleTaskAction } from "../../store/actions/projectsSingleTaskAction";
import { commentsAction, deleteComment } from "../../store/actions/commentsAction";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import AddSubTask from "./AddSubTask";
import { toast } from "react-toastify";
import { addCommentsAction } from "../../store/actions/commentsAction";
import { FormValidationError } from "../SharedUI/FormValidationError";
import AddReply from "./AddReply";
import DeleteModal from "../SharedUI/DeleteModal";

type ModalProps = {
  isModalOpen: boolean;
  handleCancel: () => void;
  pId: any;
  tId: any;
};

const SingleTask: React.FC<ModalProps> = ({
  isModalOpen,
  handleCancel,
  pId,
  tId,
}) => {
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [replyId, setReplyId] = useState("");
  let dispatch = useDispatch<any>();
  const projectsSingleTaskList = useSelector(
    (state: any) => state.projectsSingleTaskList
  );
  let { projectsSingleTask, loading } = projectsSingleTaskList;
  console.log("🚀 ~ projectsSingleTask:", projectsSingleTask)

  const commentsList = useSelector((state: any) => state.commentsList);
  let { comments } = commentsList;
  console.log("🚀 ~ comments:", comments);

  const commentHandleChange = (e: any) => {
    setComment(e.target.value);
    setCommentError("");
  };

  const showSubTaskModal = () => {
    setIsSubTaskModalOpen(true);
  };

  const handleSubTaskCancel = () => {
    setIsSubTaskModalOpen(false);
  };

  const showReplyModal = (id: any) => {
    setIsReplyModalOpen(true);
    setReplyId(id);
  };

  const handleReplyCancel = () => {
    setIsReplyModalOpen(false);
  };

  const showDeleteModal = (id: any) => {
    setIsDeleteModalOpen(true);
    setReplyId(id);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    dispatch(projectsSingleTaskAction(pId, tId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(commentsAction(pId, tId));
  }, [dispatch]);

  const handleSubmit = async (e: any) => {
    let payload = {
      content: comment,
    };
    e.preventDefault();
    if (!comment) {
      return setCommentError("Field is required");
    }

    try {
      const res = await addCommentsAction(pId, tId, payload);
      console.log("🚀 ~ handleSubmit ~ res:", res);
      if (res?.data?.status == 201) {
        localStorage.setItem("userData", JSON.stringify(res?.data?.data));
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        console.log("before here");
        dispatch(commentsAction(pId, tId));
        setComment("");
        console.log("after here");
      } else {
        toast.success(res?.data?.message, {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {}
  };

  const handleDelete = async () => {
    try {
      const res = await deleteComment(pId, tId, replyId);
      if (res?.status == 204) {
        toast.success("Project deleted successfully", {
          toastId: "success-msg",
        });
        dispatch(commentsAction(pId, tId));
        handleDeleteCancel();
      } else {
        toast.success("data does not exist", {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {}
  };

  return (
    <>
      <Modal
        title={projectsSingleTask?.data?.name}
        open={isModalOpen}
        onCancel={handleCancel}
        // width={800}
        style={{ top: 20 }}
      >
        <Divider />
        <h2 className="text-lg font-medium">Description</h2>
        <p>{projectsSingleTask?.data?.name}</p>
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-medium">Sub Task</h2>
          <Tooltip title="Add sub task">
            <PlusOutlined onClick={showSubTaskModal} />
          </Tooltip>
        </div>
        <div>
          {projectsSingleTask?.data?.subtasks?.map((subTask: any) => {
            console.log("🚀 ~ {projectsSingleTask?.data?.subtasks?.map ~ subTask:", subTask)
            return (
              <div className="flex flex-row justify-between py-2">
                <p>{subTask.name}</p>
                <p>{subTask.description}</p>
                <div className="flex flex-row gap-2">
                  <DeleteOutlined />
                  <div className="bg-green-600 h-6 w-16 rounded-md">
                    <p className="text-center items-center">{subTask.status}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h2 className="text-lg font-medium">Activity</h2>
          {comments?.data?.map((comment: any) => {
            return (
              <>
                <div className="bg-gray-200 px-2 h-16 pt-2">
                  <div className="flex justify-between">
                    <p>{comment?.content}</p>
                    <DeleteOutlined
                      onClick={() => showDeleteModal(comment?.id)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => showReplyModal(comment?.id)}>
                    Reply
                  </button>
                </div>
                {comment?.replies?.map((reply: any) => {
                  return (
                    <>
                      <div className="bg-gray-200 px-2 h-16 pt-2 ms-4">
                        <div className="flex justify-between">
                          <p>{reply?.content}</p>
                          <DeleteOutlined
                            onClick={() => showDeleteModal(reply?.id)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button onClick={() => showReplyModal(comment?.id)}>
                          Reply
                        </button>
                      </div>
                    </>
                  );
                })}
              </>
            );
          })}
          <div className="flex flex-row gap-2">
            <Input
              placeholder="Enter Comment"
              value={comment}
              onChange={commentHandleChange}
            />
            <SendOutlined onClick={handleSubmit} />
          </div>
          {commentError && <FormValidationError error={commentError} />}
        </div>
      </Modal>

      <AddSubTask
        isSubTaskModalOpen={isSubTaskModalOpen}
        handleSubTaskCancel={handleSubTaskCancel}
        pId={pId}
        tId={tId}
      />
      <AddReply
        isReplyModalOpen={isReplyModalOpen}
        handleReplyCancel={handleReplyCancel}
        pId={pId}
        tId={tId}
        rId={replyId}
      />
      <DeleteModal
        handleDelete={handleDelete}
        isModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteCancel}
      />
    </>
  );
};

export default SingleTask;
