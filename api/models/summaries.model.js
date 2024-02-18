import Summaries from "../../data/summaries.json" assert { type: "json" };

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(Summaries);
  });
};
