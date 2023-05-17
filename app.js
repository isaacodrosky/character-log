// uuid generator
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// variables
const addBtn = document.getElementById('add-btn');
const characterForm = document.getElementById('character-form');
const characterSection = document.getElementById('character-section');
const characterNameInput = document.getElementById('character-name-input');
const bookNameInput = document.getElementById('book-name-input');
const firstMentionInput = document.getElementById('first-mention-input');
const descriptionInput = document.getElementById('description-input');
const locationInput = document.getElementById('location-input');
const notesInput = document.getElementById('notes-input');

let renderHtml;
let charactersArr = [];

// retrieve characters from local storage
let charactersFromLocalStorage = JSON.parse(localStorage.getItem("myCharacters"));
// if there are characters in local storage, add them to the character array and render them to the DOM
if (charactersFromLocalStorage) {
  charactersArr = charactersFromLocalStorage;
  characterSection.innerHTML = getRenderHtml();
}

document.addEventListener('click', function(e){
  if (e.target.dataset.delete) { 
    handleDeleteClick(e.target.dataset.delete) 
  } else if (e.target === addBtn) {
    if (characterNameInput.value.length > 0) {
      renderCharacter(e);
    } else {
      alert('Please enter a character name.');
    }
  } else if (e.target.dataset.edit) {
    handleEditClick(e.target.dataset.edit)
  } else if (e.target.dataset.save) {
    handleSaveClick(e.target.dataset.save)
  }
})

// delete character from array
function handleDeleteClick(characterId) {
  charactersArr.forEach(function(character){ // iterate thru characters array
    if (character.uuid === characterId) { // find character object with same uuid as target
      if (confirm(`Are you sure you want to delete ${character.name}?`)){ // ask user to confirm they want to delete this character
        let targetCharacterObj = character; 
        charactersArr.splice(charactersArr.indexOf(targetCharacterObj), 1); // remove targetCharacterObj from array
        localStorage.setItem("myCharacters", JSON.stringify(charactersArr)); // update local storage
        characterSection.innerHTML = getRenderHtml(); // update rendered html
      }
    }
  })
}

function handleEditClick(characterId) {
  charactersArr.forEach(function(character){
    if (character.uuid === characterId) { 
      const parent = document.getElementById(`${character.uuid}`); // find character card that was clicked
      const editFields =  Array.from(parent.getElementsByClassName('character-detail')); // create array from 'character-detail' elements so you can iterate below
      editFields.forEach(function(field) { 
        field.setAttribute('contenteditable', '')
      })

      // add check mark button 
      parent.querySelector('.icons').insertAdjacentHTML('afterbegin', `
        <i class="fa-solid fas fa-check save-btn" data-save="${character.uuid}"></i>
      `)
    }
  })
}

function handleSaveClick(characterId) {
  charactersArr.forEach(function(character){
    if (character.uuid === characterId) {

      // update character obj with textcontent of each editfield
      const parent = document.getElementById(`${characterId}`);
      character.name = parent.querySelector(`[data-name="${characterId}"]`).textContent
      character.book = parent.querySelector(`[data-book="${characterId}"]`).textContent
      character.firstMention = parent.querySelector(`[data-first-mention="${characterId}"]`).textContent
      character.description = parent.querySelector(`[data-description="${characterId}"]`).textContent
      character.notes = parent.querySelector(`[data-notes="${characterId}"]`).textContent

      // BUG: need to allow empty book name to be edited (not displaying if empty)

      localStorage.setItem("myCharacters", JSON.stringify(charactersArr));

      const editFields =  Array.from(parent.getElementsByClassName('character-detail')); 
      editFields.forEach(function(field) { 
        field.removeAttribute('contenteditable', '');
      })
    }
  })
}

// display character array in browser
function renderCharacter(e) {
  e.preventDefault(); // prevent refresh on submit
  charactersArr = retrieveInput()
  characterSection.innerHTML = getRenderHtml();
}

function getRenderHtml() {
  renderHtml = "";
  for (let character of charactersArr) {
    renderHtml += `
    <div class="character-card" id="${character.uuid}">
       <h2><span class="character-detail" data-name="${character.uuid}">${character.name}</span></h2>
       <h3><span class="character-detail" data-book="${character.uuid}">${character.book}</span></h3>
       <p>First mentioned (page): <span class="character-detail" data-first-mention="${character.uuid}">${character.firstMention}</span></p>
       <p>Description: <span class="character-detail" data-description="${character.uuid}">${character.description}</span></p>
       <p>Location: <span class="character-detail" data-location="${character.uuid}">${character.location}</span></p>
       <p>Notes: <span class="character-detail" data-notes="${character.uuid}">${character.notes}</span></p>
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
    // build character object from user input
    const characterObj = {
      name: characterFormData.get('character-name-input'),
      book: characterFormData.get('book-name-input'),
      firstMention: characterFormData.get('first-mention-input'),
      description: characterFormData.get('description-input'),
      location: characterFormData.get('location-input'),
      notes: characterFormData.get('notes-input'),
      uuid: uuidv4(),
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
