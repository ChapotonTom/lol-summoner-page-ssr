import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/Header/Header.module.css";

import OPGGLOGO from "/public/images/op-gg-logo.svg";

import SummonersNameSearchBox from "./components/SummonersNameSearchBox";
import SummonerNameInputBox from "./components/SummonerNameInputBox";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Header(props) {
  const [summonerName, setSummonerName] = useState("");
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const router = useRouter();

  const wrapperRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
  }, []);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSearchInputFocused(false);
    }
  };

  const handleSummonerNameInput = (name) => {
    setSummonerName(name);
  };

  const confirmSummonerSearch = (name) => {
    router.push("/summoner/" + name);
    setSummonerName("");
    setSearchInputFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSummonerName("");
      confirmSummonerSearch(summonerName);
      e.target.blur();
    }
  };

  return (
    <div className={`section ${styles.section}`}>
      <div
        className={`container is-max-widescreen px-3`}
        style={{ width: "75%" }}
      >
        <div className="level-right" ref={wrapperRef}>
          <div className="level-item">
            <div className="field has-addons">
              <div className="control has-icons-right" style={{ width: 260 }}>
                <input
                  className="input"
                  onFocus={() => setSearchInputFocused(true)}
                  type="text"
                  value={summonerName}
                  placeholder="Name1, Name2..."
                  onChange={(ev) => handleSummonerNameInput(ev.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className="icon is-right"
                  style={{ pointerEvents: "initial", cursor: "pointer" }}
                  onClick={() => confirmSummonerSearch(summonerName)}
                >
                  <Image
                    alt="opgglogo"
                    src={OPGGLOGO}
                    className={styles.logoOPGG}
                    width={30}
                  />
                </div>
              </div>
            </div>
            {searchInputFocused && summonerName === "" && (
              <SummonersNameSearchBox
                confirmSummonerSearch={confirmSummonerSearch}
              />
            )}
            {searchInputFocused && summonerName !== "" && (
              <SummonerNameInputBox
                summonerName={summonerName}
                confirmSummonerSearch={confirmSummonerSearch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
