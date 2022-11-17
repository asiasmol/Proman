import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {columnManager} from "./columnManager.js";

let saveNewBoardBtn = document.getElementById('save-button')
let spaceForBoards = document.querySelector('#root')

// refaktor jutro
saveNewBoardBtn.addEventListener('click', async () => {
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
                `.title-board[data-board-id="${board.id}"]`,
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
    const board = document.querySelector(`.board-container[data-board-id="${boardId}"]`);
    const boardBody = board.children[1];
    const buttonsBody = document.querySelector(`.button-container[data-board-id="${boardId}"]`)
    buttonsBody.innerHTML = ``;
    boardBody.classList.toggle('board-hidden');
    if (!boardBody.classList.contains('board-hidden')) {
        boardBody.innerHTML = ``;
        const buttonBuilder = htmlFactory(htmlTemplates.buttons);
        const contentBtn = buttonBuilder(boardId);
        domManager.addChild(`.button-container[data-board-id="${boardId}"]`, contentBtn)
        await columnManager.loadColumn(boardId);
        await cardsManager.loadCards(boardId);
    }
}

async function changeTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let nameTable = prompt("new name table?")
    await dataHandler.updateTitleBoard(nameTable, boardId)
    spaceForBoards.innerHTML = ''
    await boardsManager.loadBoards()
}

