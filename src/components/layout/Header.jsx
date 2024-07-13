import { useNavigate } from "react-router-dom";
export const Header = () => {
  let navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white h-16 border-b border-gray-200 flex items-center px-3">
      <div className="w-full flex flex-row justify-between">
        <h2>Header</h2>
        <button className="text-blue-500" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};
