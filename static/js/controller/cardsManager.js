
import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            console.log(content)
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
            // domManager.addEventListener(
            //     `.card-add[data-board-id="${boardId}"]`,
            //     'click',
            //     addCardButtonHandler);}
    },
};

function deleteButtonHandler(clickEvent) {
    dataHandler.deleteCard(cardId).then();
    let deletedCard = document.querySelector(`.card[data-card-id="${card.id}"]`);
    deletedCard.remove();
}


// function addCardButtonHandler(clickEvent) {
//     const boardId = clickEvent.target.dataset.boardId;
//     cardsManager.loadCards(boardId);}
