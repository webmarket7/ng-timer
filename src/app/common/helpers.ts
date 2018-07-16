export function getTimeStamp() {
    return new Date().getTime();
}

export function actionsToList(actions) {
    return actions.map(a => {
        return {key: a.key, ...a.payload.val()};
    });
}
