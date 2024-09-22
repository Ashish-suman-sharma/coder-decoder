function generateCipher(key) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    const charPool = "0123456789!@#$%^&*()-_=+{}[]<>?/|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let encodeMap = {};
    let decodeMap = {};

    let shuffledPool = shuffleWithKey(charPool, key);

    for (let i = 0; i < alphabet.length; i++) {
        encodeMap[alphabet[i]] = shuffledPool[i];
        decodeMap[shuffledPool[i]] = alphabet[i];
    }

    return { encodeMap, decodeMap };
}

function shuffleWithKey(charPool, key) {
    let array = charPool.split('');
    let keySum = key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = (keySum + i) % array.length;
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function generateKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

function encodeMessage() {
    const input = document.getElementById("adminInputText").value;
    const key = generateKey(16);
    const { encodeMap } = generateCipher(key);
    let encoded = "";

    for (let char of input) {
        encoded += encodeMap[char] || char;
    }

    encoded += "_" + key;
    document.getElementById("adminOutputText").textContent = encoded;
}
