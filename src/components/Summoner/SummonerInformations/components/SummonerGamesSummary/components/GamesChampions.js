import React from "react";
import styles from "../../../../../../../styles/Summoner/GameSummary.module.css";

import notFoundChampion from "/public/images/group@2x.png";

import { calculateRatio } from "../../../../../../utils/calculateRatio";
import { getKDAColor } from "../../../../../../utils/getKDAColorCode";

import Image from "next/image";

const calculateKDA = (kills, assists, deaths) => {
  return (kills + assists) / deaths;
};

export const GamesChampions = (props) => {
  const { gamesChampions } = props;
  const missingChampions = 3 - gamesChampions.length;
  return (
    <div
      className="column is-one-third"
      style={{ borderRight: "solid #cdd2d2", borderWidth: "thin" }}
    >
      {gamesChampions.map((champion, index) => {
        const winRatio = calculateRatio(champion.wins, champion.games);
        const championKDA = calculateKDA(
          champion.kills,
          champion.assists,
          champion.deaths
        );
        const championImageUrl = champion.imageUrl.startsWith("//")
          ? `https:${champion.imageUrl}`
          : champion.imageUrl;
        return (
          <div key={index} style={{ display: "inline-block", width: "90%" }}>
            <div className={styles.gamesSummaryChampionContainer}>
              <div style={{ flex: "1 0 20%" }}>
                <Image
                  alt="champion-icon"
                  src={championImageUrl}
                  className={styles.gamesSummaryChampionIcon}
                  width={34}
                  height={34}
                  priority={true}
                />
              </div>
              <div style={{ marginLeft: 10, flex: "1 0 75%" }}>
                <div className={styles.gamesSummaryChampionName}>
                  {champion.name}
                </div>
                <div className={styles.gamesSummaryChampionStats}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: winRatio > 60 ? "#c6443e" : "#333333",
                    }}
                  >
                    {winRatio}%
                  </span>{" "}
                  ({champion.wins}W {champion.losses}L)
                  <span style={{ color: "#cdd2d2" }}>{" | "}</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: getKDAColor(championKDA),
                    }}
                  >
                    {championKDA.toFixed(2)} KDA
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {missingChampions > 0 &&
        [...Array(missingChampions)].map((missingChampion, index) => {
          return (
            <div key={index} style={{ display: "inline-block", width: "90%" }}>
              <div className={styles.gamesSummaryChampionContainer}>
                <div style={{ flex: "1 0 20%" }}>
                  <Image
                    alt="champion-icon"
                    src={notFoundChampion}
                    className={styles.gamesSummaryChampionIcon}
                    width={34}
                    height={34}
                  />
                </div>
                <div style={{ marginLeft: 10, flex: "1 0 75%" }}>
                  <div className={styles.gamesSummaryChampionNameNotFound}>
                    Not found champion
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GamesChampions;
