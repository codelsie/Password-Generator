// Generate a random password
const generatePassword = () => {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    let charset = "abcdefghijklmnopqrstuvwxyz";
    let password = "";

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
        const randomChar = charset.charAt(Math.floor(Math.random() * charset.length));
        password += randomChar;
    }

    // Display the password
    document.getElementById('password').value = password;
    checkPasswordStrength(password);
};

// Check the strength of the generated password
const checkPasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length > 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+]/.test(password)) {
        strength = "Strong";
    } else if (password.length >= 8) {
        strength = "Medium";
    }

    const strengthText = document.getElementById('strengthText');
    strengthText.textContent = `Strength: ${strength}`;
    strengthText.style.color = (strength === "Strong" ? 'green' : (strength === "Medium" ? 'orange' : 'red'));
};

// Copy password to clipboard using Clipboard API
const copyToClipboard = async () => {
    const passwordField = document.getElementById('password');
    try {
        await navigator.clipboard.writeText(passwordField.value); // Clipboard API
        alert("Password copied to clipboard!");
    } catch (err) {
        console.error('Error copying password to clipboard: ', err);
    }
};

// Add event listeners
document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyToClipboard);
