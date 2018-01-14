
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UI CONTROLLER

const UIcontroller = (() => {

    // Get strings from the DOM
    const DOMItems = {
      saveBt: 'saveBt',
      showTranslationBt: 'showTranslationBt',
      wordInput: 'wordInput',
      transWordInput: 'transWordInput',
      expSentenceInput: 'expSentenceInput',
      wordTitle: 'wordTitle',
      transWordTitle: 'transWordTitle',
      expSentenceTxt: 'expSentenceTxt',
      cardTableBody: 'cardTableBody',
      noCardMsg: 'noCardsMsg',
      table: '.table',
      nextBt: 'nextBt',
      prevBt: 'prevBt',
      currCardIndex: 'currCardIndex',
      allCards: 'allCards',
      counterCont: '.counter-cont'
    };

    // Provide strings from the DOM to the other controllers
    return {
        getDOMItems: DOMItems,

        // Clear New Card field
        clearFields: () => {
          document.getElementById(DOMItems.wordInput).value = '';
          document.getElementById(DOMItems.transWordInput).value = '';
          document.getElementById(DOMItems.expSentenceInput).value = '';
        },

        // Update UI by populating the card
        addCardUI: (currWord, currTransWord, currExpSentence, currItemIndex) => {

        let htmlRow;

        document.getElementById(DOMItems.noCardMsg).setAttribute("style", "display:none");
        document.querySelector(DOMItems.table).setAttribute("style", "display:table");

        htmlRow = `<tr id="row-${currItemIndex}"><td id="wordCell">${currWord}</td><td id="expSentCell">${currExpSentence}</td><td id="transWordCell">${currTransWord}</td><td><a href="#" class="delete-icon" id="item-${currItemIndex}" onClick="AppController.deleteItem(${currItemIndex}, '${currWord}')"><i class="ion-close-circled"></i></a></td></tr>`;

        document.getElementById(DOMItems.cardTableBody).insertAdjacentHTML('beforeend', htmlRow);

      },

      populateCardUI: (arrWord, currWord, currTransWord, currExpSentence) => {
        document.getElementById(DOMItems.allCards).innerText = arrWord.length;
        document.getElementById(DOMItems.currCardIndex).innerText = arrWord.indexOf(currWord) + 1;

        document.getElementById(DOMItems.wordTitle).innerText = currWord;
        document.getElementById(DOMItems.transWordTitle).innerText = currTransWord;
        document.getElementById(DOMItems.expSentenceTxt).innerText = currExpSentence;
      },

      updateSaveBt: () => {
        if (document.getElementById(DOMItems.wordInput).value === "") {
          document.getElementById(DOMItems.saveBt).classList.add("disabled-bt");
        } else {
          document.getElementById(DOMItems.saveBt).classList.remove("disabled-bt");
        }
      },

      deleteCardUI: (currItemIndex, currObjLength) => {
        let el = document.getElementById(`row-${currItemIndex}`);

        if (currObjLength === 0) {
          el.remove();
          document.getElementById(DOMItems.noCardMsg).setAttribute("style", "display:table;margin:0 auto");
          document.querySelector(DOMItems.table).setAttribute("style", "display:none");
          document.getElementById(DOMItems.allCards).innerText = currObjLength;
          document.getElementById(DOMItems.currCardIndex).innerText = 0;
          document.getElementById(DOMItems.wordTitle).innerText = "---";
          document.getElementById(DOMItems.transWordTitle).innerText = "---";
          document.getElementById(DOMItems.expSentenceTxt).innerText = "---";

        } else {
          el.remove();
          document.getElementById(DOMItems.allCards).innerText = currObjLength;
        }
      },

      validateString: (string) => {
        let specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
        for (i = 0; i < specialChars.length;i++) {
          if (string.indexOf(specialChars[i]) > -1) {
            return true;
          }
        }
        return false;
      }
    }

})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDY CONTROLLER

