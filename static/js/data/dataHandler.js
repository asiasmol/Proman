export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        return await apiGet("/api/boards/${boardId}");
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitleAndboardIdAndStatusId) {
        console.log(cardTitleAndboardIdAndStatusId)
        return await apiPost(`/api/boards/card/${cardTitleAndboardIdAndStatusId}`)
    },
    updateTitleBoard: async function (boardTitleAndId) {
        return await apiPost(`/api/boards/${boardTitleAndId}`)
    },
    addBoard: async function (boardName) {
        return await apiPost(`/api/boards/add/${boardName}`)
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}


async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiDelete(url) {
}

async function apiPut(url) {
}

async function apiPatch(url) {
}
