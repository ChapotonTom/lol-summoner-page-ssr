import React, { useEffect, useState, useContext } from "react";
import styles from "../../../../../../styles/Summoner/Champion.module.css";

import ChampionsByWinRate from "./components/ChampionsByWinRate";
import ChampionsByWeekRate from "./components/ChampionsByWeekRate";

import { SummonerContext } from "../../../../../contexts/SummonerContext";
import { calculateRatio } from "../../../../../utils/calculateRatio";

export const SummonerChampions = (props) => {
  const { summonerMoreInfo } = useContext(SummonerContext);

  const [sortByWinRate, setSortByWinRate] = useState(true);
  const [champions, setChampions] = useState([]);
  const [recentWinRate, setRecentWinRate] = useState([]);

  const processChampions = (champions, setter) => {
    let formattedChampions = champions.map((champion) => {
      champion.winRate = calculateRatio(
        champion.wins,
        champion.games || champion.wins + champion.losses
      );
      if (champion.imageUrl.startsWith("//"))
        champion.imageUrl = "https:" + champion.imageUrl;
      return champion;
    });
    formattedChampions = formattedChampions.sort(
      (a, b) => b.winRate - a.winRate
    );
    setter(formattedChampions);
  };

  useEffect(() => {
    processChampions(summonerMoreInfo.champions, setChampions);
    processChampions(summonerMoreInfo.recentWinRate, setRecentWinRate);
  }, [summonerMoreInfo.champions, summonerMoreInfo.recentWinRate]);

  return (
    <div className={styles.championsContainer}>
      <div className="columns is-mobile mx-0">
        <div
          className={`column champion-tab-right ${
            styles[sortByWinRate ? "championsTabSelected" : "championsTab"]
          }`}
          onClick={() => setSortByWinRate(true)}
        >
          Champion Win Ratio
        </div>
        <div
          className={`column px-1 champion-tab-right ${
            styles[!sortByWinRate ? "championsTabSelected" : "championsTab"]
          }`}
          onClick={() => setSortByWinRate(false)}
        >
          Rank win rate per week
        </div>
      </div>
      {sortByWinRate &&
        champions.map((champion, index) => {
          return (
            <ChampionsByWinRate
              key={champion.name + index}
              champion={champion}
              isLastElement={index === champions.length - 1}
            />
          );
        })}
      {!sortByWinRate &&
        recentWinRate.map((champion, index) => {
          return (
            <ChampionsByWeekRate
              key={champion.name + index}
              champion={champion}
              isLastElement={index === champions.length - 1}
            />
          );
        })}
    </div>
  );
};

export default SummonerChampions;
