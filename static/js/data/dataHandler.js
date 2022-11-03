export let dataHandler = {
    getBoards: async function () {
        return await apiGet(`/api/boards`);
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
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
    createNewCard: async function (boardId, cardTitle) {
        // creates new card, saves it and calls the callback function with its data, statusId needed
        return await apiPost(`/api/boards/${boardId}/add_card`, cardTitle)
    },
    renameCard: async function (cardId, newTitle) {
        return await apiPut(`/api/cards/${cardId}/change_name`, newTitle);
    },
    deleteCard: async function (cardId) {
        await apiDelete(`/api/cards/${cardId}/delete`);
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.status === 200) {
        return response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.status === 200) {
        return response.json();
    }
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: "DELETE",
    });
    if (response.status === 200) {
        return response.json();
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.status === 200) {
        return response.json();
    }
}
