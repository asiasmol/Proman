import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(
                `.board-column-content[data-column-id="${card.column_id}"]`,
                content
            );
            this.initEventListeners(card);
        }
    },
    initEventListeners: function (card) {
        const cardIdentifier = `.card[data-card-id="${card.id}"]`;
        domManager.addEventListener(
            `.card-title[data-card-id="${card.id}"]`,
            "click",
            editCardNameHandler
        );
        domManager.addEventListener(
            `.delete-card[data-card-id="${card.id}"]`,
            "click",
            deleteButtonHandler
        );
        domManager.addEventListener(
            `.archive-card.archive[data-card-id="${card.id}"]`,
            "click",
            archiveCardHandler
        );
    }
};

function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.currentTarget.dataset.cardId
    dataHandler.deleteCard(cardId)
    clickEvent.currentTarget.parentElement.remove()
}

function editCardNameHandler(clickEvent) {

}

function archiveCardHandler (clickEvent) {

}