export function openSupportChat() {
    // eslint-disable-next-line
    try {
        window.Intercom('show');
    }
    catch (e) {
        console.error(e);
    }
}
