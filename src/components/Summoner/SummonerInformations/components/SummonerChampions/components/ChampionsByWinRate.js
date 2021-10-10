import React from "react";
import styles from "../../../../../../../styles/Summoner/Champion.module.css";

import ReactTooltip from "react-tooltip";

import Image from "next/image";

const getChampionKDA = (kills, assists, deaths) => {
  return ((kills + assists) / deaths).toFixed(2);
};

const getKDAStyle = (kda) => {
  if (kda >= 5) return "kdaOrange";
  else if (kda >= 4) return "kdaBlue";
  else if (kda >= 3) return "kdaGreen";
  else return "kdaNormal";
};

export const ChampionsByWinRate = (props) => {
  const { champion, isLastElement } = props;

  const championKDA = getChampionKDA(
    champion.kills,
    champion.assists,
    champion.deaths
  );

  return (
    <div
      className={`columns mx-0 is-mobile py-1 ${styles.championRow} ${
        styles[isLastElement ? "lastChampionRow" : ""]
      }`}
    >
      <ReactTooltip />
      <div className="column py-0 is-one-quarter">
        <Image
          alt={champion.name}
          src={champion.imageUrl}
          width={45}
          height={45}
          className={styles.championImage}
          data-tip={champion.name}
        />
      </div>
      <div
        className={`column pl-0 pr-1 is-one-quarter ${styles.championRateContainer}`}
      >
        <div className={styles.championTopDetail} data-tip={champion.name}>
          {champion.name}
        </div>
        <div className={styles.championBottomDetail}>
          CS {champion.cs} (2.4)
        </div>
        <div></div>
      </div>
      <div className="column pl-0 ml-2 pr-1 is-3">
        <div
          className={`${styles.championTopDetail} ${
            styles[getKDAStyle(championKDA)]
          }`}
        >
          {championKDA}:1 KDA
        </div>
        <div className={styles.championBottomDetail}>
          {champion.kills} / {champion.assists} / {champion.deaths}
        </div>
      </div>
      <div className="column pl-0 pr-1 is-one-fifth">
        <div
          className={`${styles.championTopDetail} ${
            champion.winRate >= 60 ? "winRateRed" : ""
          }`}
        >
          {champion.winRate}%
        </div>
        <div className={styles.championBottomDetail}>
          {champion.games} Played
        </div>
      </div>
    </div>
  );
};

export default ChampionsByWinRate;
