import { useState, useEffect, useRef, FC } from "react";
import { Transaction } from "../../app/types/webSocket";
import { createWebSocket, closeWebSocket } from "../../processes/getSocket";
import CryptoTransactionsUI from "./components/CryptoTransactionsUI";

const BitcoinTransactions: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const socket = useRef<WebSocket | null>(null);

  const handleNewTransaction = (tx: Transaction) => {
    setTransactions((prevTransactions) => [tx, ...prevTransactions]);
    setTotalValue((prevTotal) => prevTotal + tx.value);
  };

  const startSubscription = () => {
    if (socket.current) return;

    socket.current = createWebSocket({
      socketUrl: "wss://ws.blockchain.info/inv",
      onOpen: (data) => {
        if (data.op === "utx") {
          const value =
            data.x.out.reduce(
              (sum: number, output: any) => sum + output.value,
              0
            ) / 100000000;
          const transaction: Transaction = { hash: data.x.hash, value };
          handleNewTransaction(transaction);
        }
      },
      onClose: () => {
        console.log("WebSocket is closed");
        socket.current = null;
      },
      onError: (error) => console.error("WebSocket error:", error),
    });
  };

  const stopSubscription = () => {
    closeWebSocket(socket.current);
    socket.current = null;
  };

  const resetTransactions = () => {
    setTransactions([]);
    setTotalValue(0);
  };

  useEffect(() => {
    return () => {
      if (socket.current) {
        closeWebSocket(socket.current);
      }
    };
  }, []);

  return (
    <CryptoTransactionsUI
      transactions={transactions}
      start={startSubscription}
      stop={stopSubscription}
      reset={resetTransactions}
      totalValue={totalValue}
    />
  );
};

export default BitcoinTransactions;
