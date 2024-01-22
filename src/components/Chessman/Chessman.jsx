import scss from "./Chessman.module.scss";
import clsx from "clsx";

const Chessman = ({ chessman, variant }) => {
  return <div className={clsx(scss.chessman, scss[variant])}>{chessman}</div>;
};

export default Chessman;
