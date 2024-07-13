import { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { usersAction } from "../../store/actions/usersAction";
import AddUser from "./AddUser";
import UsersAction from "./UsersAction";

export const Users = () => {
  let dispatch = useDispatch<any>();
  const usersList = useSelector((state: any) => state.usersList);
  let { users, loading } = usersList;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (params: any) => <UsersAction {...{ params }} />,
    },
  ];

  useEffect(() => {
    dispatch(usersAction());
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
      <h2 className="text-lg font-medium">Users</h2>
      <div className="flex justify-end">
        <button
          className="bg-black text-white w-32 h-[35px] rounded"
          onClick={showModal}
        >
          Create User
        </button>
      </div>
      <div className="pt-4">
        <Table
          dataSource={users?.data?.data}
          columns={columns}
          scroll={{ y: 270 }}
        />
        ;
      </div>
      <AddUser isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};
