import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

import Header from "../../src/components/Header/Header";
import SummonerProfile from "../../src/components/Summoner/SummonerProfile";
import SummonerInformations from "../../src/components/Summoner/SummonerInformations/SummonerInformations";

import { SummonerContext } from "../../src/contexts/SummonerContext";

import { config } from "../../config";
import "bulma/css/bulma.min.css";

const insertSummonerInHistory = (summoner) => {
  const summonersHistory = JSON.parse(
    localStorage.getItem("summonersHistory") || "[]"
  );
  const isExisting = summonersHistory.findIndex(
    (summonerHistory) => summonerHistory.name === summoner.name
  );
  let insertChampion = {
    name: summoner.name,
    imageUrl: summoner.profileImageUrl,
    previousTier: `${summoner.previousTiers[0].tier} - ${summoner.previousTiers[0].lp}LP`,
    isFavorite: false,
  };
  if (isExisting >= 0) {
    insertChampion.isFavorite = summonersHistory[isExisting].isFavorite;
    summonersHistory.splice(isExisting, 1);
  }
  summonersHistory.unshift(insertChampion);
  if (summonersHistory.length > 8) {
    summonersHistory.splice(8, 1);
  }
  localStorage.setItem("summonersHistory", JSON.stringify(summonersHistory));
};

export const Summoner = (props) => {
  const {
    summoner,
    summonerMoreInfo,
    summonerGames,
    itemsDetails,
    summonerGamesList,
  } = props;

  useEffect(() => {
    insertSummonerInHistory(summoner);
  }, [summoner]);
  return (
    <div>
      <SummonerContext.Provider
        value={{
          summonerMoreInfo,
          summonerGames,
          itemsDetails,
          summonerGamesList,
        }}
      >
        <Header />
        <SummonerProfile summoner={summoner} />
        <SummonerInformations summoner={summoner} />
      </SummonerContext.Provider>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const baseUri = config.baseUri;
  const summonerName = params.name;

  const [
    summonerResponse,
    summonerMoreInfosResponse,
    summonnerGamesReponse,
    itemsDetailsResponse,
  ] = await Promise.all([
    fetch(`${baseUri}/summoner/${summonerName}?hl=en`),
    fetch(`${baseUri}/summoner/${summonerName}/mostInfo?hl=en`),
    fetch(`${baseUri}/summoner/${summonerName}/matches?hl=en`),
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/10.19.1/data/en_US/item.json`
    ),
  ]);

  const summonerData = await summonerResponse.json();
  const summonerMoreInfoData = await summonerMoreInfosResponse.json();
  const summonerGamesData = await summonnerGamesReponse.json();
  const itemsDetailsData = await itemsDetailsResponse.json();

  const gamesFormatted = await Promise.all(
    summonerGamesData.games.map(async (game) => {
      const gameTeamsDetailsResponse = await fetch(
        `${baseUri}/summoner/${summonerName}/matchDetail/${game.gameId}?hl=en`
      );
      game.teams = (await gameTeamsDetailsResponse.json())["teams"];
      return game;
    })
  );

  return {
    props: {
      summoner: summonerData.summoner,
      summonerMoreInfo: summonerMoreInfoData,
      summonerGames: summonerGamesData,
      itemsDetails: itemsDetailsData.data,
      summonerGamesList: gamesFormatted,
    },
  };
}

export default Summoner;
