import * as Summary from "../models/summaries.model.js";

export const getSummaries = async (req, res) => {
  try {
    const data = await Summary.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data }));
  } catch (error) {
    console.error("ERROR", error);
  }
}