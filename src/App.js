import React from "react";
import "./App.css";
import FashionCategoryJSX from "./components/fashionCategory.jsx";
import PublishedAt from "./components/publishedAt";

function App() {
  return (
    <React.Fragment>
      {/* <button onClick={FashionCategory}>
      test
     </button> */}
      <FashionCategoryJSX></FashionCategoryJSX>

      <PublishedAt />
    </React.Fragment>
  );
}

export default App;
