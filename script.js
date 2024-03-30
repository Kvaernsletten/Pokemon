

let app = document.getElementById('app');

let player = {

  name: "Red",
  image: "imgs/E_Red_Back.png",
  caughtPokemon: [Bulbasaur],
}

let pokemonList = [
  Bulbasaur, Ivysaur, Venusaur, Charmander, Charmeleon, Charizard,
  Squirtle, Wartortle, Blastoise, Caterpie, Metapod, Butterfree,
  Weedle, Kakuna, Beedrill, Pidgey, Pidgeotto, Pidgeot,
  Rattata, Raticate, Spearow, Fearow, Ekans, Arbok,
  Pikachu, Raichu, Sandshrew, Sandslash, Nidoran_F, Nidorina,
  Nidoqueen, Nidoran_M, Nidorino, Nidoking, Clefairy, Clefable,
  Vulpix, Ninetales, Jigglypuff, Wigglytuff, Zubat, Golbat,
  Oddish, Gloom, Vileplume, Paras, Parasect, Venonat,
  Venomoth, Diglett, Dugtrio, Meowth, Persian, Psyduck,
  Golduck, Mankey, Primeape, Growlithe, Arcanine, Poliwag,
  Poliwhirl, Poliwrath, Abra, Kadabra, Alakazam, Machop,
  Machoke, Machamp, Bellsprout, Weepinbell, Victreebel, Tentacool,
  Tentacruel, Geodude, Graveler, Golem, Ponyta, Rapidash,
  Slowpoke, Slowbro, Magnemite, Magneton, Farfetchd, Doduo,
  Dodrio, Seel, Dewgong, Grimer, Muk, Shellder,
  Cloyster, Gastly, Haunter, Gengar, Onix, Drowzee,
  Hypno, Krabby, Kingler, Voltorb, Electrode, Exeggcute,
  Exeggutor, Cubone, Marowak, Hitmonlee, Hitmonchan, Lickitung,
  Koffing, Weezing, Rhyhorn, Rhydon, Chansey, Tangela,
  Kangaskhan, Horsea, Seadra, Goldeen, Seaking, Staryu,
  Starmie, MrMime, Scyther, Jynx, Electabuzz, Magmar,
  Pinsir, Tauros, Magikarp, Gyarados, Lapras, Ditto,
  Eevee, Vaporeon, Jolteon, Flareon, Porygon, Omanyte,
  Omastar, Kabuto, Kabutops, Aerodactyl, Snorlax, Articuno,
  Zapdos, Moltres, Dratini, Dragonair, Dragonite, Mewtwo,
  Mew
];

let selectedPokemon = {
  name: "???",
  image: "imgs/Pokemon/Unknown.png",
  description: "No information on this Pokémon",
  type1: "None",
  type2: "None",
}
let previousSelectedPokemon = 0;

let pokemonInBattle = false;
let randomPokemon;
let newPokemon;
let previousPokemon;
let pokedexList = "";
let pokedexListScrollPosition = 0;

getRandomPokemon();
battleView();

function startscreenView() {

}

function overworldView() {


}

function battleView() {
  app.innerHTML = /*HTML*/ `
    <div class="container">
      <div class="topScreen">
        <div class="opposingPokemonInfo">
          <div class="opposingPokemonName"><img src='${player.caughtPokemon.indexOf(randomPokemon) != -1 ? "imgs/pokeball.png" : "imgs/pokeball_darkened.png"}'>${randomPokemon.name}</div>
            <div>Lv: ${randomPokemon.level}</div>
        </div>
            <div class="opposingPokemonImage"><img src="${randomPokemon.image}"></div>
      </div>
          
      <div class="bottomScreen">
        <div class="playerInfo">
            <div class="playerImage"><img class="playerInBattle" src="${pokemonInBattle ? player.caughtPokemon[player.caughtPokemon.length - 1].imageBack : player.image}"></div>
            <div class="playerName">${pokemonInBattle ? player.caughtPokemon[player.caughtPokemon.length - 1].name : player.name}</div>
            <div class="playerLevel">Lv: ${player.caughtPokemon[player.caughtPokemon.length - 1].level}</div>
        </div>
      </div>
    </div>
    <div class="menuContainer">          
      <div class="buttonContainer">
        <button onclick="choosePokemon()">Choose pokémon to battle</button>    
        <button onclick="catchPokemon()" >Catch pokémon</button>    
        <button onclick="getRandomPokemon()">Find new pokémon</button>
        <button onclick="pokedexView()">Pokédex</button>       
      </div>
    </div>
`;
}

