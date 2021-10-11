/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../../../../../../styles/Summoner/Game.module.css";

import GameChampionAndStuff from "./components/GameChampionAndStuff";
import GameGeneralInfos from "./components/GameGeneralInfos";
import GameKDA from "./components/GameKDA";
import GameMoreStats from "./components/GameMoreStats";
import GameInventory from "./components/GameInventory";
import GameTeamPlayers from "./components/GameTeamPlayers";

import { getRandomInt } from "../../../../../utils/getRandomInt";

import ArrowDown from "/public/images/arrow-down.png";

import Image from "next/image";

const getGameStyle = (isWin, needRenew) => {
  if (needRenew) return "gameRematch";
  else if (isWin) return "gameVictory";
  else return "gameDefeat";
};

const getLastColumnStyle = (isWin, needRenew) => {
  let backgroundColor = "#e89c95";
  let border = "solid #c8817c";
  if (needRenew) {
    backgroundColor = "#a7a7a7";
    border = "solid #999999";
  } else if (isWin) {
    backgroundColor = "#7fb0e1";
    border = "solid #549dc7";
  }
  return { backgroundColor, border };
};

export const SummonerGame = (props) => {
  const { game, itemsDetails, summonerName } = props;

  const [teamsInformations, setTeamsInformations] = useState(game.teams);

  const insertPlayerRandomly = (teams) => {
    const randomTeam = getRandomInt(2);
    const randomPlayer = getRandomInt(4);

    teams[randomTeam].players[randomPlayer].summonerName = summonerName;
    teams[randomTeam].players[randomPlayer].champion = game.champion;
    setTeamsInformations(teams);
  };

  useEffect(() => {
    insertPlayerRandomly(game.teams);
  }, []);

  return (
    <div
      key={game.gameId}
      className={`columns mx-0 mt-0  ${styles.gameDetailsContainer} ${
        styles[getGameStyle(game.isWin, game.needRenew)]
      }`}
    >
      <div className={"column px-1 py-1 is-3"}>
        <div className={"columns mx-0 mt-0 is-mobile"}>
          <GameGeneralInfos
            gameType={game.gameType}
            createDate={game.createDate}
            isWin={game.isWin}
            needRenew={game.needRenew}
            gameLength={game.gameLength}
          />
          <GameChampionAndStuff game={game} />
        </div>
      </div>
      <div className={"column is-flex py-1 px-1 is-3"}>
        <GameKDA stats={game.stats.general} />
        <GameMoreStats
          stats={game.stats.general}
          championLevel={game.champion.level}
        />
      </div>
      <div className={"column py-1 is-2"}>
        <GameInventory
          items={game.items}
          itemsDetails={itemsDetails}
          wards={game.stats.ward}
          isWin={game.isWin}
          needRenew={game.needRenew}
        />
      </div>
      <div className={"column py-0 pl-2 is-flex px-0"}>
        <GameTeamPlayers
          team={teamsInformations[0]}
          summonerName={summonerName}
        />
        <GameTeamPlayers
          team={teamsInformations[1]}
          summonerName={summonerName}
        />
        <div className={"column m-0 p-0 is-2 is-2-mobile"}>
          <div
            className={styles.gameMoreInfo}
            style={{
              ...getLastColumnStyle(game.isWin, game.needRenew),
            }}
            data-tip="(Feature not available)"
          >
            <div
              className={`${
                styles["gameArrow" + getGameStyle(game.isWin, game.needRenew)]
              }`}
            >
              <Image alt="arrow-down" src={ArrowDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerGame;
