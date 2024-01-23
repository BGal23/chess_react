import scss from "./Chessman.module.scss";
import clsx from "clsx";

const Chessman = ({ chessman, variant }) => {
  return <span className={clsx(scss.chessman, scss[variant])}>{chessman}</span>;
};

export default Chessman;
