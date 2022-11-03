export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    // console.log(board)
    return `<div class="board-container card-header" >
                <div class="card-header d-flex justify-content-center">${board.title}
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                <button class="card-add" data-board-id="${board.id}">Add Card</button></div>
                
                <div class="card-header board card-group card" data-board-id=${board.id}>
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}
