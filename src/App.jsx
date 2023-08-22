import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menuitems from "./components/Menuitems";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliverooapi--wspsyg9lcnvt.code.run/"
      );

      setData(response.data);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <header>
        <Header />
        {isLoading ? "Chargement" : <Hero data={data} />}
      </header>
      <main>
        <div className="contentCenter">
          {isLoading ? (
            "Chargement"
          ) : (
            <Menuitems categories={data.categories} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
