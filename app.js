const findPokemon = () => {
    // url da api com as informações dos pokemon
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    
    //
    const pokemonPromises = []
    
    // a cada execução do loop, apromise é adicionada a um array de promises 
    for (let i = 1; i <= 96; i++) {
        // fetch é um metodo que faz uma requisição http e traz dados da url especificada / esse metodo retorna uma promice 
        // O método then() retorna uma Promise. Possui dois argumentos, ambos são "call back functions", sendo uma para o sucesso e outra para o fracasso da promessa.
        // O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    //O método Promise.all(iterable) retorna uma única Promise que resolve quando todas as promises no argumento iterável forem resolvidas ou quando o iterável passado como argumento não contém promises.
    Promise.all(pokemonPromises)
        .then(pokemons => {
            
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                //O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class="card ${types[0]} ">
                    <img class="card-image" alt"${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle">${types.join(' | ')}</p>
                </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
    
}


findPokemon()