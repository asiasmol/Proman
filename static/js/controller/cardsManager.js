import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
let saveButtonCard = document.querySelector('#save-button-card')


// function save_new_card(boardId) {
//     saveButtonCard.addEventListener('click', async () => {
//         let spaceForCards = document.querySelector(`.board`)
//         spaceForCards.innerHTML = ''
//         let nameNewCard = document.querySelector('#new-card').value
//         await dataHandler.createNewCard([nameNewCard, boardId, 1])
//
//         await cardsManager.loadCards(boardId)
//     })
// }

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
                domManager.addChild(`.board-column-content[data-status-id="${card.status_id}"][data-board-id="${boardId}"]`, content);
                domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
        // save_new_card(boardId)
    },
};

function deleteButtonHandler(clickEvent) {
    // let btn = document.querySelector(".")
}
