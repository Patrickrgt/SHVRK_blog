import React from "react";
import "./App.css";
import FashionCategoryJSX from "./components/fashionCategory.jsx"
import BodyPost from './components/bodyPost'

function App() {
  return (
   <React.Fragment>
     {/* <button onClick={FashionCategory}>
      test
     </button> */}
     <FashionCategoryJSX>

     </FashionCategoryJSX>
     <BodyPost/>
   </React.Fragment>
  );
}

export default App;
