const listOfPokemon = document.getElementById("listOfPokemon");
console.log(listOfPokemon);


let arrayOfPokemons = [];

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 300; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((response) => response.json()));
    }

    Promise.all(promises)
        .then(results => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(", ")
            }));
            pokemon.map(pmn => arrayOfPokemons.push(pmn));
            dispayPokemon(pokemon);
        });
};

fetchPokemon();

var count = 0;

const addPokemonList = (pokemonId) => {

    const selectedPokemon = arrayOfPokemons.find(pokemon => pokemon.id === pokemonId);

    if (selectedPokemon == null) {
        alert("There is no pokemon add list");
    } else {
        console.log(selectedPokemon);
        count += 1;
        if (count > 6) {
            alert("you are not allow to add list more than 6 pokemons");
            count = 0;
        }
        document.getElementById("click").innerHTML = count;
        document.getElementById("message").innerHTML = "Pokemon was added: " + selectedPokemon.id + "," + selectedPokemon.name;
    }

}

const dispayPokemon = (pokemon) => {

    const showPokemonHTMLString = pokemon.map(pokemons =>
        `
            <div class ="container">
                <ol class = "card" >
                    <img class = "card-image" src="${pokemons.image}"/>
                    <h3 class ="card-title">${pokemons.id}. ${pokemons.name}</h3>
                    <p class= "card-subtitle">Type: ${pokemons.type}</p>
                    <button class="getButton" onclick = "addPokemonList(${pokemons.id})">Select</button>
                </ol>
            </div>         
    `).join('')

    listOfPokemon.innerHTML = showPokemonHTMLString;
};