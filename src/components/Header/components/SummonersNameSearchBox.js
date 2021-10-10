/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "../../../../styles/Header/SearchInputBox.module.css";

import favoriteIconOn from "/public/images/icon-favorite-on.png";
import favoriteIconOff from "/public/images/icon-favorite-off.png";
import historyDeleteIcon from "/public/images/icon-history-delete.png";
import informationIcon from "/public/images/icon-history-info@2x.png";

import Image from "next/image";

const setNewSummonnersInStorage = (formattedSummoners) => {
  localStorage.setItem("summonersHistory", JSON.stringify(formattedSummoners));
};

const displayEmptyList = (isRecentSearchSelected) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Image alt="information" src={informationIcon} width={16} height={16} />
      </div>
      {isRecentSearchSelected && (
        <div className={styles.historyNotFoundText}>
          There is no summoner you seen recently.
        </div>
      )}
      {!isRecentSearchSelected && (
        <div className={styles.historyNotFoundText}>
          Add your{" "}
          <Image alt="favorite" src={favoriteIconOff} width={16} height={16} />{" "}
          favorite summoner for easy updates on the latest stats.
        </div>
      )}
    </div>
  );
};

export const SummonersNameSearchBox = (props) => {
  const { confirmSummonerSearch } = props;
  const [summoners, setSummoners] = useState([]);
  const [isRecentSearchSelected, setIsRecentSearchSelected] = useState(true);

  const setSummonersFromStorage = () => {
    const summonersHistory = JSON.parse(
      localStorage.getItem("summonersHistory") || "[]"
    );
    setSummoners(summonersHistory);
  };

  useEffect(() => {
    setSummonersFromStorage();
  }, []);

  const setFavoriteSummoner = (summonerName) => {
    const formattedSummoners = summoners.map((summoner) => {
      if (summoner.name === summonerName)
        summoner.isFavorite = !summoner.isFavorite;
      return summoner;
    });
    setNewSummonnersInStorage(formattedSummoners);
    setSummonersFromStorage();
  };

  const removeSummoner = (summonerName) => {
    let formattedSummoners = summoners;
    if (isRecentSearchSelected) {
      formattedSummoners = formattedSummoners.filter(
        (summoner) => summoner.name !== summonerName
      );
    } else {
      formattedSummoners = formattedSummoners.map((summoner) => {
        if (summoner.name === summonerName) summoner.isFavorite = false;
        return summoner;
      });
    }
    setNewSummonnersInStorage(formattedSummoners);
    setSummonersFromStorage();
  };

  const checkDisplayEmptyList = () => {
    if (
      (isRecentSearchSelected && summoners.length === 0) ||
      (!isRecentSearchSelected &&
        summoners.filter((summoner) => summoner.isFavorite).length === 0)
    ) {
      return displayEmptyList(isRecentSearchSelected);
    }
    return null;
  };

  return (
    <div className={`pb-5 ${styles.searchboxContainer}`}>
      <div
        className="columns is-mobile m-0"
        style={{ minHeight: 40, textAlign: "center" }}
      >
        <div
          className={`column pt-2 ${
            styles[
              isRecentSearchSelected ? "searchboxTabSelected" : "searchboxTab"
            ]
          }`}
          onClick={() => setIsRecentSearchSelected(true)}
        >
          Recent Search
        </div>
        <div
          className={`column pt-2 ${
            styles[
              !isRecentSearchSelected ? "searchboxTabSelected" : "searchboxTab"
            ]
          }`}
          onClick={() => setIsRecentSearchSelected(false)}
        >
          Favorites
        </div>
      </div>
      <div className="m-0 pt-5" style={{ minHeight: 40 }}>
        {checkDisplayEmptyList()}
        {summoners.map((summoner, index) => {
          if (!isRecentSearchSelected && !summoner.isFavorite) return null;
          return (
            <div
              key={summoner.name + index}
              className={`columns is-mobile mx-0 ${styles.searchElementContainer}`}
            >
              <div
                className={`column pl-5 py-2 is-two-thirds ${styles.searchNameContainer}`}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => confirmSummonerSearch(summoner.name)}
                  className={styles.searchNameText}
                >
                  {summoner.name}
                </span>
              </div>
              <div className="column py-2">
                <Image
                  alt="favorite"
                  className={`${styles.searchElementIcon} ${
                    !isRecentSearchSelected ? "is-hidden" : ""
                  }`}
                  src={summoner.isFavorite ? favoriteIconOn : favoriteIconOff}
                  width={16}
                  height={16}
                  onClick={() => setFavoriteSummoner(summoner.name)}
                />{" "}
                <Image
                  alt="delete"
                  className={styles.searchElementIcon}
                  src={historyDeleteIcon}
                  width={16}
                  height={16}
                  onClick={() => removeSummoner(summoner.name)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummonersNameSearchBox;
