document.getElementById('adminCopyButton').addEventListener('click', async () => {
    try {
        const inputText = document.getElementById('adminOutputText').value;
        await navigator.clipboard.writeText(inputText);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy text to clipboard: ', err);
    }
});

document.getElementById('adminInputText').addEventListener('input', encodeMessage);

document.getElementById('theme-toggle-btn').addEventListener('click', () => {
document.body.classList.toggle('dark-theme');
document.body.classList.toggle('light-theme');
const currentTheme = document.body.classList.contains('dark-theme') ? '🌙' : '🌞';
document.getElementById('theme-toggle-btn').textContent = currentTheme;
});

if (!document.body.classList.contains('dark-theme')) {
document.body.classList.add('light-theme');
document.getElementById('theme-toggle-btn').textContent = '🌞';
} else {
document.getElementById('theme-toggle-btn').textContent = '🌙';
}

const hamburger = document.querySelector('.hamburger');
const mobileNavLinks = document.querySelector('.mobile-nav-links');

hamburger.addEventListener('click', () => {
mobileNavLinks.classList.toggle('open');
});
