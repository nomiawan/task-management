import { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { assignedProjectsAction } from "../../store/actions/assignedProjectsAction";
import ProjectsAssignedAction from "./ProjectsAssignedAction";
import AddProject from "../projects/AddProject";

export const AssignedProjects = () => {
  let dispatch = useDispatch<any>();
  const assignedProjectsList = useSelector((state: any) => state.assignedProjectsList);
  let { assignedProjects, loading } = assignedProjectsList;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (params: any) => <ProjectsAssignedAction {...{ params }} />,
    },
  ];

  useEffect(() => {
    dispatch(assignedProjectsAction());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white w-full h-screen px-4 py-4">
      <h2 className="text-lg font-medium">Projects</h2>
      <div className="pt-4">
        <Table
          dataSource={assignedProjects?.data?.data}
          columns={columns}
          scroll={{ y: 270 }}
        />
        ;
      </div>
      <AddProject isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};
