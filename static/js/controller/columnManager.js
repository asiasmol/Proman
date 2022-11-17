import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let columnManager = {
    loadColumn: async function (boardId) {
        const columns = await dataHandler.getColumnsByBoardId(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            domManager.addChild(`.column[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(`.add-column[data-board-id="${boardId}"]`,
                'click', addNewColumn
            );
            await domManager.addEventListener(
                `#column-title[data-status-id="${column.id}"]`,
                "dblclick", changeTitleColumn
            );
        }

    }
}

async function addNewColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const bodyBoards = document.querySelector(`.column[data-board-id="${boardId}"]`)
    let nameColumn = prompt('name for column')
    bodyBoards.innerHTML = ''
    await dataHandler.createNewColumn(nameColumn, boardId)
    await columnManager.loadColumn(boardId)
    await cardsManager.loadCards(boardId)
}


async function changeTitleColumn(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId
    const columnId = clickEvent.target.dataset.statusId;
    const nameColumn = prompt("new name column?")
    await dataHandler.updateTitleColumn(nameColumn, columnId)
    const bodyBoards = document.querySelector(`.column[data-board-id="${boardId}"]`)
    bodyBoards.innerHTML = ''
    await columnManager.loadColumn(boardId)
    await cardsManager.loadCards(boardId)
}