import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
// import {cardsManager} from "./cardsManager.js";

export let columnManager = {
    loadColumn: async function (boardId) {
        const columns = await dataHandler.getColumnsByBoardId(boardId);
        for (let column of columns) {
        const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            domManager.addChild(`.column[data-board-id="${boardId}"]`, content);
        }
    }
}