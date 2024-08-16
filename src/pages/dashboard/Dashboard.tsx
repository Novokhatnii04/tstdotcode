import React, { useState, useLayoutEffect } from "react";
import styles from "./Dashboard.module.scss";
import CustomButton from "../../shared/button/CustomBtn";
import { Rnd } from "react-rnd";
import { IBlock, defaultBlocks } from "../../app/config/blocksData";
import { useNavigate } from "react-router";

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [blocks, setBlocks] = useState<IBlock[]>(
    JSON.parse(localStorage.getItem("blocks") as string) || defaultBlocks
  );

  useLayoutEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  //Reset all blcks to default positions
  const resetBlocks = () => {
    setBlocks(defaultBlocks);
    localStorage.removeItem("blocks");
  };

  //Resize block
  const bringToFront = (id: string) => {
    setBlocks((prevBlocks) => {
      const maxZIndex = Math.max(...prevBlocks.map((block) => block.zIndex));
      return prevBlocks.map((block) =>
        block.id === id ? { ...block, zIndex: maxZIndex + 1 } : block
      );
    });
  };

  //Delete one current block
  const removeBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  

  return (
    <div className={`${styles.container} animate`}>
      <CustomButton onClickHandler={resetBlocks}>Reset all</CustomButton>
      <CustomButton modifyStyles={{marginLeft : 10}} onClickHandler={() => navigate('cryptoTransactions')}>Task 2</CustomButton>
      {blocks.map((block) => (
        <Rnd
          key={block.id}
          size={{ width: block.width, height: block.height }}
          position={{ x: block.x, y: block.y }}
          minWidth={100}
          minHeight={30}
          style={{ zIndex: block.zIndex, transition: "0.1s" }}
          onDragStop={(e, d) => {
            setBlocks((prevBlocks) =>
              prevBlocks.map((b) =>
                b.id === block.id ? { ...b, x: d.x, y: d.y } : b
              )
            );
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setBlocks((prevBlocks) =>
              prevBlocks.map((b) =>
                b.id === block.id
                  ? {
                      ...b,
                      width: ref.style.width as unknown as number,
                      height: ref.style.height as unknown as number,
                      ...position,
                    }
                  : b
              )
            );
          }}
          onClick={() => bringToFront(block.id)}
        >
          <div className={styles.container__block}>
            <div className={styles.container__block_content}>
              <button
                className={styles.container__block_button}
                onClick={() => removeBlock(block.id)}
              />
              <span>Title {block.id}</span>
            </div>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default Dashboard;
