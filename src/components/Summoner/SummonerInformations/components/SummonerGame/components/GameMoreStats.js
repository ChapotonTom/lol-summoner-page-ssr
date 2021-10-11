import React from "react";
import styles from "../../../../../../../styles/Summoner/Game.module.css";

export const GameMoreStats = (props) => {
  const { stats, championLevel } = props;
  return (
    <div className="is-flex-grow-1" style={{ textAlign: "center" }}>
      <div className={`mt-3 ${styles.gameStatsLevel}`}>
        Level {championLevel}
      </div>
      <div className={`mt-1 ${styles.gameStatsCs}`}>
        {stats.cs} ({stats.csPerMin}) CS
      </div>
      <div className={`mt-1 ${styles.gameStatsKillsContribution}`}>
        P/Kill {stats.contributionForKillRate}
      </div>
    </div>
  );
};

export default GameMoreStats;
