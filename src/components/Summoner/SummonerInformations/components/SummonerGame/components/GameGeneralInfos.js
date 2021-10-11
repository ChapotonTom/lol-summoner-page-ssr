import React from "react";
import styles from "../../../../../../../styles/Summoner/Game.module.css";

import moment from "moment";

const getGameResultStr = (isWin, needRenew) => {
  if (needRenew) return "Remake";
  else if (isWin) return "Victory";
  else return "Defeat";
};

const getGameResultColor = (isWin, needRenew) => {
  if (needRenew) return "#000000";
  else if (isWin) return "#2c709b";
  else return "#d0021b";
};

const getSeparatorColor = (isWin, needRenew) => {
  if (needRenew) return "Remake";
  else if (isWin) return "#94b9d6";
  else return "#d0a6a5";
};

const getGameDateStr = (howManyDaysAgo, gameDate) => {
  if (howManyDaysAgo > 0) return `${howManyDaysAgo} days ago`;
  const howManyHoursAgo = moment().diff(gameDate, "hours");
  if (howManyHoursAgo > 0) return `${howManyHoursAgo}h days ago`;
  const howManyMinutesAgo = moment().diff(gameDate, "minutes");
  return `${howManyMinutesAgo}m ago`;
};

export const GameGeneralInfos = (props) => {
  const { gameType, createDate, isWin, needRenew, gameLength } = props;

  const nowDate = moment();
  const gameDate = moment.unix(createDate);
  const howManyDaysAgo = nowDate.diff(gameDate, "days");

  return (
    <div className="column p-0 pt-1 is-flex-grow-1">
      <div className={styles.gameGeneralInfosContainer}>
        <div className={styles.gameGeneralInfosGameType}>{gameType}</div>
        <div className={styles.gameGeneralInfosGameCreation}>
          {getGameDateStr(howManyDaysAgo, gameDate)}
        </div>
        <div>
          <div
            className={styles.gameGeneralInfosSeparator}
            style={{
              borderBottom: `solid ${getSeparatorColor(isWin, needRenew)}`,
              borderBottomWidth: "thin",
            }}
          />
        </div>
        <div
          className={styles.gameGeneralInfosGameResult}
          style={{ color: getGameResultColor(isWin, needRenew) }}
        >
          {getGameResultStr(isWin, needRenew)}
        </div>
        <div className={styles.gameGeneralInfosGameLength}>
          {Math.round(gameLength / 60)}m {gameLength % 60}s
        </div>
      </div>
    </div>
  );
};

export default GameGeneralInfos;
