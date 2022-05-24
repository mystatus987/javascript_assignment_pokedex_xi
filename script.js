const listOfPokemon = document.getElementById("listOfPokemon");
console.log(listOfPokemon);


let arrayOfPokemons = [];

const fetchPokemon = () => {
    // create arru list of promise
    const promises = [];
    // for (let i = 1; i <= 898; i++)
    for (let i = 1; i <= 300; i++) {
        // get api url 
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        //fetch url and passing to parameter fetch then use call back function
        // each request, promises to push 
        promises.push(fetch(url).then((response) => response.json()));
    }

    // all promise an asynchronous operation 
    Promise.all(promises)
        .then(results => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(", ")
            }));
            // push array objects to global variable => arrayOfPokemon
            pokemon.map(pmn => arrayOfPokemons.push(pmn));
            //display all pokemon 
            dispayPokemon(pokemon);
        });

    /*
     .then(data => {
                // check data if the pokemon data is able to fetch
                console.log(data);
                // create arry of pokemon obj details
                const pokemon = {
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                    type: data.types.map((type) => type.type.name).join(", ")
                };
                console.log(pokemon);

    testing 
      // get what json data need from api
      pokemon['name'] = data.name;
      pokemon['id'] = data.id;
      pokemon['image'] = data.sprites['front_default'];
      // using map to get array and once get arry obj change these to string using join
      pokemon['type'] = data.types.map((type) => type.type.name).join(", ")
    */
};

fetchPokemon();
// console.log(arrayOfPokemons);

var count = 0;

const addPokemonList = (pokemonId) => {
    // search in global array for passed in id
    const selectedPokemon = arrayOfPokemons.find(pokemon => pokemon.id === pokemonId);
    // storedPokemonList.push(selectedPokemon);
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
    // console.log(pokemon);
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
        // binding list of pokemon to html
    listOfPokemon.innerHTML = showPokemonHTMLString;

};