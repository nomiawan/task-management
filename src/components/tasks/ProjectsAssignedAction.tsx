import React, { useState } from "react";
import { Button, Space } from "antd";
import {
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProjectsAssignedAction = ({ params }: any) => {
  let navigate = useNavigate();

  
  const handleClick = () => {
    navigate(`/dashboard/projects/tasks/${params?.id}`);
  };

  return (
    <>
      <Space size="small">
        <Button icon={<MenuFoldOutlined />} onClick={handleClick} />
      </Space>
    </>
  );
};

export default ProjectsAssignedAction;
