export let domManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML("beforeend", childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    addEventListener(parentIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(parentIdentifier);
        console.log(parent)
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
        } else {
            console.log(parentIdentifier)
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
};
