import React, { useContext } from "react";
import SummonerLeagues from "./components/SummonerLeagues";
import SummonerChampions from "./components/SummonerChampions/SummonerChampions";
import SummonerGamesSummary from "./components/SummonerGamesSummary/SummonerGamesSummary";
import SummonerGame from "./components/SummonerGame/SummonerGame";

import { SummonerContext } from "../../../contexts/SummonerContext";

export const SummonerInformations = (props) => {
  const { summoner } = props;
  const { summonerGamesList, itemsDetails } = useContext(SummonerContext);

  return (
    <div className="section pt-3">
      <div className="container is-max-widescreen p-3">
        <div className="columns">
          <div className="column mb-3 is-one-third">
            <SummonerLeagues summoner={summoner} />
            <SummonerChampions summoner={summoner} />
          </div>
          <div className="column">
            <SummonerGamesSummary />
            <div className="container mt-3" style={{ minWidth: 300 }}>
              {summonerGamesList.map((game) => {
                return (
                  <SummonerGame
                    key={game.gameId}
                    game={game}
                    itemsDetails={itemsDetails}
                    summonerName={summoner.name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerInformations;
