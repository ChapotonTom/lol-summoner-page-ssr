import { useEffect, useState } from "react";
import styles from "../../../../../../../styles/Summoner/GameSummary.module.css";

import { Doughnut } from "react-chartjs-2";

import { getRandomInt } from "../../../../../../utils/getRandomInt";
import { getKDAColor } from "../../../../../../utils/getKDAColorCode";

export const generateData = (winRatio, lossRatio) => {
  return {
    datasets: [
      {
        data: [lossRatio, winRatio],
        backgroundColor: ["#ee5a52", "#1f8ecd"],
        borderColor: ["#ee5a52", "#1f8ecd"],
      },
    ],
    options: { cutoutPercentage: 10 },
    borderWidth: 0,
  };
};

export const options = {
  cutout: 25,
};

export const GamesKDA = (props) => {
  const { gamesSummary } = props;
  const { assists, deaths, kills, losses, wins } = gamesSummary;
  const totalGames = wins + losses;

  const winRatio = Math.round((100 * wins) / totalGames);
  const lossRatio = Math.round((100 * losses) / totalGames);
  const [contributionKills, setContributionKills] = useState();

  useEffect(() => {
    setContributionKills(getRandomInt(100));
  }, []);

  const kda = (kills + assists) / deaths;

  return (
    <div
      className="column is-two-fifths"
      style={{ borderRight: "solid #cdd2d2", borderWidth: "thin" }}
    >
      <div className="container colums" style={{ display: "flex" }}>
        <div className="column pt-0 is-half">
          <div style={{ display: "inline-block" }}>
            <div className={styles.gamesSummaryKdaGames}>
              {totalGames}G {wins}W {losses}L
            </div>
            <div className={styles.gamesSummaryWinrateGraphContainer}>
              <Doughnut
                data={generateData(winRatio, lossRatio)}
                options={options}
              />
              <div className={styles.gameSummaryKdaGraphText}>
                {winRatio.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
        <div className="column mt-5 is-half">
          <div className={styles.gamesKdaStats}>
            {kills}
            <span style={{ color: "#948e8d" }}> / </span>
            <span style={{ color: "#d0021b" }}>{assists}</span>
            <span style={{ color: "#948e8d" }}> / </span> {deaths}
          </div>
          <div className={styles.gamesKdaStatsMean}>
            <span style={{ color: getKDAColor(kda) }}>{kda.toFixed(2)}:1 </span>
            <span style={{ color: "#d0021b", fontWeight: "normal" }}>
              ({contributionKills}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesKDA;
