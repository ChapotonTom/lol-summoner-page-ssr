import React from "react";
import SummonerLeagues from "./components/SummonerLeagues";
import SummonerChampions from "./components/SummonerChampions/SummonerChampions";
import SummonerGamesSummary from "./components/SummonerGamesSummary/SummonerGamesSummary";
// import SummonerGames from "./components/SummonerGames/SummonerGames";

export const SummonerInformations = (props) => {
  const { summoner } = props;

  if (summoner) {
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
              {/* <SummonerGames summoner={summoner} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default SummonerInformations;
