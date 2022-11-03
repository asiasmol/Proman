import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
let saveButton = document.getElementById('save-button')

saveButton.addEventListener('click', () => {
    let nameBoard = document.querySelector('#new-board').value
    let data = {'nameBoard': nameBoard}
    fetch('/api/boards/add',{
        "method": 'POST',
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(data)
    })
    location.reload(true)
})

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards(boardsManager.user);
        this.createBoardButtonListeners(boardsManager.user);
        for (let board of boards) {
            const columns = await dataHandler.getColumnsByBoardId(board.id)
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board, columns);
            domManager.addChild("#root", content);
            this.eventListeners(board, columns)
            await cardsManager.loadCards(board.id);}
    },
    createBoardButtonListeners: function () {
        domManager.addEventListener(
            '.new-board-public',
            "click",
            createBoard
        );
    }
}

async function createPublicBoard() {
    const newBoard = await dataHandler.createBoard();
    const columns = await dataHandler.getColumnsByBoardId(newBoard.id);
    const boardBuilder = htmlFactory(htmlTemplates.board);
    const content = boardBuilder(newBoard, columns);
    domManager.addChild("#root", content);
    boardsManager.eventListeners(newBoard, columns)
    await boardsManager.saveData()
}