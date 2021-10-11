import React, { useEffect, useState } from "react";
import styles from "../../../../../../../styles/Summoner/Game.module.css";

import iconBuildVictory from "/public/images/icon-build-victory.png";
import iconBuildDefeat from "/public/images/icon-build-defeat.png";
import iconWardVictory from "/public/images/icon-ward-blue@2x.png";
import iconWardDefeat from "/public/images/icon-ward-red@2x.png";

import { getFileName } from "../../../../../../utils/getFileName";

import Image from "next/image";

const insertEmptyItems = (items) => {
  const emptyItem = { imageUrl: false };
  const formattedItems = items;
  formattedItems.splice(2, 0, emptyItem);
  while (formattedItems.length < 7) {
    formattedItems.push(emptyItem);
  }
  return formattedItems;
};

const getEmptyItemClass = (isWin, needRenew) => {
  if (needRenew) return "gameEmptyItemBlack";
  else if (isWin) return "gameEmptyItemBlue";
  else return "gameEmptyItemRed";
};

const displayItems = (
  items,
  itemsDetails,
  displayBuildIcon,
  needRenew,
  isWin
) => {
  return (
    <div className={styles.gameInventoryItemsLineContainer}>
      {items.map((item, index) => {
        if (item.imageUrl) {
          return (
            <div
              key={item.imageUrl + index}
              className={styles.gameInventoryItemPicture}
            >
              <Image
                alt="item"
                data-tip={itemsDetails[getFileName(item.imageUrl)].plaintext}
                src={item.imageUrl}
                layout="fill"
              />
            </div>
          );
        } else {
          return (
            <div
              key={"empty" + index}
              className={`${styles.gameInventoryEmptyItemPicture} ${
                styles[getEmptyItemClass(isWin, needRenew)]
              }`}
            ></div>
          );
        }
      })}
      {displayBuildIcon && !needRenew && (
        <div className={styles.gameInventoryWardPicture}>
          <Image
            alt="item"
            src={isWin ? iconBuildVictory : iconBuildDefeat}
            layout="fill"
          />
        </div>
      )}
    </div>
  );
};

export const GameInventory = (props) => {
  const { items, itemsDetails, wards, isWin, needRenew } = props;

  const [formattedItems, setFormattedItems] = useState([]);
  const totalWards = wards.sightWardsBought + wards.visionWardsBought;

  useEffect(() => {
    setFormattedItems(insertEmptyItems(items));
  }, [items]);

  return (
    <div
      className="py-1 mx-0 px-0"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="mt-2" style={{ display: "inline-block" }}>
        <div>
          {displayItems(
            formattedItems.slice(0, 4),
            itemsDetails,
            false,
            needRenew,
            isWin
          )}
          {displayItems(
            formattedItems.slice(4, 7),
            itemsDetails,
            true,
            needRenew,
            isWin
          )}
        </div>
        {totalWards > 0 && !needRenew && (
          <div className={`mt-2 ${styles.gameInventoryWard}`}>
            <Image
              alt="ward"
              src={isWin ? iconWardVictory : iconWardDefeat}
              width={16}
              height={16}
            />
            <div className={styles.gameInventoryWardStr}>
              Control Ward {totalWards}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInventory;
