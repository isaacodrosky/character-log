// uuid generator
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const characterForm = document.getElementById('character-form');
const characterNameInput = document.getElementById('character-name-input');
const characterSection = document.getElementById('character-section');
let renderHtml;
let charactersArr = [];
let charactersFromLocalStorage = JSON.parse(localStorage.getItem("myCharacters"));

checkCharacters();

document.addEventListener('keypress', (e) => {
  if (e.keypress === 'Enter') {
    if (characterNameInput.value.length > 0) {
      renderNewCharacter(e);
      checkCharacters();
    } else {
      alert('Please enter a character name.');
    }
  }
})


document.addEventListener('click', function(e){
  if (e.target.dataset.delete) { 
    handleDeleteClick(e.target.dataset.delete) 
    checkCharacters();
  } else if (e.target === document.getElementById('add-btn')) {
    if (characterNameInput.value.length > 0) {
      renderNewCharacter(e);
      checkCharacters();
    } else {
      alert('Please enter a character name.');
    }
  } else if (e.target.dataset.edit) {
    handleEditClick(e.target.dataset.edit)
  } else if (e.target.dataset.save) {
    handleSaveClick(e.target.dataset.save)
  } else if (e.target.dataset.new) {
    characterForm.classList.toggle('open');
    document.getElementById('new-icon').classList.toggle('rotate');
    document.getElementById('new-icon').style.transition = 'transform 200ms'
  }
})

function handleDeleteClick(characterId) {
  charactersArr.forEach(function(character){ 
    if (character.uuid === characterId) { 
      if (confirm(`Are you sure you want to delete ${character.name}?`)){ // ask user to confirm they want to delete this character
        let targetCharacterObj = character; 
        charactersArr.splice(charactersArr.indexOf(targetCharacterObj), 1); // remove targetCharacterObj from array
        localStorage.setItem("myCharacters", JSON.stringify(charactersArr)); 
        characterSection.innerHTML = getRenderHtml(); 
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

      localStorage.setItem("myCharacters", JSON.stringify(charactersArr));

      const editFields =  Array.from(parent.getElementsByClassName('character-detail')); 
      editFields.forEach(function(field) { 
        field.removeAttribute('contenteditable', '');
      })

      document.querySelector('.save-btn').style.display = 'none'
    }
    
  })
}

// display new character array in browser
function renderNewCharacter(e) {
  e.preventDefault();
  charactersArr = retrieveInput()
  characterSection.innerHTML = getRenderHtml();
}

function getRenderHtml() {
  renderHtml = "";
  for (let character of charactersArr) {
    renderHtml += `
    <div class="character-card" id="${character.uuid}">
      <h2>
        <span class="character-detail" data-name="${character.uuid}">${character.name}</span>
      </h2>
      <h3>
        <span class="character-detail" data-book="${character.uuid}">${character.book}</span>
      </h3>
      <p>First mentioned: 
        <span class="character-detail" data-first-mention="${character.uuid}">${character.firstMention}</span>
      </p>
      <p>Description: 
        <span class="character-detail" data-description="${character.uuid}">${character.description}</span>
      </p>
      <p>Location: 
        <span class="character-detail" data-location="${character.uuid}">${character.location}</span>
      </p>
      <p>Notes: 
        <span class="character-detail" data-notes="${character.uuid}">${character.notes}</span>
      </p>
      <p class="icons">
        <i class="fa fas fa-pencil edit-btn" data-edit="${character.uuid}"></i>
        <i class="fa fa-solid fa-trash delete-btn" data-delete="${character.uuid}"></i>
      </p> 
     </div>
    `;
  }
  return renderHtml;
}

// build new character object from user form input & save to local storage
function retrieveInput() {

  // refactor to construct object in a better way: 
  // https://stackoverflow.com/a/48996513/17185082
  
    const characterFormData = new FormData(characterForm);
    const characterObj = {
      name: characterFormData.get('character-name-input'),
      book: characterFormData.get('book-name-input'),
      firstMention: characterFormData.get('first-mention-input'),
      description: characterFormData.get('description-input'),
      location: characterFormData.get('location-input'),
      notes: characterFormData.get('notes-input'),
      uuid: uuidv4(),
      };

  charactersArr.push(characterObj);

  characterNameInput.value = "";
  document.getElementById('book-name-input').value = "";
  document.getElementById('first-mention-input').value = "";
  document.getElementById('description-input').value = "";
  document.getElementById('location-input').value = "";
  document.getElementById('notes-input').value = "";
  
  localStorage.setItem("myCharacters", JSON.stringify(charactersArr));

  return charactersArr;
}

function checkCharacters() {
  // if there are characters in local storage, add them to the character array and render to the DOM
  if (charactersFromLocalStorage) {
    charactersArr = charactersFromLocalStorage;
    characterSection.innerHTML = getRenderHtml();
    characterForm.classList.remove('open');
  }

  if (!charactersFromLocalStorage.length) {
    characterForm.classList.toggle('open');
  }
}
