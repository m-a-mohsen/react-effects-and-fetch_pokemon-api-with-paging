import { useEffect, useState } from "react";

export default function PokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon?offset=0";
  const [pokemon, setPokemon] = useState();
  const [pageUrl, setpageUrl] = useState(url);

  useEffect(() => {
    async function loadPokemon(pageUrl) {
      try {
        const response = await fetch(pageUrl);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadPokemon(pageUrl);
  }, [pageUrl]);

  function handelNextButton() {
    setpageUrl(pokemon.next);
  }
  function handelPreviousButton() {
    setpageUrl(pokemon.previous);
  }

  return (
    <main>
      <button type="button" onClick={handelPreviousButton}>
        Previous Page
      </button>
      <button type="button" onClick={handelNextButton}>
        Next Page
      </button>
      <ul>
        {(pokemon?.results ?? []).map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
