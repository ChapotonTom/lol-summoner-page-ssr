import React from "react";
import styles from "../../../../../../../styles/Summoner/Game.module.css";

export const GameKDA = (props) => {
  const { stats } = props;
  const addPaddingTop = !stats.largestMultiKillString && !stats.opScoreBadge;
  return (
    <div className="is-flex-grow-1" style={{ textAlign: "center" }}>
      <div
        className={`mt-${addPaddingTop ? "4" : "2"} ${
          styles.gameKillsAssistsDeaths
        }`}
      >
        {stats.kill}
        <span style={{ color: "#948e8d" }}> / </span>
        <span style={{ color: "#d0021b" }}>{stats.assist}</span>
        <span style={{ color: "#948e8d" }}> / </span> {stats.death}
      </div>
      <div className={`mt-1 ${styles.gameKdaStr}`}>
        <span style={{ fontWeight: "bold" }}>{stats.kdaString}</span>
        <span style={{ fontWeight: "bold", fontFamily: "AppleSDGothicNeo" }}>
          {" KDA"}
        </span>
      </div>
      <div className={`mt-1 ${styles.gameKillingBadge}`}>
        <div style={{ margin: "auto", display: "flex" }}>
          {stats.largestMultiKillString && (
            <div className={styles.gameMultiKillings}>
              {stats.largestMultiKillString}
            </div>
          )}
          {stats.opScoreBadge && (
            <div className={styles.gameScoreBadge}>{stats.opScoreBadge}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameKDA;
