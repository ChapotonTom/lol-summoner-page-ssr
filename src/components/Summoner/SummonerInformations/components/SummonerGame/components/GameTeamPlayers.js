import React from "react";
import styles from "../../../../../../../styles/Summoner/Game.module.css";

import { getFileName } from "../../../../../../utils/getFileName";

import Image from "next/image";

export const GameTeamPlayers = (props) => {
  const { team, summonerName } = props;
  return (
    <div className={`pt-2 is-flex-grow-1`} style={{ width: "50%" }}>
      <div style={{ display: "inline-block", width: "90px" }}>
        {team.players.map((player, index) => {
          const championName = getFileName(player.champion.imageUrl);
          return (
            <div
              key={player.summonerName + index}
              className={styles.gameTeamPlayerContainer}
            >
              <div
                className={
                  player.summonerName === summonerName
                    ? styles.gameTeamPlayerChampionPictureRound
                    : styles.gameTeamPlayerChampionPicture
                }
              >
                <Image
                  alt="playerChampionPicture"
                  src={player.champion.imageUrl}
                  className={
                    player.summonerName === summonerName
                      ? styles.gameTeamPlayerChampionPictureRound
                      : styles.gameTeamPlayerChampionPicture
                  }
                  data-tip={championName}
                  layout="fill"
                />
              </div>
              <div
                className={styles.gameTeamPlayerName}
                data-tip={player.summonerName}
                style={{
                  fontWeight:
                    player.summonerName === summonerName ? "bold" : "",
                }}
              >
                {player.summonerName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameTeamPlayers;
