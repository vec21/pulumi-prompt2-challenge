function showNotification(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #333; color: white; padding: 10px; border-radius: 5px;";
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    if (textElement) {
        const text = textElement.innerText;
        navigator.clipboard.writeText(text)
            .then(() => showNotification("Command copied to clipboard!"))
            .catch(() => showNotification("Failed to copy text."));
    }
}

window.onload = function() {
    const path = window.location.pathname;
    if (path.includes("index.html") || path === "/" || path === "") {
        showNotification("Welcome to my journey with Pulumi!");
    }
};