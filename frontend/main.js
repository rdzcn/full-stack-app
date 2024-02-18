import "./styles/index.css";
import { setupCounter } from "./counter.js";
// import "./hyperdrive/index.js";
import "./playground/index";

const fetchArticles = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/summaries");
    console.log(await response.json());
  } catch (error) {
    console.error("ERROR", error);
  }
};

// fetchArticles();

// document.querySelector("#app").innerHTML = `
//   <div>
//     <button id="counter" type="button"></button>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
