// url da api com as informações dos pokemon
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

// map com parametro underline '_' significa que nao vai usar este parametro 
// <img class="card-image" alt"${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
// fetch é um metodo que faz uma requisição http e traz dados da url especificada / esse metodo retorna uma promice 
// O método then() retorna uma Promise. Possui dois argumentos, ambos são "call back functions", sendo uma para o sucesso e outra para o fracasso da promessa.
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

//O método reduce() executa uma função reducer (fornecida por você) para cada elemento do array, resultando num único valor de retorno.
const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types}) => {
        //O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
        const elementTypes = types.map(typeInfo => typeInfo.type.name)

        accumulator += `
        <li class="card ${elementTypes[0]} ">
            <img class="card-image" alt"${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
        `
        return accumulator
    }, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()

//O método Promise.all(iterable) retorna uma única Promise que resolve quando todas as promises no argumento iterável forem resolvidas ou quando o iterável passado como argumento não contém promises.
Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
    



//findPokemon()