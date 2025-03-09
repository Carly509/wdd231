// Main navigation mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the membership page
    if (window.location.href.includes('membership.html')) {
        initMembershipSelection();
    }

    // General site functionality
    initMobileMenu();
});

function initMobileMenu() {
    // Add mobile menu toggle functionality here if needed
    // This is a placeholder for future mobile menu implementation
}

function initMembershipSelection() {
    const tierCards = document.querySelectorAll('.tier-card');

    tierCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove 'selected' class from all cards
            tierCards.forEach(c => c.classList.remove('selected'));

            // Add 'selected' class to the clicked card
            this.classList.add('selected');

            // Get the membership tier name
            const tierName = this.querySelector('h3').textContent;

            // Show selection message
            showSelectionMessage(tierName);
        });
    });
}

function showSelectionMessage(tierName) {
    // Remove any existing message
    const existingMessage = document.querySelector('.selection-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const message = document.createElement('div');
    message.className = 'selection-message';
    message.innerHTML = `
        <p>You've selected the <strong>${tierName}</strong> plan. Click the button below to continue with registration.</p>
        <button class="btn primary-btn continue-btn">Continue to Registration</button>
    `;

    // Add event listener to the continue button
    message.querySelector('.continue-btn').addEventListener('click', function() {
        // Simulate redirect to registration form
        alert(`Taking you to registration for ${tierName} plan`);
        // In a real implementation, you would redirect to:
        // window.location.href = 'registration.html?plan=' + encodeURIComponent(tierName);
    });

    // Insert after the tier cards
    const tierCardsContainer = document.querySelector('.tier-cards');
    tierCardsContainer.parentNode.insertBefore(message, tierCardsContainer.nextSibling);

    // Scroll to the message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
