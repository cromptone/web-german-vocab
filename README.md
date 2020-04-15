# web-german-vocab

_To use_

* Run ``npm install``

* Run ``npm run build``

* Run ``npm run start`` for dev

Demo: https://www.vocabdrills.com
_______________________________



_Introduction_

* This is a program I created to help learn German vocabulary.


_Description of drills_

* Word cloud: For a given vocab list, the user must write the German version perfectly for all the words in the list. The user can make errors without penalty.
* With prompts: For a given vocab list, the user is prompted with an English word, and given one chance to write the German version.

_Ideas for improvement_
* More vocabulary!
* Allow users to choose to be drilled on fewer words (i.e., a subset) or more words (i.e., an intersection of several sets)
* Put a button that allows users to continue being drilled on the vocabulary they previously missed
* Refactor DrillContainer so it's an actual container

_How to add more vocabulary_

* Add a .js file to the ``/src/assets`` folder.
  * Follow the existing templates of all the other files in the assets folder. Create and export a constant that's a big, long, multi-line string enclosed in back-ticks.
  * Each line is German first, then a tab delimiter, then the English translation.
  * Any explanation (e.g., n-declension, synonyms) goes with the English.
  * Conveniently, these two columns can be copy-pasted from an Excel spreadsheet and wrapped in backticks very easily
* Modify ``/src/components/DrillAndOptionsContainer.js``
  * Import the new constant at the top
  * Update ``vocabListOptions`` (``text`` is the user-facing name on the button, ``id`` is the list ID)
  * Update the ``rawVocabListById`` object (the key is the id from ``vocabListOptions``, the value is the imported constant)
* That's it!

__________________________________________________________
Alexander Crompton, Berlin, Nov 2017 (alexcromp at gmail.com)

