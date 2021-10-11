import React from "react";
import styles from "../../../../../../../styles/Summoner/Game.module.css";

import { getFileName } from "../../../../../../utils/getFileName";

import Image from "next/image";

export const GameChampionAndStuff = (props) => {
  const { game } = props;

  const championName = getFileName(game.champion.imageUrl);

  return (
    <div className="column px-0 pt-1 is-flex-grow-1">
      <div className="columns pt-2 ml-1 mb-0">
        <div
          className="column px-0 pb-0 is-half"
          style={{ minWidth: 60, textAlign: "center" }}
        >
          <Image
            alt="champion"
            src={game.champion.imageUrl}
            className={styles.gameChampionPicture}
            width={46}
            height={46}
          />
        </div>
        <div
          className="column is-marginless is-half pl-0 pb-0"
          style={{ minWidth: 60, textAlign: "center" }}
        >
          <Image
            alt="spell-1"
            className={styles.gameSpellPeakIcon}
            src={game.spells[0].imageUrl}
            width={22}
            height={22}
          />
          <Image
            alt="peak-1"
            className={styles.gameSpellPeakIcon}
            src={game.peak[0]}
            width={22}
            height={22}
          />
          <Image
            alt="spell-2"
            className={styles.gameSpellPeakIcon}
            src={game.spells[1].imageUrl}
            width={22}
            height={22}
          />
          <Image
            alt="peak-2"
            className={styles.gameSpellPeakIcon}
            src={game.peak[1]}
            width={22}
            height={22}
          />
        </div>
      </div>
      <div className={styles.gameChampionName}>{championName}</div>
    </div>
  );
};

export default GameChampionAndStuff;
