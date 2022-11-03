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
        const boards = await dataHandler.getBoards();
        // console.log(boards)
        for (let board of boards) {
            console.log(board)
            const boardBuilder = htmlFactory(htmlTemplates.board);
            console.log(boardBuilder)
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

