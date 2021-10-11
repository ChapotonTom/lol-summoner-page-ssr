import { useState, useContext } from "react";

import GamesKDA from "./components/GamesKDA";
import GamesChampions from "./components/GamesChampions";
import GamesPositions from "./components/GamesPositions";
import GamesSummaryTabs from "./components/GamesSummaryTabs";
import styles from "../../../../../../styles/Summoner/GameSummary.module.css";

import { SummonerContext } from "../../../../../contexts/SummonerContext";

export const SummonerGamesSummary = (props) => {
  const [gameTypeSelected, setGameTypeSelected] = useState("total");
  const { summonerGames } = useContext(SummonerContext);
  return (
    <div>
      <div style={{ minWidth: 300 }}>
        <GamesSummaryTabs
          gameTypeSelected={gameTypeSelected}
          setGameTypeSelected={setGameTypeSelected}
        />
        <div className={`container columns m-0 ${styles.matchesSummaryStats}`}>
          <GamesKDA gamesSummary={summonerGames.summary} />
          {summonerGames.champions.length && (
            <GamesChampions gamesChampions={summonerGames.champions} />
          )}
          {summonerGames.positions.length && (
            <GamesPositions gamesPositions={summonerGames.positions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SummonerGamesSummary;
