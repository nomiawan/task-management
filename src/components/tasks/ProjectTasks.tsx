import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectTask,
  projectsTaskAction,
} from "../../store/actions/projectsTaskAction";
import moment from "moment";
import {
  EditOutlined,
  DeleteOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import DeleteModal from "../SharedUI/DeleteModal";
import { toast } from "react-toastify";
import UpdateTask from "./UpdateTask";
import SingleTask from "./SingleTask";

export const ProjectTasks = () => {
  let dispatch = useDispatch<any>();
  const projectsTaskList = useSelector((state: any) => state.projectsTaskList);
  let { projectsTask, loading } = projectsTaskList;
  let { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSingleTaskModalOpen, setIsSingleTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskId, setTaskId] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showSingleTaskModal = (id: any) => {
    setIsSingleTaskModalOpen(true);
    setTaskId(id);
  };

  const showEditModal = (id: any) => {
    setIsEditModalOpen(true);
    setTaskId(id);
  };

  const showDeleteModal = (id: any) => {
    setIsDeleteModalOpen(true);
    setTaskId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSingleTaskCancel = () => {
    setIsSingleTaskModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    dispatch(projectsTaskAction(id));
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      const res = await deleteProjectTask(id, taskId);
      if (res?.status == 204) {
        toast.success("Project deleted successfully", {
          toastId: "success-msg",
        });
        dispatch(projectsTaskAction(id));
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
      <div>
        <h2 className="text-lg font-medium pb-2">Tasks</h2>
        <div className="flex justify-end pb-2">
          <button
            className="bg-black text-white w-32 h-[35px] rounded"
            onClick={showModal}
          >
            Create Task
          </button>
        </div>
        <div className="flex flex-row gap-6">
          <div className="bg-white w-60 h-[450px] py-3 overflow-y-auto">
            <h2 className="text-lg font-medium text-center">Todo</h2>
            {projectsTask?.data?.map((data: any) => {
              return (
                <>
                  {data?.status == "todo" && (
                    <>
                      <div className="flex justify-end px-2 pb-3">
                        <Space size="small">
                          <Button
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(data)}
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteModal(data?.id)}
                          />
                        </Space>
                      </div>
                      <div
                        className="border rounded-sm px-2 h-24 mx-2 mb-2 cursor-pointer"
                        onClick={() => showSingleTaskModal(data?.id)}
                      >
                        <div key={data?.id}>
                          <h2>{data?.name}</h2>
                          <p>
                            {moment(data?.due_date).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>

          <div className="bg-white w-60 h-[450px] py-3 overflow-y-auto">
            <h2 className="text-lg font-medium text-center">In Progress</h2>
            {projectsTask?.data?.map((data: any) => {
              return (
                <>
                  {data?.status == "in-progress" && (
                    <>
                      <div className="flex justify-end px-2 pb-3">
                        <Space size="small">
                          <Button
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(data)}
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteModal(data?.id)}
                          />
                        </Space>
                      </div>
                      <div className="border rounded-sm px-2 h-24 mx-2 mb-2 cursor-pointer" onClick={() => showSingleTaskModal(data?.id)}>
                        <div key={data?.id}>
                          <h2>{data?.name}</h2>
                          <p>
                            {moment(data?.due_date).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>

          <div className="bg-white w-60 h-[450px] py-3 overflow-y-auto">
            <h2 className="text-lg font-medium text-center">Testing</h2>
            {projectsTask?.data?.map((data: any) => {
              return (
                <>
                  {data?.status == "testing" && (
                    <>
                      <div className="flex justify-end px-2 pb-3">
                        <Space size="small">
                          <Button
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(data)}
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteModal(data?.id)}
                          />
                        </Space>
                      </div>
                      <div className="border rounded-sm px-2 h-24 mx-2 mb-2 cursor-pointer" onClick={() => showSingleTaskModal(data?.id)}>
                        <div key={data?.id}>
                          <h2>{data?.name}</h2>
                          <p>
                            {moment(data?.due_date).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
          <div className="bg-white w-60 h-[450px] py-3 overflow-y-auto">
            <h2 className="text-lg font-medium text-center">Hold</h2>
            {projectsTask?.data?.map((data: any) => {
              return (
                <>
                  {data?.status == "hold" && (
                    <>
                      <div className="flex justify-end px-2 pb-3">
                        <Space size="small">
                          <Button
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(data)}
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteModal(data?.id)}
                          />
                        </Space>
                      </div>
                      <div className="border rounded-sm px-2 h-24 mx-2 mb-2 cursor-pointer" onClick={() => showSingleTaskModal(data?.id)}>
                        <div key={data?.id}>
                          <h2>{data?.name}</h2>
                          <p>
                            {moment(data?.due_date).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <AddTask isModalOpen={isModalOpen} handleCancel={handleCancel} id={id} />
      <DeleteModal
        handleDelete={handleDelete}
        isModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteCancel}
      />
      <UpdateTask
        isModalOpen={isEditModalOpen}
        handleCancel={handleEditCancel}
        tId={taskId}
      />
      {isSingleTaskModalOpen && (
        <SingleTask
          isModalOpen={isSingleTaskModalOpen}
          handleCancel={handleSingleTaskCancel}
          pId={id}
          tId={taskId}
        />
      )}
    </>
  );
};
