
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UI CONTROLLER

const UIcontroller = (() => {

    // Get strings from the DOM
    const DOMItems = {
      saveBt: 'saveBt',
      showTranslationBt: 'showTranslationBt',
      wordInput: 'wordInput',
      transWordInput: 'transWordInput',
      expSentenceInput: 'expSentenceInput'
    };

    // Provide strings from the DOM to the other controllers
    return {
      getDOMItems: DOMItems
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
    addCard: () => {

      let wordVal = document.getElementById('wordInput').value,
      transWordVal = document.getElementById('transWordInput').value,
      expSentenceVal = document.getElementById('expSentenceInput').value;

      cardsData.cards.word.push(wordVal);
      cardsData.cards.transWord.push(transWordVal);
      cardsData.cards.expSentence.push(expSentenceVal);

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
