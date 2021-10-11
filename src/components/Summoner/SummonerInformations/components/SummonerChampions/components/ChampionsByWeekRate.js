import React from "react";
import styles from "../../../../../../../styles/Summoner/Champion.module.css";

import ReactTooltip from "react-tooltip";

import { calculateRatio } from "../../../../../../utils/calculateRatio";

import Image from "next/image";

export const SummonerChampionsByWeekRate = (props) => {
  const { champion, isLastElement } = props;

  const championWinRate = calculateRatio(
    champion.wins,
    champion.wins + champion.losses
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
      <div className="column pt-4 pl-0 pr-1 is-2">
        <div className={styles.championTopDetail} data-tip={champion.name}>
          {champion.name}
        </div>
      </div>
      <div className="column pt-4 pl-0 pr-0 is-one-fifth">
        <div className={styles.championTopDetail} style={{ color: "#879292" }}>
          {championWinRate}%
        </div>
      </div>
      <div className="column px-1">
        <div className={styles.championRatioBar}>
          <div
            className={styles.championWinRateBar}
            style={{
              width: `${championWinRate}%`,
              backgroundColor: `${champion.wins > 0 ? "#1f8ecd" : "#ee5a52"}`,
            }}
          >
            <div>{champion.wins}W</div>{" "}
          </div>
          <div
            className={styles.championLooseRateBar}
            style={{
              width: `${100 - championWinRate}%`,
              backgroundColor: `${champion.losses > 0 ? "#ee5a52" : "#1f8ecd"}`,
            }}
          >
            <div>{champion.losses}L</div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerChampionsByWeekRate;
