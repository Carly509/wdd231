import { PlantAPI } from './plantAPI.js';
import { EventsManager } from './events.js';
import { StorageManager } from './storage.js';
import { Modal } from './modal.js';
import { FormManager } from './form.js';
import { RegistrationHandler } from './registration.js';

// DOM Elements
const plantsContainer = document.getElementById('plants-container');
const eventsContainer = document.getElementById('events-container');
const newsletterForm = document.getElementById('newsletter-form');
const loadingSpinner = document.getElementById('loading-spinner');
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

// Initialize components
document.addEventListener('DOMContentLoaded', async () => {
    Modal.init();
    initializeNavigation();
    await loadContent();
    setupEventListeners();
    RegistrationHandler.init();
});

// Navigation
function initializeNavigation() {
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu?.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Loading State Management
function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
}

function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

// Load Content
async function loadContent() {
    try {
        showLoading();

        // Load plants if container exists
        if (plantsContainer) {
            const plants = await PlantAPI.getPlants();
            displayPlants(plants.data);
        }

        // Load events if container exists
        if (eventsContainer) {
            const events = await EventsManager.loadEvents();
            displayEvents(events);
        }
    } catch (error) {
        console.error('Error loading content:', error);
        showError('Failed to load content. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Display Plants
function displayPlants(plants) {
    if (!plantsContainer) return;

    const plantsHTML = plants
        .map(plant => PlantAPI.createPlantCard(plant))
        .join('');

    plantsContainer.innerHTML = plantsHTML || '<p>No plants available.</p>';
}

// Display Events
function displayEvents(events) {
    if (!eventsContainer) return;

    const eventsHTML = events
        .map(event => EventsManager.createEventElement(event))
        .join('');

    eventsContainer.innerHTML = eventsHTML || '<p>No upcoming events.</p>';
}

// Error Handling
function showError(message) {
    const errorHTML = `
        <div class="alert alert-error">
            ${message}
        </div>
    `;

    if (plantsContainer) {
        plantsContainer.innerHTML = errorHTML;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Newsletter Form
    newsletterForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const success = await FormManager.handleSubmit(newsletterForm, async (data) => {
            StorageManager.save('newsletter_subscription', {
                email: data.email,
                date: new Date().toISOString()
            });

            Modal.open(`
                <div class="success-message">
                    <h3>Thank You!</h3>
                    <p>You've successfully subscribed to our newsletter.</p>
                </div>
            `);
        });
    });
}

// Global Functions
window.showPlantDetails = async (plantId) => {
    try {
        const plant = await PlantAPI.getPlantById(plantId);
        Modal.open(PlantAPI.createPlantModalContent(plant));
    } catch (error) {
        console.error('Error showing plant details:', error);
        Modal.open(`
            <div class="error-message">
                <h3>Error</h3>
                <p>Failed to load plant details. Please try again later.</p>
            </div>
        `);
    }
};

window.showEventDetails = (eventId) => {
    const event = EventsManager.events.find(e => e.id === eventId);
    if (event) {
        Modal.open(EventsManager.createEventModalContent(event));
    }
};


export const App = {
    loadContent,
    displayPlants,
    displayEvents,
    showError
};
