import { FC, ReactNode } from "react";
import styles from "./CustomBtn.module.scss";

interface IButton {
  children: ReactNode;
  onClickHandler: () => void;
  modifyStyles?: any;
}

const CustomButton: FC<IButton> = ({ children, onClickHandler, modifyStyles }) => {
  return (
    <button className={styles.custom__button} style={modifyStyles} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default CustomButton;
