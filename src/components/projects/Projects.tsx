import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectsAction } from "../../store/actions/projectsAction";
import ProjectsAction from "./ProjectsAction";

export const Projects = () => {
  let dispatch = useDispatch<any>();
  const projectsList = useSelector((state: any) => state.projectsList);
  let { projects, loading,error } = projectsList;

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
      render: (params: any) => <ProjectsAction {...{ params }} />,
    },
  ];

  useEffect(() => {
    dispatch(projectsAction());
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
      <div className="flex justify-end">
        <button
          className="bg-black text-white w-32 h-[35px] rounded"
          onClick={showModal}
        >
          Create Project
        </button>
      </div>
      <div className="pt-4">
        <Table
          dataSource={projects?.data?.data}
          columns={columns}
          scroll={{ y: 270 }}
        />
        ;
      </div>
      <AddProject isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};
