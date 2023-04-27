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
// delete and edit buttons, do not yet function
const deleteBtn = document.getElementsByClassName('delete-btn');
const editBtn = document.getElementsByClassName('edit-btn');
// remove first/last buttons, temporary solution until delete function added
const removeFirstBtn = document.getElementById('remove-first-btn');
const removeLastBtn = document.getElementById('remove-last-btn');
// array will hold all current character objects
let charactersArr = [];
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
        <i class="fa fas fa-pencil edit-btn"></i>
        <i class="fa fa-solid fa-trash delete-btn"></i>
      </p> 
     </div>
    `;
  }
  return renderHtml;
}

// create new character object from user form input
function retrieveInput() {
  const characterFormData = new FormData(characterForm);
  const characterName = characterFormData.get('character-name-input');
  const bookName = characterFormData.get('book-name-input');
  const firstMention = characterFormData.get('first-mention-input');
  const description = characterFormData.get('description-input');
  const location = characterFormData.get('location-input');
  const notes = characterFormData.get('notes-input');
  // create character object from user input
  const characterObj = {
    name: characterName,
    book: bookName,
    firstMention: firstMention,
    description: description,
    location: location,
    notes: notes,
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

// remove first item from character array
removeFirstBtn.addEventListener('click', removeFirst);

function removeFirst(e) {
  e.preventDefault(); // prevent page refresh
  charactersArr.shift(); // remove first item
  localStorage.setItem("myCharacters", JSON.stringify(charactersArr)); // update local storage
  characterSection.innerHTML = updateRender(); // update html render
}

// remove last item from character array
removeLastBtn.addEventListener('click', removeLast);

function removeLast(e) {
  e.preventDefault(); // prevent page refresh
  charactersArr.pop(); // remove last item
  localStorage.setItem("myCharacters", JSON.stringify(charactersArr)); // update local storage
  characterSection.innerHTML = updateRender(); // update html render
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
        <i class="fa fa-solid fa-trash delete-btn"></i>
      </p> 
     </div>
    `;
  }
  return renderHtml;
}
