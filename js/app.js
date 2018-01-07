
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
      cardTableBody: 'cardTableBody'
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
      addCardUI: (word, transWord, expSentence) => {

      let htmlRow;

      htmlRow = `<tr><td id="wordCell">${word}</td><td id="expSentCell">${expSentence}</td><td id="transWordCell">${transWord}</td><td><a href="#" class="delete-icon"><i class="ion-close-circled"></i></a></td></tr>`;

      document.getElementById(DOMItems.cardTableBody).insertAdjacentHTML('beforeend', htmlRow);

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

    cardsDataCards: cardsData.cards

  }

})(UIcontroller);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP CONTROLLER

const AppController = ((studyCtrl, UICtrl) => {

  const DOMItems = UICtrl.getDOMItems, OBJItems = studyCtrl.cardsDataCards;

  // Listen to the DOM
  const addEventListeners = () => {

    document.getElementById(DOMItems.saveBt).addEventListener('click', updateCardApp);

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.whitch === 13 ) {
        updateCardApp();
      }
    });

  }

  const updateCardApp = () => {

    // Add Card to the Object
    studyCtrl.addCardObj()

    // Add new row to the cards table
    UICtrl.addCardUI(OBJItems.word[OBJItems.word.length - 1], OBJItems.transWord[OBJItems.transWord.length - 1], OBJItems.expSentence[OBJItems.expSentence.length - 1]);

  }

  // Initialize everything. This is the BIG BANG
  return {
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
