import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {columnManager} from "./columnManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[data-status-id="${card.status_id}"][data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card-add[data-board-id="${boardId}"]`,
                "click",
                addNewCard
            );
        }
    },
};

async function addNewCard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const statusId = document.querySelector(`.board-column-content[data-board-id="${boardId}"]`).dataset.statusId
    let nameColumn = prompt("New card title: ")
    await dataHandler.createNewCard(boardId, statusId, nameColumn)
    const bodyBoards = document.querySelector(`.column[data-board-id="${boardId}"]`)
    bodyBoards.innerHTML = ''
    await columnManager.loadColumn(boardId)
    await cardsManager.loadCards(boardId)
}

