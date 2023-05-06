// uuid generator
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// variables
const saveBtn = document.getElementById('save-btn');
const characterForm = document.getElementById('character-form');
const characterSection = document.getElementById('character-section');
const characterNameInput = document.getElementById('character-name-input');
const bookNameInput = document.getElementById('book-name-input');
const firstMentionInput = document.getElementById('first-mention-input');
const descriptionInput = document.getElementById('description-input');
const locationInput = document.getElementById('location-input');
const notesInput = document.getElementById('notes-input');

let charactersArr = [];

document.addEventListener('click', function(e){
  if (e.target.dataset.delete) { // if clicking on delete button
    handleDeleteClick(e.target.dataset.delete) // handle delete click, pass argument of clicked item's uuid
  }
})

function handleDeleteClick(characterId) {
  charactersArr.forEach(function(character){ // iterate thru characters array
    if (character.uuid === characterId) { // find character object with same uuid as target
      let targetCharacterObj = character; 
      charactersArr.splice(charactersArr.indexOf(targetCharacterObj), 1); // remove targetCharacterObj from array
      localStorage.setItem("myCharacters", JSON.stringify(charactersArr)); // update local storage
      characterSection.innerHTML = updateRender(); // update rendered html
    }
  })
}

// retrieve characters from local storage
let charactersFromLocalStorage = JSON.parse(localStorage.getItem("myCharacters"));
// if there are characters in local storage, add them to the character array and render them to the DOM
if (charactersFromLocalStorage) {
  charactersArr = charactersFromLocalStorage;
  characterSection.innerHTML = updateRender();
}

saveBtn.addEventListener('click', renderCharacter);

// display character array in browser
function renderCharacter(e) {
  e.preventDefault(); // prevent refresh on submit
  const characterCard = addNewCharacter();
  characterSection.innerHTML = characterCard;
}

// add newest character object to array, create html for each character in array
function addNewCharacter() {
  let charactersArr = retrieveInput();
  // create HTML for each character in charactersArr;
  let renderHtml = "";
  for (let character of charactersArr) {
    renderHtml += `
    <div class="character-card">
       <h2>${character.name}</h2>
       <h3>${character.book}</h3>
       <p><span>First mentioned (page):</span> ${character.firstMention}</p>
       <p><span>Description:</span> ${character.description}</p>
       <p><span>Location:</span> ${character.location}</p>
       <p><span>Notes:</span> ${character.notes}</p>
       <p class="icons">
        <i class="fa fas fa-pencil edit-btn" data-edit="${character.uuid}"></i>
        <i class="fa fa-solid fa-trash delete-btn" data-delete="${character.uuid}"></i>
      </p> 
     </div>
    `;
  }
  return renderHtml;
}

// build new character object from user form input
function retrieveInput() {
  const characterFormData = new FormData(characterForm);
  const characterName = characterFormData.get('character-name-input');
  const bookName = characterFormData.get('book-name-input');
  const firstMention = characterFormData.get('first-mention-input');
  const description = characterFormData.get('description-input');
  const location = characterFormData.get('location-input');
  const notes = characterFormData.get('notes-input');
  const uuid = uuidv4();
  // build character object from user input
  const characterObj = {
    name: characterName,
    book: bookName,
    firstMention: firstMention,
    description: description,
    location: location,
    notes: notes,
    uuid: uuid,
  };

  // add new character object to array
  charactersArr.push(characterObj);

  // clear input fields
  characterNameInput.value = "";
  bookNameInput.value = "";
  firstMentionInput.value = "";
  descriptionInput.value = "";
  locationInput.value = "";
  notesInput.value = "";
  
  // save array to local storage
  localStorage.setItem("myCharacters", JSON.stringify(charactersArr));

  return charactersArr;
}

// update html rendered when array is changed
function updateRender() {
  let renderHtml = "";
  for (let character of charactersArr) {
    renderHtml += `
    <div class="character-card">
       <h2>${character.name}</h2>
       <h3>${character.book}</h3>
       <p><span>First mentioned (page):</span> ${character.firstMention}</p>
       <p><span>Description:</span> ${character.description}</p>
       <p><span>Location:</span> ${character.location}</p>
       <p><span>Notes:</span> ${character.notes}</p>
       <p class="icons">
        <i class="fa fas fa-pencil edit-btn"></i>
        <i class="fa fa-solid fa-trash delete-btn" data-delete="${character.uuid}"></i>
      </p> 
     </div>
    `;
  }
  return renderHtml;
}
