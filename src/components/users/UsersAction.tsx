import React, { useState } from "react";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import UpdateUser from "./UpdateUser";
import { deleteUser, usersAction } from "../../store/actions/usersAction";
import DeleteModal from "../SharedUI/DeleteModal";

const UsersAction = ({ params }: any) => {
  let dispatch = useDispatch<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
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

  const handleDelete = async () => {
    try {
      const res = await deleteUser(params?.id);
      console.log("🚀 ~ handleDelete ~ res:", res);
      if (res?.status == 204) {
        toast.success("Project deleted successfully", {
          toastId: "success-msg",
        });
        dispatch(usersAction());
        handleCancel();
      } else {
        toast.success("data does not exist", {
          toastId: "error-msg",
        });
      }
    } catch (err: any) {}
  };

  return (
    <>
      <Space size="small">
        <Button icon={<EditOutlined onClick={showEditModal} />} />
        <Button icon={<DeleteOutlined />} onClick={showModal} />
      </Space>
      <DeleteModal
        handleDelete={handleDelete}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
      <UpdateUser
        isEditModalOpen={isEditModalOpen}
        handleEditCancel={handleEditCancel}
        params={params}
      />
    </>
  );
};

export default UsersAction;
