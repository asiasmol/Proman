export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3,
    buttons: 4
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.column]: columnBuilder,
    [htmlTemplates.buttons]: buttonsBuilder
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
    return `<div class="board-container card" data-board-id="${board.id}">
                <div class="card-header">
                    <div class="d-flex justify-content-center title-board" id="title-board" data-board-id="${board.id}">${board.title}</div>
                </div>
                <div class="column row board-hidden" data-board-id=${board.id}></div>
                <div class="card-footer text-muted d-flex justify-content-center button-container" data-board-id=${board.id}></div>
            </div>
               `;
}

function columnBuilder(column) {
    return `<div class="col card">
                 <div class="card-header d-flex justify-content-center column-title" id="column-title" data-status-id="${column.id}" data-board-id="${column.board_id}">${column.title.toUpperCase()}</div>
                    <div class="card-body" data-board-id="${column.board_id}">
                        <div class="board-column-content" data-status-id="${column.id}" data-board-id="${column.board_id}"></div>
                    </div>
                 </div>
            </div>
            `;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-card-status-id="${card.status_id}" data-board-id='${card.board_id}' data-card-order="${card.card_order}">
                <div class="card-header d-flex justify-content-center" data-card-id="${card.id}">${card.title}</div>
            </div>
           `;
}

function buttonsBuilder(board_id) {
    return `<div class="card-footer text-muted d-flex justify-content-center card-body align-self-end" data-board-id=${board_id}>
                <button class="card-add" data-board-id="${board_id}">Add Card</button>
                <button class="add-column" data-board-id="${board_id}">Add Column</button>
            </div>
            `;
}
