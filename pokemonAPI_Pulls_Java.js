let currentPage = 1; // Initial page
const cardsPerPage = 50; // Number of cards per page

// Fetch Pokémon data from PokeAPI using the function below
async function fetchPokemonData(offset, limit) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const pokemonList = data.results;
    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

// Fetch detailed information about a Pokémon
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
}

// Display Pokémon cards on the page
async function displayPokemonCards() {
  const offset = (currentPage - 1) * cardsPerPage;
  const limit = cardsPerPage;
  const pokemonList = await fetchPokemonData(offset, limit);
  const pokemonListContainer = document.getElementById('pokemonList');

  for (const pokemon of pokemonList) {
    const pokemonDetails = await fetchPokemonDetails(pokemon.url);

    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.dataset.name = pokemon.name; // Set the data-name attribute

    //create the request to pull attributes 
    const types = document.createElement('p');
    const typesList = pokemonDetails.types.map(type => type.type.name).join(', ');
    types.textContent = `Type/s: ${typesList}`;

    const hr1 = document.createElement('hr');

    const image = document.createElement('img');
    image.src = pokemonDetails.sprites.front_default;
    image.alt = pokemon.name;

    const number = document.createElement('p');
    number.textContent = `Pokemon Index Number : ${pokemonDetails.id}`;

    const hr2 = document.createElement('hr');

    const name = document.createElement('h3');
    name.textContent = pokemon.name;

    const hr3 = document.createElement('hr');
    const space = document.createElement('br');

    const abilities = document.createElement('p');
    const abilitiesList = pokemonDetails.abilities.map(ability => ability.ability.name).join(', ');
    abilities.textContent = `Abilities: ${abilitiesList}`;



    card.appendChild(name);
    card.appendChild(hr1);
    card.appendChild(number);
    card.appendChild(types);
    card.appendChild(hr2);
    card.appendChild(image);
    card.appendChild(hr3);
    card.appendChild(abilities);

    pokemonListContainer.appendChild(card);
  }
}

// Function to load more Pokémon when "See More" button is clicked
function loadMorePokemon() {
  currentPage++;
  displayPokemonCards();
}

// Call the function to display Pokémon cards on the initial load
displayPokemonCards();

// Function to search and filter Pokémon cards
function searchPokemon() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const pokemonCards = document.querySelectorAll(".pokemon-card");

  pokemonCards.forEach(card => {
    const cardName = card.dataset.name.toLowerCase();

    if (cardName.includes(searchValue)) {
      card.style.display = "flex"; // Display the card
    } else {
      card.style.display = "none"; // Hide the card
    }
  });
}
