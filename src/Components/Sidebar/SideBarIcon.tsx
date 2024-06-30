import { Link } from "react-router-dom";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib";

type SideBarProps = {
  icon: ReactElement<IconType>;
  path: string;
};

const SideBarIcon = (props: SideBarProps) => {
  const { icon, path } = props;
  return (
    <Link to={path}>
      <div className="sidebar-icon">{icon}</div>
    </Link>
  );
};

export default SideBarIcon;
