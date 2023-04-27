
-------------------- PROJECT: character log --------------------
OBJECTIVE: allow user to enter book character details and render
    those details to webpage so user can track characters
MVP GOALS:
    HTML: input form, grid of saved entries
    CSS: KISS, b&w+1, centered form, grid for saved entires
    JS: retrieve user input, save each input submission as object
         in array, render each object to DOM as user submits
----------------------------------------------------------------
JS game plan:
    renderCharacter() - on submit, this function will display the
        character details from most recent object in characters 
        array
    buildObject() - using character details, build new object and
        append to array of existing characters
    retrieveInput() - pull values from input fields, clear fields 
        for next entries


------------------------------------------------------------------
ISSUES / LOOK INTO
- json stringify/parse

- .innerHTML is rendering entire array every time new character added - use loop differently?