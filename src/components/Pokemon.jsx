import React, { useEffect, useState } from "react";
import "./style.css";
import PokeMoncard from "./PokeMoncard";

function Pokemon() {
  const [pokemonedata, setpokemondata] = useState([]);
  const [search, setsearch] = useState("");
  const [islogin, setislogin] = useState(true);
  const [barvalue, setbarvalue] = useState(10);

  const API = `https://pokeapi.co/api/v2/pokemon?limit=${barvalue}&offset=0`;
  useEffect(() => {
    const FetchDatafromApi = async () => {
      try {
        const dataformApi = await fetch(API);
        if (!dataformApi.ok) {
          throw new Error("Error has been Occured !");
        }
        const data = await dataformApi.json();

        const detailteddataofApi = data.results.map(async (value) => {
          const detaileddata = await fetch(value.url);
          const res = await detaileddata.json();
          return res;
        });

        const AnotherdatafromAllapi = await Promise.all(detailteddataofApi);
        setpokemondata(AnotherdatafromAllapi);
        setislogin(false);
      } catch (err) {
        console.log(err);
      }
    };
    FetchDatafromApi();
  }, [barvalue]);

  const SearchPokemon = pokemonedata.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleclick = (event) => {
    setislogin(true);
    setpokemondata([]);
    setbarvalue(event);
  };

  return (
    <div className="  h-screen text-center w-screen overflow-x-hidden">
      <div className="m-4">
        <h1 className="text-[30px] font-semibold">Your Fav Pokemon</h1>
      </div>
      <div className="m-4">
        <input
          onChange={(event) => setsearch(event.target.value)}
          className="md:w-[400px] w-[300px] relative right-2 font-semibold border rounded-full
      
Save Changes outline-none border-black py-2 px-5"
          type="text"
        />
        <div className=" flex md:relative md:left-100 relative  p-5 justify-center space-x-3 items-center ">
          <input
            type="range"
            className="cursor-pointer"
            onChange={(e) => handleclick(e.target.value)}
            min="10"
            max="500"
          />
          <label> Pokemon limits : {barvalue}</label>
        </div>
      </div>

      <div>
        {islogin ? (
          <h1 className="text-[30px] text-black font-semibold">Loading....</h1>
        ) : (
          ""
        )}
      </div>
      <PokeMoncard pokemonedata={SearchPokemon} />
    </div>
  );
}

export default Pokemon;
