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

function boardBuilder(board, columns) {
    let columnsContent = columnBuilder(board, columns)
    return `
<section class="board" data-board-id=${board.id}>
    <div class="board-header">
        <div>
            <span class="board-title" data-board-id="${board.id}">${board.title}</span>
        </div>
        <div class="button-container">
            <button class="new-card" data-board-id="${board.id}"> New Card</button>
            <button class="toggle-board-button" data-board-id="${board.id}">&xvee;</button>
            <button class="show-archived-cards" data-board-id="${board.id}">Show Archived Cards</button>
            <button class="delete-board" data-board-id="${board.id}"><i class="fas fa-trash-alt"></i></button>
        </div>
    </div>
    <div class="board-content hide" data-board-id="${board.id}">
        <div class="board-columns" data-board-id="${board.id}">
            ${columnsContent}
            <button class="add-column" data-board-id="${board.id}">+</button>
        </div>
        <div class="archived-cards hide" data-board-id="${board.id}"></div>
    </div>
</section>
`;
}

function cardBuilder(card) {
    return `
    <div class="card" data-card-id="${card.id}" data-column-id="${card['column_id']}">
        <div class="card-title" data-card-id="${card.id}">${card.title}</div>
        <button class="delete-card" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i></button>
        <button class="archive-card archive" data-card-id="${card.id}"><i class="fas fa-archive"></i></button>
    </div>`;

}

