import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { usersAction } from "../../store/actions/usersAction";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { updateProjectAssignAction } from "../../store/actions/assignedProjectsAction";

type ModalProps = {
  isAssignModalOpen: boolean;
  handleAssignCancel: () => void;
  params:any
};

const AssignToUserProject: React.FC<ModalProps> = ({
  isAssignModalOpen,
  handleAssignCancel,
  params
}) => {

  let dispatch = useDispatch<any>();
  const usersList = useSelector((state: any) => state.usersList);
  let { users, loading } = usersList;
  const [chipData, setChipData] = useState([]);
  console.log("🚀 ~ chipData:", chipData)

  useEffect(() => {
    dispatch(usersAction());
  }, [dispatch]);

  useEffect(() => {
    if (users?.data?.data) {
      setChipData(users.data.data);
    }
  }, [users]);

  const handleChipsDelete = (data:any) => {
    setChipData((chips:any) => chips.filter((chip:any) => chip?.id !== data?.id));
  }

  const handleSubmit = async (e: any) => {
    let payload = {
      user_ids:chipData.map((user:any) => user.id)
    };

    try {
      const res = await updateProjectAssignAction(params?.id,payload);
      if (res?.data?.status == 200) {
        toast.success(res?.data?.message, {
          toastId: "success-msg",
        });
        handleAssignCancel();
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
        title="Assign to User"
        open={isAssignModalOpen}
        onCancel={handleAssignCancel}
        onOk={handleSubmit}
      >
        <div className="flex flex-wrap gap-2">
        {chipData?.map((user: any, index: number) => (
          <div key={index} className="bg-gray-400 text-white rounded-full px-4 py-2" >
            {user?.name}
            <button onClick={() => handleChipsDelete(user)} className="ms-2 text-md font-medium">×</button>
          </div>
        ))}
      </div>
      </Modal>
    </>
  );
};

export default AssignToUserProject;
