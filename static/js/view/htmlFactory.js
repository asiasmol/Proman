export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.column]: columnBuilder
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
    return `<div class="board-container card-header" >
                <div class="card-header">
                    <div class="d-flex justify-content-center title-board" id="title-board" data-board-id="${board.id}">${board.title}</div>
                    <div class="d-flex justify-content-center">
                    <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                    <button class="card-add" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#CardModal" data-board-id="${board.id}">Add Card</button></div>
                </div>
                <div class="column row" data-board-id=${board.id}></div>
             </div>
               `;
}

function columnBuilder(column) {
    return `<div class="col card">
                 <div class="card-header d-flex justify-content-center">${column.title.toUpperCase()}</div>
                    <div class="card-body">
                        <div class="board-column-content" data-status-id="${column.id}" data-board-id="${column.board_id}"></div>
                    </div>
                 </div>
             </div>`;
}

function cardBuilder(card) {
    return `
            <div class="card" data-card-id="${card.id}" data-card-status-id="${card.status_id}" data-board-id='${card.board_id}' data-card-order="${card.card_order}">
                <div class="card-header d-flex justify-content-center" data-card-id="${card.id}">${card.title}</div>
            </div>
           `;
}


