const findPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/25`
    
    const pokemonPromises = []

    for (let i = 1; i <= 150; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all()
}

findPokemon()