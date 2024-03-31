

let app = document.getElementById('app');

let player = {

  name: "Red",
  image: "imgs/E_Red_Back.png",
  caughtPokemon: [],
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
  imageBack: "imgs/Pokemon/Unknown.png",
  description: "No information on this Pokémon",
  type1: "None",
  type2: "None",
  level: "",
}

let previousSelectedPokemon = 0;
let pokemonInBattle = false;
let randomPokemon;
let newPokemon;
let previousPokemon;
let pokedexList = "";
let pokedexListScrollPosition = 0;

startscreenView();

function startscreenView() {
  app.innerHTML = /*HTML*/ `
    <div class="startScreenContainer">
      <div class="topStartScreen">
        <div class="selectedPokemonImage">
          <img src="${selectedPokemon.image}">
        </div>
      </div>
      <div class="bottomStartScreen">
        <div class="pokeball" onclick="chooseStarterPokemon('bulbasaur')"></div>
        <div class="pokeball" onclick="chooseStarterPokemon('charmander')"></div>
        <div class="pokeball" onclick="chooseStarterPokemon('squirtle')"></div>
      </div>
    </div>

    <div class="startScreenMenuContainer">
      <div class="startGameText">
        ${selectedPokemon.image != "imgs/Pokemon/Unknown.png" ? `Start game with ${selectedPokemon.name} as your starter Pokémon?` : `Choose your starter Pokémon`}
      </div>
      <div class="startScreenButtonContainer">
      ${selectedPokemon.image != "imgs/Pokemon/Unknown.png" ? `<button onclick="startGame()">Start game</button>` : `<button disabled onclick="startGame()">Start game</button>`}
      </div>
    </div>
  `
}

function overworldView() {
  app.innerHTML = /*HTML*/ `
  `
}

function battleView() {
  app.innerHTML = /*HTML*/ `
    <div class="battleContainer">
      <div class="topScreen">
        <div class="opposingPokemonInfo">
          <div class="opposingPokemonName"><img src='${player.caughtPokemon.indexOf(randomPokemon) != -1 ? "imgs/pokeball.png" : "imgs/pokeball_darkened.png"}'>${randomPokemon.name}</div>
            <div>Lv: ${randomPokemon.level}</div>
        </div>
            <div class="opposingPokemonImage"><img src="${randomPokemon.image}"></div>
      </div>
          
      <div class="bottomScreen">
      <div class="playerImage"><img class="playerInBattle" src="${player.image}"></div>
        <div class="playerInfo">
          <div class="playerName">${player.name}</div>
          ${pokemonInBattle ? `<div class="playerLevel">Lv: ${player.level}</div>` : ``};
        </div>
      </div>
    </div>

    <div class="battleMenuContainer">          
      <div class="battleButtonContainer">    
        <button onclick="catchPokemon()" >Catch pokémon</button>    
        <button onclick="getRandomPokemon()">Find new pokémon</button>
        <button onclick="pokedexView()">Pokédex</button>       
      </div>
    </div>
`;
}

function caughtPokemonView() {
  app.innerHTML = /*HTML*/ `
    <div class="caughtContainer">
    <div class="topScreen">
        <div class="opposingPokemonInfo">
          <div class="opposingPokemonName"><img src='${player.caughtPokemon.indexOf(randomPokemon) != -1 ? "imgs/pokeball.png" : "imgs/pokeball_darkened.png"}'>${randomPokemon.name}</div>
            <div>Lv: ${randomPokemon.level}</div>
        </div>
            <div class="caughtPokemonImage"><img src="imgs/pokeball.png" style="image-rendering: pixelated"></div>
      </div>
      <div class="caughtInfo">
      <img src="${pokemonList[newPokemon].image}">
      <h3>You caught the ${player.caughtPokemon[player.caughtPokemon.length - 1].name}!</h3>
      </div>
    </div>
      
    <div class="caughtMenuContainer">
      <div class="caughtButtonContainer">
      <button onclick="getRandomPokemon()">Find new pokémon</button>     
      </div>
    </div>
`;
}

function pokedexView() {
  createPokedex();
  app.innerHTML = /*HTML*/`
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
    <div class="pokedexMenuContainer">          
      <div class="pokedexButtonContainer">
      <button onclick="clearPokedex(); battleView();">Exit</button>
      ${selectedPokemon.name != "???" ? `<button onclick="choosePokemon();">Send out Pokémon</button>` : ``};  
      </div>
    </div>
               
`;
}

function chooseStarterPokemon(pkmn){
  if(pkmn == 'bulbasaur'){
    selectedPokemon.image = Bulbasaur.image;
    selectedPokemon.name = Bulbasaur.name;
  }
  if(pkmn == 'charmander'){
    selectedPokemon.image = Charmander.image;
    selectedPokemon.name = Charmander.name;
  }
  if(pkmn == 'squirtle'){
    selectedPokemon.image = Squirtle.image;
    selectedPokemon.name = Squirtle.name;
  }
  startscreenView();
}

function startGame(){
  if(selectedPokemon.image == Bulbasaur.image){
    Bulbasaur.isCaught = true;
    player.caughtPokemon.push(Bulbasaur);
  }
  if(selectedPokemon.image == Charmander.image){
    Charmander.isCaught = true;
    player.caughtPokemon.push(Charmander);
  }
  if(selectedPokemon.image == Squirtle.image){
    Squirtle.isCaught = true;
    player.caughtPokemon.push(Squirtle);
  }
  getRandomPokemon();
  clearPokedex();
}

function choosePokemon() {
  
  pokemonInBattle = true;
  player.name = selectedPokemon.name;
  player.image = selectedPokemon.imageBack;
  player.level = selectedPokemon.level;
  //NEEDS MORE LOGIC
  clearPokedex();
  battleView();
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
  selectedPokemon.imageBack = pokemonList[i].imageBack;
  selectedPokemon.description = pokemonList[i].description;
  selectedPokemon.type1 = pokemonList[i].type1;
  selectedPokemon.type2 = pokemonList[i].type2;
  selectedPokemon.level = pokemonList[i].level;

  pokemonList[previousSelectedPokemon].viewingInPokedex = false;
  pokemonList[i].viewingInPokedex = true;
  previousSelectedPokemon = i;
  pokedexView();
  document.querySelector('.pokedexList').scrollTop = pokedexListScrollPosition;

}

function notCaughtPokemon(i) {
  pokedexListScrollPosition = document.querySelector('.pokedexList').scrollTop;
  clearPokedex();

  pokemonList[previousSelectedPokemon].viewingInPokedex = false;
  pokemonList[i].viewingInPokedex = true;
  previousSelectedPokemon = i;

  pokedexView();
  document.querySelector('.pokedexList').scrollTop = pokedexListScrollPosition;
}

function clearPokedex() {
  selectedPokemon.name = "???";
  selectedPokemon.image = "imgs/Pokemon/Unknown.png";
  selectedPokemon.imageBack = "imgs/Pokemon/Unknown.png";
  selectedPokemon.description = "No information on this Pokémon";
  selectedPokemon.type1 = "None";
  selectedPokemon.type2 = "None";
  battleView();
}