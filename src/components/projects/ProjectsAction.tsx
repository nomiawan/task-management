import React, { useState } from "react";
import { Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MenuFoldOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import DeleteModal from "../SharedUI/DeleteModal";
import { toast } from "react-toastify";
import { deleteProject } from "../../store/actions/projectsAction";
import { projectsAction } from "../../store/actions/projectsAction";
import { useDispatch } from "react-redux";
import UpdateProject from "./UpdateProject";
import { useNavigate } from "react-router-dom";
import AssignToUserProject from "../tasks/AssignToUserProject";

const ProjectsAction = ({ params }: any) => {
  let navigate = useNavigate();
  let dispatch = useDispatch<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleAssignCancel = () => {
    setIsAssignModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteProject(params?.id);
      if (res?.status == 204) {
        toast.success("Project deleted successfully", {
          toastId: "success-msg",
        });
        dispatch(projectsAction());
        handleCancel();
      } else {
        toast.success("data does not exist", {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {}
  };
  const handleClick = () => {
    navigate(`/dashboard/projects/tasks/${params?.id}`);
  };

  return (
    <>
      <Space size="small">
        <Button icon={<MenuFoldOutlined />} onClick={handleClick} />
        <Button icon={<EditOutlined onClick={showEditModal} />} />
        <Button icon={<ProjectOutlined onClick={showAssignModal} />} />
        <Button icon={<DeleteOutlined />} onClick={showModal} />
      </Space>
      <DeleteModal
        handleDelete={handleDelete}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
      <UpdateProject
        isEditModalOpen={isEditModalOpen}
        handleEditCancel={handleEditCancel}
        params={params}
      />
      {isAssignModalOpen && <AssignToUserProject
        isAssignModalOpen={isAssignModalOpen}
        handleAssignCancel={handleAssignCancel}
        params={params}
        />}
    </>
  );
};

export default ProjectsAction;
