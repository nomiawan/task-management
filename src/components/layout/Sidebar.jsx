import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export const Sidebar = () => {
  const { pathname } = useLocation();
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  return (
    <div className="bg-neutral-900 w-52 p-3 flex flex-col text-white">
      <div>
        <span className="text-neutral-100 text-lg">CodionsLab</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        <Link
          className={classNames(
            pathname == "/dashboard"
              ? "bg-neutral-700 text-white"
              : "text-neutral-400",
            linkClasses
          )}
          to={"/dashboard"}
        >
          Dashboard
        </Link>
        <Link
          className={classNames(
            pathname == "/dashboard/projects"
              ? "bg-neutral-700 text-white"
              : "text-neutral-400",
            linkClasses
          )}
          to={"/dashboard/projects"}
        >
          Projects
        </Link>
        {userData?.user?.role == "admin" && (
          <Link
            className={classNames(
              pathname == "/dashboard/users"
                ? "bg-neutral-700 text-white"
                : "text-neutral-400",
              linkClasses
            )}
            to={"/dashboard/users"}
          >
            Users
          </Link>
        )}
        <Link
          className={classNames(
            pathname == "/dashboard/settings"
              ? "bg-neutral-700 text-white"
              : "text-neutral-400",
            linkClasses
          )}
          to={"/dashboard/settings"}
        >
          Settings
        </Link>
      </div>
    </div>
  );
};
