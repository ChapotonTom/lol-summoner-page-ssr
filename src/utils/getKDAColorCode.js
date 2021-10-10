export const getKDAColor = (kda) => {
  const roundKDA = Math.floor(kda);
  if (roundKDA >= 5) return "#e19205";
  else if (roundKDA >= 4) return "#1f8ecd";
  else if (roundKDA >= 3) return "#2daf7f";
  else return "#000000";
};
