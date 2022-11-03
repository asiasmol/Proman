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

// function boardBuilder(board) {
//     // console.log(board)
//     return `<div class="board-container card-header" >
//                 <div class="card-header">
//                     <div class="d-flex justify-content-center">${board.title}</div>
//                     <div class="d-flex justify-content-center">
//                     <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
//                     <button class="">Add Card</button></div>
//                 </div>
//                     <div><table class="table table-bordered table-dark">
//                         <thead>
//                             <tr>
//                                 <th scope="col">New</th>
//                                 <th scope="col">In Progress</th>
//                                 <th scope="col">Testing</th>
//                                 <th scope="col">Done</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr> <th><div class="board" data-board-id=${board.id}>
//                                     </div></th></tr>
//                         </tbody>
//                     </table>
//                     </div>
//              </div>
//                `;
// }


function boardBuilder(board) {
    // console.log(board)
    return `<div class="board-container card-header" >
                <div class="card-header">
                    <div class="d-flex justify-content-center">${board.title}</div>
                    <div class="d-flex justify-content-center">
                    <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                    <button class="">Add Card</button></div>
                </div>
                    
                 
               <div class="container">
                  <div class="row">
                    <div class="col d-flex justify-content-center">
                      New
                    </div>
                    <div class="col order-12 d-flex justify-content-center">
                      In Progress
                    </div>
                    <div class="col order-1 d-flex justify-content-center">
                      Testing
                    </div>
                    <div class="col order-1 d-flex justify-content-center">
                      Done
                    </div>
                  </div>
               </div>
               <div class="board" data-board-id=${board.id}></div>
                 
                  
                   
             </div>
               `;
}

function cardBuilder(card) {
    return `<div class="row">
                <div class="col">
                    <div class="card-body card" data-card-id="${card.id}">${card.title}</div>
                </div>
                <div class="col order-12">
               
                </div>
                <div class="col order-1">
               
                </div>
                <div class="col order-1">
                
                </div>
            </div>
           `;
}


