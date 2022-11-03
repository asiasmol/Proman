import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
let saveButton = document.getElementById('save-button')


//
// domManager.addEventListener(
//                 `.title-board[data-board-id="${board.id}"]`,
//                 "click", log);



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
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(
                `#title-board[data-board-id="${board.id}"]`,
                "dblclick", changeTitle
                );
            // domManager.addEventListener(
            //     `#title-board[data-board-id="${board.id}"]`,
            //     "click", HideCards
            //     );
        }
    },
};


function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}
// function HideCards(clickEvent) {
//     const boardId = clickEvent.target.dataset.boardId;
//     cardsManager.loadCards(boardId);
// }

function changeTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let newName = prompt("new name table?")
    dataHandler.updateTitleBoard([newName,boardId])
    location.reload(true)
}