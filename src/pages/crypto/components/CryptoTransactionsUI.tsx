import { FC, useEffect } from "react";
import CustomButton from "../../../shared/button/CustomBtn";
import { ICryptoTransactionsUI } from "../../../app/types/webSocket";
import styles from "./CryptoTransactions.module.scss";
import { useNavigate } from "react-router";

const CryptoTransactionsUI: FC<ICryptoTransactionsUI> = ({
  start,
  stop,
  reset,
  transactions,
  totalValue,
}) => {

  const navigate = useNavigate()

  useEffect(() => {
    console.log(transactions);
  }, []);

  const navigateHandler =( ) => {
    navigate('/')
  }

  return (
    <div className={`${styles.container} animate `}>
      <CustomButton onClickHandler={navigateHandler}>Task 1</CustomButton>
    <div className={styles.crypto}>
      <h2>Transactions list</h2>
      <div className={styles.crypto__buttons}>
        <CustomButton modifyStyles={{backgroundColor: '#a2d5a2'}} onClickHandler={start}>Start</CustomButton>
        <CustomButton modifyStyles={{backgroundColor: '#ff9393'}} onClickHandler={stop}>Stop</CustomButton>
        <CustomButton modifyStyles={{backgroundColor: '#f1f19d'}} onClickHandler={reset}>Reset</CustomButton>
      </div>
      <p>
        Total transactions sum: <strong>{totalValue.toFixed(8)} BTC</strong>
      </p>
      <ul className={styles.crypto__list}>
        {transactions.map((tx, index) => (
          <li className={styles.crypto__list_content} key={index}>
            <p>Hash: {tx.hash}</p>
            <p>Sum: <strong>{tx.value.toFixed(8)} BTC</strong></p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CryptoTransactionsUI;
