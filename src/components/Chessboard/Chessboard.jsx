import scss from "./Chessboard.module.scss";
import clsx from "clsx";

const Chessboard = ({ variant, id, children, move, attack }) => {
  return (
    <div
      id={id}
      key={id}
      className={clsx(scss.square, scss[variant], {
        [scss.move]: move === true,
        [scss.attack]: attack === true,
      })}
    >
      {children}
    </div>
  );
};

export default Chessboard;
