import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
function App() {
  const [ingredients, setIngredients] = useState([]);
  return (
    <div>
      <Header />
      <Card ingredients={ingredients} setIngredients={setIngredients} />
    </div>
  );
}
export default App;
