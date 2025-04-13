const API_KEY = 'sk-icAT67fbda67d99129764';
const BASE_URL = 'https://perenual.com/api/v2/species-list';

export const PlantAPI = {
    async getPlants() {
        try {
            const response = await fetch(
                `${BASE_URL}?key=${API_KEY}&indoor=1`,
                { method: 'GET' }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch plants');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching plants:', error);
            throw error;
        }
    },

    async getPlantById(id) {
        try {
            const response = await fetch(
                `${BASE_URL}?key=${API_KEY}&id=${id}`,
                { method: 'GET' }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch plant details');
            }

            const data = await response.json();
            return data.data[0];
        } catch (error) {
            console.error('Error fetching plant details:', error);
            throw error;
        }
    },

    createPlantCard(plant) {
        return `
            <div class="plant-card" data-id="${plant.id}">
                <div class="plant-card__image-container">
                    <img src="${plant.default_image?.thumbnail || 'images/plant-placeholder.jpg'}"
                         alt="${plant.common_name}"
                         class="plant-card__image"
                         loading="lazy">
                </div>
                <div class="plant-card__content">
                    <h3 class="plant-card__title">${plant.common_name}</h3>
                    <p class="plant-card__scientific-name">${plant.scientific_name?.[0] || 'Scientific name not available'}</p>
                    <button class="btn btn-primary"
                            onclick="showPlantDetails(${plant.id})">
                        Learn More
                    </button>
                </div>
            </div>
        `;
    },

    createPlantModalContent(plant) {
        return `
            <div class="plant-modal">
                <img src="${plant.default_image?.regular_url || 'images/plant-placeholder.jpg'}"
                     alt="${plant.common_name}"
                     class="plant-modal__image">
                <div class="plant-modal__content">
                    <h2>${plant.common_name}</h2>
                    <p class="plant-modal__scientific-name">
                        ${plant.scientific_name?.[0] || 'Scientific name not available'}
                    </p>
                    <div class="plant-modal__details">
                        ${plant.family ? `<p><strong>Family:</strong> ${plant.family}</p>` : ''}
                        ${plant.genus ? `<p><strong>Genus:</strong> ${plant.genus}</p>` : ''}
                        ${plant.species_epithet ? `<p><strong>Species:</strong> ${plant.species_epithet}</p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
};
