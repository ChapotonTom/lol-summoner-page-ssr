import React from "react";
import styles from "../../../../../../../styles/Summoner/GameSummary.module.css";

export const GamesSummaryTabs = (props) => {
  const { gameTypeSelected, setGameTypeSelected } = props;
  return (
    <div className={`columns is-mobile m-0 ${styles.matchesSummaryTab}`}>
      <div className="column py-0 is-1-desktop is-one-fifth-mobile">
        <div
          className={`${
            styles[
              gameTypeSelected === "total"
                ? "matchesSummaryTabTextSelected"
                : "matchesSummaryTabText"
            ]
          }`}
          onClick={() => setGameTypeSelected("total")}
        >
          Total
        </div>
      </div>
      <div className="column py-0 is-2-desktop is-one-quarter-mobile">
        <div
          className={`${
            styles[
              gameTypeSelected === "solo"
                ? "matchesSummaryTabTextSelected"
                : "matchesSummaryTabText"
            ]
          }`}
          onClick={() => setGameTypeSelected("solo")}
        >
          Ranked Solo
        </div>
      </div>
      <div className="column py-0 is-2-desktop is-one-quarter-mobile">
        <div
          className={`${
            styles[
              gameTypeSelected === "flex"
                ? "matchesSummaryTabTextSelected"
                : "matchesSummaryTabText"
            ]
          }`}
          onClick={() => setGameTypeSelected("flex")}
        >
          Ranked Flex
        </div>
      </div>
    </div>
  );
};

export default GamesSummaryTabs;
