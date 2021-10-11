import React, { useState } from "react";
import styles from "../../../../../../../styles/Summoner/GameSummary.module.css";

import { calculateRatio } from "../../../../../../utils/calculateRatio";

import topIcon from "/public/images/icon-mostposition-top.png";
import jungleIcon from "/public/images/icon-mostposition-jng.png";
import midIcon from "/public/images/icon-mostposition-mid.png";
import adcIcon from "/public/images/icon-mostposition-adc.png";
import supIcon from "/public/images/icon-mostposition-sup.png";

import Image from "next/image";

const positionIconKeywords = {
  TOP: topIcon,
  JNG: jungleIcon,
  MID: midIcon,
  ADC: adcIcon,
  SUP: supIcon,
};

export const GamesPositions = (props) => {
  const { gamesPositions } = props;
  const randomHighPercentage = Math.floor(Math.random() * (100 - 60) + 60);
  const secondRandomBestPercentage = (100 - randomHighPercentage) / 2;
  return (
    <div className="column is-one-quarter">
      <div className={`mt-1 ${styles.gamesSummaryPreferedPosition}`}>
        Preferred Position (rank)
      </div>
      {gamesPositions.map((position, index) => {
        return (
          <div
            key={index}
            style={{ display: "inline-block", width: "95%", marginTop: 5 }}
          >
            <div
              key={position.position + index}
              className={styles.gamesSummaryPositionContainer}
            >
              <div style={{ flex: "1 0 20%" }}>
                <Image
                  alt="position-icon"
                  src={positionIconKeywords[position.position]}
                  className={styles.gamesSummaryPositionIcon}
                  width={28}
                  height={28}
                />
              </div>
              <div style={{ marginLeft: 10, flex: "1 0 75%" }}>
                <div className={styles.gamesSummaryPositionName}>
                  {position.positionName}
                </div>
                <div className={styles.gamesSummaryPositionStats}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#1f8ecd",
                    }}
                  >
                    {index === 0
                      ? randomHighPercentage
                      : secondRandomBestPercentage}
                    %
                  </span>
                  <span style={{ color: "#cdd2d2" }}>{" | "}</span>
                  Win Rate
                  <span style={{ fontWeight: "bold" }}>
                    {` ${calculateRatio(position.wins, position.games)}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GamesPositions;
