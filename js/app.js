
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
      expSentenceTxt: 'expSentenceTxt'
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
    },
    
    // Update UI by populating the card
    updateCard: () => {

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
    addCard: () => {

      cardsData.cards.word.push(document.getElementById(DOMItems.wordInput).value);
      cardsData.cards.transWord.push(document.getElementById(DOMItems.transWordInput).value);
      cardsData.cards.expSentence.push(document.getElementById(DOMItems.expSentenceInput).value);

      UICtrl.clearFields();

      console.log(cardsData.cards);
    }
  }

})(UIcontroller);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP CONTROLLER

const AppController = ((studyCtrl, UICtrl) => {

  const DOMItems = UICtrl.getDOMItems;

  // Listen to the DOM
  const addEventListeners = () => {

    document.getElementById(DOMItems.saveBt).addEventListener('click', studyCtrl.addCard);

    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.whitch === 13 ) {
        studyCtrl.addCard();
      }
    });

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
