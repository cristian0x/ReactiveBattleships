import axios from "axios";
import useAxiosGet from "../hooks/useAxiosGet";

export const getLeaderboard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isPending, error } = useAxiosGet(
    "http://localhost:8080/user/leaderboard"
  );
  return data.sort(compare);
};

const compare = (a, b) => {
  if (a.gamesWon > b.gamesWon) {
    return -1;
  }
  if (a.gamesWon < b.gamesWon) {
    return 1;
  }
  return 0;
};
