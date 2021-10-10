/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "../../../../styles/Header/SearchInputBox.module.css";

import Image from "next/image";

export const SummonerNameInputBox = (props) => {
  const { summonerName, confirmSummonerSearch } = props;
  const [summoners, setSummoners] = useState([]);
  const [summonersFiltered, setSummonersFiltered] = useState([]);

  useEffect(() => {
    const summonersHistory = JSON.parse(
      localStorage.getItem("summonersHistory") || "[]"
    );
    setSummoners(summonersHistory);
    setSummonersFiltered(summonersHistory);
  }, []);

  useEffect(() => {
    let allSummoners = summoners;
    if (allSummoners.length === 0) {
      allSummoners = JSON.parse(
        localStorage.getItem("summonersHistory") || "[]"
      );
    }
    const summonersMatching = allSummoners.filter((summoner) =>
      summoner.name.startsWith(summonerName)
    );
    setSummonersFiltered(summonersMatching);
  }, [summonerName]);

  if (!summonersFiltered.length) return null;
  return (
    <div className={`pb-5 ${styles.inputboxContainer}`}>
      <div className="m-0 pt-5" style={{ minHeight: 40, textAlign: "center" }}>
        {summonersFiltered.map((summoner, index) => {
          const unmatchingString = summoner.name.replace(summonerName, "");
          const matchingString = summoner.name.replace(unmatchingString, "");
          return (
            <div
              key={summoner.name + index}
              className={`columns is-mobile mx-0 ${styles.searchInputElementContainer}`}
              onClick={() => confirmSummonerSearch(summoner.name)}
            >
              <div className="column pl-5 py-2 is-one-third">
                <Image
                  alt="summoner-icon"
                  className={styles.searchInputElementIcon}
                  src={summoner.imageUrl}
                  width={36}
                  height={36}
                />
              </div>
              <div className={`column py-2 pl-0 ${styles.searchInputSummoner}`}>
                <div className={styles.searchInputSummonerName}>
                  <span style={{ color: "#c6443e" }}>{matchingString}</span>
                  <span>{unmatchingString}</span>
                </div>
                <div>{summoner.previousTier}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummonerNameInputBox;
