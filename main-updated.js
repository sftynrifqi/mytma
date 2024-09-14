
// Translation Fallback
function loadTranslation() {
    return fetch('/translation.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Translation file not found, using fallback language');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading translations:', error);
            // Fallback logic: default to English or any other default language here
            return {}; // Empty translation object to prevent app from breaking
        });
}

// Auth Error Handling
function authenticateUser() {
    return fetch('/auth')
        .then(response => {
            if (!response.ok) {
                throw new Error('Authentication failed');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Authentication Error:', error);
            // Handle authentication error, potentially redirect or show an error message
            alert('Authentication failed, please try again later.');
        });
}

// Show Spinner, and Hide after loading
function showSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}

// Main function to initialize the app
function initApp() {
    showSpinner();

    Promise.all([loadTranslation(), authenticateUser()])
        .then(([translations, authData]) => {
            // Initialize the app with translations and authenticated user
            console.log('App initialized with translations and auth data');
            hideSpinner();
        })
        .catch(error => {
            console.error('Error initializing app:', error);
            hideSpinner();
        });
}

// Run the app
initApp();
