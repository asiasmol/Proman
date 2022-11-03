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
    console.log(board)
    return `<div class="board-container card-header" >
                <div class="board" data-board-id=${board.id}>${board.title}</div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                <button class="board-toggle"><i className="fas fa-chevron-down"></i></button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

// function boardBuilder(board) {
//     console.log(board)
//     return `<div class="accordion" id="accordionExample">
//                 <div class="board-container">
//                     <div class="card-header" id="headingOne" class="board" data-board-id="${board.id}">
//                             ${board.title}
//                             <button class="btn btn-link" data-board-id="${board.id}" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Show Cards</button>
//                             <div class="board" data-board-id=${board.id}></div>
//                     </div>
//                 </div>
//             </div>`;
// }



// function cardBuilder(card) {
// return `<!--<div class="accordion" id="accordionExample">-->
// <!--                    <div class="card">-->
//                 <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
//                     <div class="card-body" >
//                         <h5 class="card-title" data-card-id="${card.id}">${card.title}</h5>
//                         <div class="card" data-card-id="${card.id}">${card.title}</div>
//                     </div>
//                 </div>
// <!--                   </div>-->
// <!--                </div>-->
// `;
//     }
