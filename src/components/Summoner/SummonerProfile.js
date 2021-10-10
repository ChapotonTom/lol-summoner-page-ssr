import styles from "../../../styles/Summoner/Profile.module.css";

import levelBox from "/public/images/bg-levelbox.png";

import Image from "next/image";

export const SummonerProfile = (props) => {
  const { summoner } = props;

  return (
    <div className={`section py-4 ${styles.profileContainer}`}>
      <div className="container is-max-widescreen">
        <div className={`container ${styles.previousTiersContainer}`}>
          {summoner.previousTiers.map((tier) => {
            return (
              <div key={tier.season} className={styles.previousTiersElement}>
                <span style={{ fontWeight: "bold" }}>S{tier.season}</span>{" "}
                {tier.tier}
              </div>
            );
          })}
        </div>
        <div className="container columns is-mobile pt-5">
          <div className="column is-2" style={{ width: 145, marginLeft: 30 }}>
            <div className={styles.profilePictureContainer}>
              <Image
                alt="profilePictureHidden"
                src={summoner.profileImageUrl}
                width={100}
                height={100}
                className="is-hidden"
              />
              <div className={styles.profilePicture}>
                <Image
                  alt="profilePicture"
                  src={summoner.profileImageUrl}
                  blurDataURL={summoner.profileImageUrl}
                  width={100}
                  height={100}
                  priority={true}
                  placeholder={"blur"}
                />
              </div>
              <div className={styles.profilePictureBorder}>
                <Image
                  alt="profilePictureBorder"
                  src={summoner.profileBorderImageUrl}
                  width={120}
                  height={120}
                />
              </div>
              <div>
                <div className={styles.imgLevelbox}>
                  <Image
                    alt="profileLevel"
                    src={levelBox}
                    width={44}
                    height={24}
                  />
                </div>
                <div
                  className={styles.profileLevel}
                  style={{ left: summoner.level > 100 ? 38 : 42 }}
                >
                  {summoner.level}
                </div>
              </div>
            </div>
          </div>
          <div className={`column pl-0 ${styles.profileDescription}`}>
            <div className={styles.profileName}>{summoner.name}</div>
            <div className={styles.profileLadder}>
              Ladder Rank
              <span style={{ fontWeight: "bold" }}>
                {` ${summoner.ladderRank.rank.toLocaleString()} `}
              </span>
              ( {summoner.ladderRank.rankPercentOfTop}% of top )
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerProfile;
