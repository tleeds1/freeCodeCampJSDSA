const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const searchInput = document.getElementById("search-input");
const nameElement = document.getElementById("pokemon-name");
const idElement = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const hpElement = document.getElementById("hp");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const specialAttackElement = document.getElementById("special-attack");
const specialDefenseElement = document.getElementById("special-defense");
const speedElement = document.getElementById("speed");
const searchButton = document.getElementById("search-button");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");

const clear = () => {
  nameElement.textContent = "";
  idElement.textContent = "";
  weightElement.textContent = "";
  heightElement.textContent = "";
  hpElement.textContent = "";
  attackElement.textContent = "";
  defenseElement.textContent = "";
  specialAttackElement.textContent = "";
  specialDefenseElement.textContent = "";
  speedElement.textContent = "";
  types.innerHTML = "";
  spriteContainer.innerHTML = ""
}
const update = () => {
  clear();
  const value = searchInput.value.trim();
  if (value) {
    fetchData(value);
  }
}


const fetchData = async (query) => {
  try {
    const res = await fetch(`${pokemonAPI}${query.toLowerCase()}`);
    if (!res.ok) {
      alert("Pokémon not found");
      return;
    }
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    console.log(err);
  }
};

const displayPokemon = (data) => {
  nameElement.textContent = data.name.toUpperCase();
  idElement.textContent = `#${data.id}`;
  weightElement.textContent = `Weight: ${data.weight}`;
  heightElement.textContent = `Height: ${data.height}`;
  hpElement.textContent = data.stats[0].base_stat;
  attackElement.textContent = data.stats[1].base_stat;
  defenseElement.textContent = data.stats[2].base_stat;
  specialAttackElement.textContent = data.stats[3].base_stat;
  specialDefenseElement.textContent = data.stats[4].base_stat;
  speedElement.textContent = data.stats[5].base_stat;

  const spriteContainer = document.getElementById("sprite-container");
  spriteContainer.innerHTML = `<img class="sprite" id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;
  data.types.forEach(type => {
    types.innerHTML += `
      <button class="btn ${type.type.name}" disabled>${type.type.name}</button>
    `
  });
};


searchButton.addEventListener("click", update);