const studyController = ((UICtrl) => {

  const DOMItems = UICtrl.getDOMItems;

  const cardsData = {
    cards: {
      word: [],
      transWord: [],
      expSentence: []
    },
    gotRight: [],
    missed: []
  }

  return {

    // Add new cards
    addCardObj: () => {

      cardsData.cards.word.push(document.getElementById(DOMItems.wordInput).value);
      cardsData.cards.transWord.push(document.getElementById(DOMItems.transWordInput).value);
      cardsData.cards.expSentence.push(document.getElementById(DOMItems.expSentenceInput).value);

      UICtrl.clearFields();

      console.log(cardsData.cards);
    },

    // Delete cards from the object
    deleteCardObj: (currWord) => {
      let currIndex = cardsData.cards.word.indexOf(currWord);

      cardsData.cards.word.splice(currIndex, 1);
      cardsData.cards.transWord.splice(currIndex, 1);
      cardsData.cards.expSentence.splice(currIndex, 1);
      console.log(cardsData.cards);
    },

    cardsDataCards: cardsData.cards,

    // navCards: (direction, currWord) => {
    //   // let i = cardsData.cards.word.indexOf(currWord);
    //   // let currIndex = cardsData.cards.word.indexOf(currWord);
    //   if (direction === "next") {
    //     let i = 0;
    //     // (arrWord, currWord, currTransWord, currExpSentence)
    //     i++;
    //     console.log(i);
    //     UICtrl.populateCardUI(cardsData.cards.word.length, cardsData.cards.word[i], cardsData.cards.transWord[i], cardsData.cards.expSentence[i]);
    //
    //   } else {
    //     currIndex--;
    //     console.log(i);
    //     UICtrl.populateCardUI(cardsData.cards.word.length, cardsData.cards.word[i], cardsData.cards.transWord[i], cardsData.cards.expSentence[i]);
    //   }
    // }

    nextCard: (currIndex) => {
      if (currIndex < cardsData.cards.word.length - 1  && currIndex >= 0) {
        // Increment index
        currIndex++;

        // Display next word in the Array
        UICtrl.populateCardUI(cardsData.cards.word, cardsData.cards.word[currIndex], cardsData.cards.transWord[currIndex], cardsData.cards.expSentence[currIndex]);
      } else {
        currIndex = 0;
        UICtrl.populateCardUI(cardsData.cards.word, cardsData.cards.word[currIndex], cardsData.cards.transWord[currIndex], cardsData.cards.expSentence[currIndex]);
      }
    },

    prevCard: (currIndex) => {
      if (currIndex <= cardsData.cards.word.length - 1  && currIndex >= 1) {
        // Increment index
        currIndex--;

        // Display next word in the Array
        UICtrl.populateCardUI(cardsData.cards.word, cardsData.cards.word[currIndex], cardsData.cards.transWord[currIndex], cardsData.cards.expSentence[currIndex]);

      } else {
        currIndex = cardsData.cards.word.length - 1;
        UICtrl.populateCardUI(cardsData.cards.word, cardsData.cards.word[currIndex], cardsData.cards.transWord[currIndex], cardsData.cards.expSentence[currIndex]);
      }
    }

  }

})(UIcontroller);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP CONTROLLER

const AppController = ((studyCtrl, UICtrl) => {

  const DOMItems = UICtrl.getDOMItems, OBJItems = studyCtrl.cardsDataCards, wordInput = document.getElementById(DOMItems.wordInput);

  const nextNav = () => {
    currIndex = studyCtrl.cardsDataCards.word.indexOf(document.getElementById(DOMItems.wordTitle).innerText);
    studyCtrl.nextCard(currIndex);
  };

  const prevNav = () => {
    currIndex = studyCtrl.cardsDataCards.word.indexOf(document.getElementById(DOMItems.wordTitle).innerText);
    studyCtrl.prevCard(currIndex);
  };

  // Listen to the DOM
  const addEventListeners = () => {

    wordInput.addEventListener('input', UICtrl.updateSaveBt);
    wordInput.addEventListener('focusout', UICtrl.updateSaveBt);

    document.getElementById(DOMItems.saveBt).addEventListener('click', updateCardApp);

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.whitch === 13 ) {
        updateCardApp();
      }
    });

    // Listen to cards navigation
    document.getElementById(DOMItems.nextBt).addEventListener('click', nextNav);
    document.getElementById(DOMItems.prevBt).addEventListener('click', prevNav);

  }

  const updateCardApp = () => {

    if (wordInput.value !== "" && UICtrl.validateString(document.getElementById(DOMItems.wordInput).value) === false && UICtrl.validateString(document.getElementById(DOMItems.transWordInput).value) === false && UICtrl.validateString(document.getElementById(DOMItems.expSentenceInput).value) === false) {

        // Add Card to the Object
        studyCtrl.addCardObj();

        // Add new row to the cards table
        let currWord = OBJItems.word[OBJItems.word.length - 1],
        currTransWord = OBJItems.transWord[OBJItems.transWord.length - 1],
        currExpSentence = OBJItems.expSentence[OBJItems.expSentence.length - 1],
        currItemIndex = OBJItems.word.indexOf(OBJItems.word[OBJItems.word.length - 1]);

        UICtrl.addCardUI(currWord, currTransWord, currExpSentence, currItemIndex);

        UICtrl.populateCardUI(OBJItems.word, OBJItems.word[0], OBJItems.transWord[0], OBJItems.expSentence[0]);

        UICtrl.updateSaveBt();
    } else {
      alert("Please, don't use special characters in any field.");
    }
  }

  return {

    deleteItem: (currItemIndex,currWord) => {

      // Delete from the object
      console.log(`current word is ${currWord}`);
      studyCtrl.deleteCardObj(currWord);
      console.log(`${currItemIndex} was deleted from the object`);

      // Delete from the UI in the cards table
      UIcontroller.deleteCardUI(currItemIndex, OBJItems.word.length);
      console.log(`${currItemIndex} was deleted from the UI`);
      console.log(`The length of the word array is ${OBJItems.word.length}`);

    },

    // Initialize everything. This is the BIG BANG
    init: () => {
      console.log("Application has started. Have a Guinness and have a nice day.");
      addEventListeners();
    }
  }

})(studyController, UIcontroller);


// Remove this and nothing works
AppController.init();








///////////////////////////
// Sugestão de local storage
// localStorage.setItem('nome da chave', JSON.stringify(variavel com as coisas aqui))
// a cada mudança da tela OU quando clicar em saves
