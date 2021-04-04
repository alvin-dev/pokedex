const findPokemon = () => {
    //
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    
    //
    const pokemonPromises = []
    
    for (let i = 1; i <= 150; i++){
        // fetch é um metodo que faz uma requisição http e traz dados da url especificada / esse metodo retorna uma promice 
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    //
    Promise.all(pokemonPromises)
        .then(pokemons => {
            console.log(pokemons)

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                accumulator += `
                <li class="card">
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle">${pokemon.types.map(typeInfo => typeInfo.type.name)}</p>
                </li>
                `
                return accumulator
            }, '')

            console.log(lisPokemons);
        })
    
    
}



findPokemon()