function pokedexView() {
  createPokedex();
  app.innerHTML = /*HTML*/`
          <div>
          <div class="pokedexContainer">
            <div class="pokedexRow1">
              <div class="pokedexRow1Column1">
                <div class="pokedexName">${selectedPokemon.name}</div>
                <div class="pokedexImage"><img src="${selectedPokemon.image}"></div>
                  <div class="typeContainer">
                    <div class="type1"><img src="imgs/Type/${selectedPokemon.type1}.png"></div>
                    <div class="type2"><img src="imgs/Type/${selectedPokemon.type2}.png"></div>
                  </div>
                <div class="pokemonDescription">${selectedPokemon.description}</div>
              </div>
            </div>
            <div class="pokedexRow2">
              <div class="pokedexList">${pokedexList}</div>
            </div>
          </div> 
          <div class="menuContainer">          
          <div class="buttonContainer">  
                  <button onclick="exitPokedex()">Exit</button>
              </div>
            </div>
               
          `
}

function choosePokemon() {
  pokemonInBattle = true;
  //NEEDS MORE LOGIC
  battleView();
}

function caughtPokemonView() {
  app.innerHTML = /*HTML*/ `
    <div class="caughtContainer">
      <img src="${pokemonList[newPokemon].image}">
      <h3>You caught the ${player.caughtPokemon[player.caughtPokemon.length - 1].name}</h3>
      <div class="buttonContainer">
                <button onclick="getRandomPokemon()">Find new pokémon</button>     
            </div>
    </div>
    `;
}

function catchPokemon() {
  //ADD SUCCESSRATE BASED ON CATCHRATE AND POKEBALL ITEMS
  player.caughtPokemon.push(pokemonList[newPokemon]);
  pokemonList[newPokemon].isCaught = true;
  caughtPokemonView();

}


function getRandomPokemon() {
  newPokemon = Math.floor(Math.random() * pokemonList.length);
  if (newPokemon != previousPokemon) {
    randomPokemon = pokemonList[newPokemon];
  }
  else {
    getRandomPokemon();
  }
  previousPokemon = newPokemon;
  battleView();
}

function createPokedex() {
  pokedexList = "";
  for (i = 0; i < pokemonList.length; i++) {
    pokedexList += /*HTML*/`<div class="pokedexListName ${pokemonList[i].viewingInPokedex ? 'selectedColor' : ''}" ${pokemonList[i].isCaught == 1 ? "onclick='viewPokemon(" + i + ")'" : "onclick='notCaughtPokemon(" + i + ")'"}>
    <img src='${pokemonList[i].isCaught == 1 ? "imgs/pokeball.png" : "imgs/pokeball_darkened.png"}'>${pokemonList[i].isCaught == 1 ? pokemonList[i].name : "???"}</div>`
    pokemonList[i].viewingInPokedex = false;
  }
}

function viewPokemon(i) {
  pokedexListScrollPosition = document.querySelector('.pokedexList').scrollTop;
  selectedPokemon.name = pokemonList[i].name;
  selectedPokemon.image = pokemonList[i].image;
  selectedPokemon.description = pokemonList[i].description;
  selectedPokemon.type1 = pokemonList[i].type1;
  selectedPokemon.type2 = pokemonList[i].type2;

  pokemonList[previousSelectedPokemon].viewingInPokedex = false;
  pokemonList[i].viewingInPokedex = true;
  previousSelectedPokemon = i;
  pokedexView();
  document.querySelector('.pokedexList').scrollTop = pokedexListScrollPosition;

}

function notCaughtPokemon(i) {
  pokedexListScrollPosition = document.querySelector('.pokedexList').scrollTop;
  selectedPokemon.name = "???";
  selectedPokemon.image = "imgs/Pokemon/Unknown.png";
  selectedPokemon.description = "No information on this Pokémon";
  selectedPokemon.type1 = "None";
  selectedPokemon.type2 = "None";

  pokemonList[previousSelectedPokemon].viewingInPokedex = false;
  pokemonList[i].viewingInPokedex = true;
  previousSelectedPokemon = i;

  pokedexView();
  document.querySelector('.pokedexList').scrollTop = pokedexListScrollPosition;
}

function exitPokedex() {
  selectedPokemon.name = "???";
  selectedPokemon.image = "imgs/Pokemon/Unknown.png";
  selectedPokemon.description = "No information on this Pokémon";
  selectedPokemon.type1 = "None";
  selectedPokemon.type2 = "None";
  battleView();
}