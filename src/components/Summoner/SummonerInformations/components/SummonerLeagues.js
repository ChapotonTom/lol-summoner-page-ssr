import React from "react";
import styles from "../../../../../styles/Summoner/League.module.css";

import { calculateRatio } from "../../../../utils/calculateRatio";

import unrankedPicture from "/public/images/unranked.png";

import Image from "next/image";

const SummonerLeagueUnrankedContainer = (league) => {
  return (
    <div className={`columns py-2 mx-0 mb-5 ${styles.leagueContainer}`}>
      <div className="column p-0 is-one-third">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            alt="summoner-league-pic"
            src={unrankedPicture}
            width={64}
            height={64}
          />
        </div>
      </div>
      <div className="column" style={{ textAlign: "left" }}>
        <div className={styles.leagueName}>{league.tierRank.name}</div>
        <div className={styles.leagueDivisionUnranked}>Unranked</div>
      </div>
    </div>
  );
};

export const SummonerLeagues = (props) => {
  const { summoner } = props;

  return (
    <div>
      {summoner.leagues.map((league, index) => {
        const totalGames = league.wins + league.losses;

        if (!league.hasResults) {
          return SummonerLeagueUnrankedContainer(league);
        }
        return (
          <div
            key={league.tierRank.name + index}
            className={`columns is-mobile pt-2 mx-0 mb-5 ${styles.leagueContainer}`}
          >
            <div className="column p-0 is-one-third">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  alt="summoner-league-pic"
                  src={league.tierRank.imageUrl}
                  width={104}
                  height={104}
                  priority={true}
                />
              </div>
            </div>
            <div className={`column py-0 px-1 ${styles.leagueTextContainer}`}>
              <div className={styles.leagueName}>{league.tierRank.name}</div>
              <div className={styles.leagueTop}>
                <span style={{ fontWeight: "bold" }}>top</span> (total{" "}
                {totalGames} Played)
              </div>
              <div className={styles.leagueDivision}>
                {league.tierRank.tier}
              </div>
              <div className={styles.leagueStats}>
                <span style={{ fontWeight: "bold", color: "#555e5e" }}>
                  {league.tierRank.lp} LP{" "}
                </span>
                / {league.wins}W {league.losses}L
              </div>
              <div className={styles.leagueRatio}>
                Win Ratio {calculateRatio(league.wins, totalGames)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummonerLeagues;
