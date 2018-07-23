export function actionsToList(actions) {
    return actions.map(a => {
        return {key: a.key, ...a.payload.val()};
    });
}

export function roundToSec(millisec) {
    return Math.round(millisec / 1000) * 1000;
}
