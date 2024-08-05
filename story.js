document.addEventListener('DOMContentLoaded', function() {
    const redeemForm = document.getElementById('redeem-form');
    const redeemCodeInput = document.getElementById('redeemCode');
    const redeemMessage = document.getElementById('redeem-message');
    const bookSelection = document.getElementById('book-selection');
    const bookOptions = document.getElementById('book-options');
    const getBookButton = document.getElementById('get-book-btn');
    const specialCode = "Py6vm8dLg77NasH";
    let codes = {
        [specialCode]: "valid"
    };
    let credits = 0;

    const firebaseConfig = {
        apiKey: "AIzaSyAT5naQw-awS7j1JaxtXdR9lx5bMrqjnvc",
        authDomain: "powered-studios.firebaseapp.com",
        projectId: "powered-studios",
        storageBucket: "powered-studios.appspot.com",
        messagingSenderId: "796602802130",
        appId: "1:796602802130:web:b638a08075c28485feb20b",
        measurementId: "G-6RJWXQCS6V"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const storage = firebase.storage();

    redeemForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const code = redeemCodeInput.value;
        if (codes[code] === "valid") {
            if (code === specialCode) {
                generateCode();
            }
            if (code !== specialCode) {
                delete codes[code];
            }
            credits++;
            updateCreditsDisplay();
            redeemMessage.textContent = "Code redeemed successfully! Select a book below.";
            bookSelection.style.display = "block";
        } else {
            redeemMessage.textContent = "Invalid or already redeemed code.";
        }
    });

    getBookButton.addEventListener('click', function() {
        const selectedBook = bookOptions.value;
        getBook(selectedBook);
    });

    function updateCreditsDisplay() {
        const creditsDisplay = document.getElementById('credits-display');
        creditsDisplay.textContent = `You have ${credits} credit(s).`;
    }

    function generateCode() {
        const codeLength = 12;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for (let i = 0; i < codeLength; i++) {
            randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        codes[randomCode] = "valid";
        console.log("Generated code:", randomCode);
    }

    async function getBook(bookName) {
        try {
            const bookRef = storage.ref().child(`books/${bookName}.pdf`);
            const url = await bookRef.getDownloadURL();
            window.open(url, '_blank');
            redeemMessage.textContent = "Your book is downloading...";
        } catch (error) {
            redeemMessage.textContent = "Failed to download the book. Please try again.";
        }
    }

    // Generate an initial random code for testing
    generateCode();
});
