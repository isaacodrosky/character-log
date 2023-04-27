
const saveBtn = document.getElementById('save-btn');
const characterForm = document.getElementById('character-form');
const characterSection = document.getElementById('character-section');
const characterNameInput = document.getElementById('character-name-input');
const bookNameInput = document.getElementById('book-name-input');
let charactersArr = [];

saveBtn.addEventListener('click', renderCharacter);

// display character array in browser
function renderCharacter(e) {
  e.preventDefault(); // prevent refresh on submit
  const characterCard = addNewCharacter();
  characterSection.innerHTML = characterCard;
}

// add newest character object to array, create html for each character in array
function addNewCharacter() {
  const newCharacter = retrieveInput();
  charactersArr.push(newCharacter);
  // create HTML for each character in charactersArr;
  let renderHtml = "";
  for (let character of charactersArr) {
    renderHtml += `
    <div class="character-card">
       <h2>${character.name}</h2>
       <p>${character.book}</p>
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
  // create character object from user input
  const characterObj = {
    name: characterName,
    book: bookName
  };
  // clear input fields
  characterNameInput.value = "";
  bookNameInput.value = "";
  return characterObj;
}
