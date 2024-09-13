// Function to generate a substitution cipher based on a key
function generateCipher(key) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    const charPool = "0123456789!@#$%^&*()-_=+{}[]<>?/|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let encodeMap = {};
    let decodeMap = {};

    // Seeded shuffle based on the key (pseudo-random shuffle)
    let shuffledPool = shuffleWithKey(charPool, key);

    for (let i = 0; i < alphabet.length; i++) {
        encodeMap[alphabet[i]] = shuffledPool[i];
        decodeMap[shuffledPool[i]] = alphabet[i];
    }

    return { encodeMap, decodeMap };
}

// Function to shuffle the characters based on a key
function shuffleWithKey(charPool, key) {
    let array = charPool.split('');
    let keySum = key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = (keySum + i) % array.length;
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

// Function to generate a random key
function generateKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

// Function to encode the message
function encodeMessage() {
    const input = document.getElementById("inputText").value;
    const key = generateKey(8); // Generate random key (8 characters long)
    const { encodeMap } = generateCipher(key); // Generate cipher using the key
    let encoded = "";

    for (let char of input) {
        encoded += encodeMap[char] || char; // Encode or leave the character unchanged
    }

    // Combine the encoded message with the key (separated by '_')
    encoded += "_" + key;

    // Display the encoded message
    document.getElementById("outputText").textContent = encoded;
}

// Function to decode the message
function decodeMessage() {
    const input = document.getElementById("inputText").value;

    // Split the encoded message and the key
    const [encodedMessage, key] = input.split('_');

    if (!key) {
        document.getElementById("outputText").textContent = "Invalid input format!";
        return;
    }

    // Generate cipher using the key
    const { decodeMap } = generateCipher(key);

    // Decode the message using the cipher
    let decodedMessage = "";
    for (let char of encodedMessage) {
        decodedMessage += decodeMap[char] || char; // Decode or leave the character unchanged
    }

    document.getElementById("outputText").textContent = `${decodedMessage}`;
}

// Add event listeners to the input text area for real-time encoding and decoding
document.getElementById("inputText").addEventListener("input", encodeMessage);
document.getElementById("inputText").addEventListener("input", decodeMessage);