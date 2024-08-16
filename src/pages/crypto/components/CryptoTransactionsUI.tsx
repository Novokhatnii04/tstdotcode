import { FC, useEffect } from "react";
import CustomButton from "../../../shared/button/CustomBtn";
import { ICryptoTransactionsUI } from "../../../app/types/webSocket";
import styles from "./CryptoTransactions.module.scss";

const CryptoTransactionsUI: FC<ICryptoTransactionsUI> = ({
  start,
  stop,
  reset,
  transactions,
  totalValue,
}) => {

  useEffect(() => {
    console.log(transactions);
  }, []);

  return (
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
            <p>Sum: {tx.value.toFixed(8)} BTC</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoTransactionsUI;
