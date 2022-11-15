import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {columnManager} from "./columnManager.js";

let saveButton = document.getElementById('save-button')
let spaceForBoards = document.querySelector('#root')


saveButton.addEventListener('click', async () => {
    let nameBoard = document.querySelector('#new-board').value
    await dataHandler.addBoard(nameBoard)
    spaceForBoards.innerHTML = ''
    await boardsManager.loadBoards()
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
        }
    },
};


async function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    await columnManager.loadColumn(boardId)
    await cardsManager.loadCards(boardId);
}

async function changeTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let newName = prompt("new name table?")
    await dataHandler.updateTitleBoard([newName, boardId])
    spaceForBoards.innerHTML = ''
    await boardsManager.loadBoards()
}