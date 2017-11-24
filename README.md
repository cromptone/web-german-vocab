# web-german-vocab

_To use_

* Run ``npm install``

* Run ``npm run build``

* Run ``npm run start`` for dev or ``npm run deploy`` for prod 

A deployed version should be currently available at https://lucid-hawking-821378.netlify.com
_______________________________



_Introduction_

* This is a personal vocabulary practice program I created to help me learn German vocabulary.


_Description of drills_

* Word cloud: For a given vocab list, the user must write the German version perfectly for all the words in the list. The user can make errors without penalty.
* With prompts: For a given vocab list, the user is prompted with an English word, and given one chance to write the German version.

_Ideas for improvement_
* More vocabulary!
* Allow users to choose to be drilled on fewer words (i.e., a subset) or more words (i.e., an intersection of several sets)
* Put a button that allows users to continue being drilled on the vocabulary they previously missed
* Refactor DrillContainer so it's an actual container

_How to add more vocabulary_

* Add a .js file to the /src/assets folder.
* * Follow the existing templates of all the other files in the assets folder
* * German first, then a tab delimiter, then the English translation. Any explanation goes with the English: create a constant German first, then a tab delimiter, then the English translation.
* * Conveniently, these two columns can be copy-pasted from an Excel spreadsheet and wrapped in backticks very easily
* Now you need to modify /src/components/DrillAndOptionsContainer.js
* * Import the new file at the top
* * Update the vocabListOptions, following the pattern
* * Update the getVocabListById function with another "else if" 
* That's it!

__________________________________________________________
Alexander Crompton, Berlin, Nov 2017 (alexcromp at gmail.com)

