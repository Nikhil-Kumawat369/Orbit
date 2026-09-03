document.addEventListener('DOMContentLoaded', () => {
  
  // Helper function to display errors
  function showError(inputEl, errorEl, msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
    inputEl.classList.add('border-error', 'focus:border-error', 'focus:ring-error');
  }

  // Helper function to clear errors
  function clearError(inputEl, errorEl) {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
    inputEl.classList.remove('border-error', 'focus:border-error', 'focus:ring-error');
  }

  // The main validation and submission logic
  function processNameSubmission() {
    // We grab the elements dynamically when the function runs
    const nameInput = document.getElementById('user-name');
    const errorMessage = document.getElementById('error-message');

    // Safety check just in case the elements don't exist yet
    if (!nameInput || !errorMessage) return;

    clearError(nameInput, errorMessage);

    // Get the value and remove leading/trailing whitespace
    const rawName = nameInput.value.trim();

    // 1. Check if empty
    if (!rawName) {
      showError(nameInput, errorMessage, 'Please enter a name.');
      return;
    }

    // 2. Check for spaces inside the word
    if (rawName.includes(' ')) {
      showError(nameInput, errorMessage, 'Please enter a single word with no spaces.');
      return;
    }

    // 3. Check for purely alphabetical characters
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    if (!lettersOnlyRegex.test(rawName)) {
      showError(nameInput, errorMessage, 'Please use only letters for your name.');
      return;
    }

    // 4. Check max length (redundant safeguard to HTML maxlength="15")
    if (rawName.length > 15) {
      showError(nameInput, errorMessage, 'Name must be 15 characters or less.');
      return;
    }

    // If all validation passes, save to localStorage
    localStorage.setItem('name', rawName);
    
    // Optional: Log to console to verify it works
    console.log('Saved to LocalStorage:', localStorage.getItem('name'));
    
    // Trigger navigation to the next screen here
    // window.location.href = '/next-page.html';
  }

  // EVENT DELEGATION: Attach a single click listener to the body
  document.body.addEventListener('click', (e) => {
    // Using closest() ensures we catch the click even if they click the <span> icon inside the button
    const continueBtn = e.target.closest('#continue-btn');
    
    if (continueBtn) {
      e.preventDefault();
      processNameSubmission();
    }
  });

  // EVENT DELEGATION: Attach a single keypress listener to the body
  document.body.addEventListener('keypress', (e) => {
    // Check if the event originated from our input field AND the key pressed was 'Enter'
    if (e.target.id === 'user-name' && e.key === 'Enter') {
      e.preventDefault();
      processNameSubmission();
    }
  });

});