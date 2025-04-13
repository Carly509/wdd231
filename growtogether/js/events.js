export const EventsManager = {
    events: [
        {
            id: 1,
            title: "Spring Planting Workshop",
            date: "2024-04-15",
            time: "10:00 AM - 1:00 PM",
            location: "Community Garden Main Plot",
            description: "Join us for a hands-on workshop where you'll learn essential spring planting techniques. Perfect for beginners and intermediate gardeners.",
            image: "images/hero-1.jpg",
            price: "Free"
        },
        {
            id: 2,
            title: "Urban Composting Masterclass",
            date: "2024-05-01",
            time: "2:00 PM - 4:00 PM",
            location: "Green Learning Center",
            description: "Learn the art of urban composting in this comprehensive masterclass. Discover how to turn your kitchen waste into black gold for your garden.",
            image: "images/hero-2.png",
            price: "$15"
        },
        {
            id: 3,
            title: "Community Seed Exchange",
            date: "2024-05-20",
            time: "11:00 AM - 3:00 PM",
            location: "City Botanical Gardens",
            description: "Bring your saved seeds and exchange them with other gardening enthusiasts! This event includes demonstrations on seed saving techniques.",
            image: "images/hero-1.jpg",
            price: "Free"
        },
        {
            id: 4,
            title: "Summer Garden Maintenance",
            date: "2024-06-10",
            time: "9:00 AM - 12:00 PM",
            location: "Sustainable Living Center",
            description: "Get your garden ready for the summer season! Learn about proper watering techniques, pest management, and pruning methods.",
            image: "images/hero-2.png",
            price: "$20"
        },
        {
            id: 5,
            title: "Kids Garden Adventure Day",
            date: "2024-06-25",
            time: "10:00 AM - 2:00 PM",
            location: "Children's Learning Garden",
            description: "A special event designed for young gardeners! Kids will enjoy planting their own vegetables and learning about insects and pollinators.",
            image: "images/hero-1.jpg",
            price: "$10"
        }
    ],

    async loadEvents() {
        return this.events;
    },

    formatEventDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    createEventElement(event) {
        return `
            <div class="event-card">
                <div class="event-card__image">
                    <img src="${event.image}"
                         alt="${event.title}"
                         loading="lazy">
                </div>
                <div class="event-card__content">
                    <h3 class="event-card__title">${event.title}</h3>
                    <div class="event-card__details">
                        <p><i class="fas fa-calendar"></i> ${this.formatEventDate(event.date)}</p>
                        <p><i class="fas fa-clock"></i> ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    </div>
                    <p class="event-card__description">${event.description}</p>
                    <div class="event-card__footer">
                        <span class="event-card__price">${event.price}</span>
                        <button class="btn btn-primary"
                                onclick="showEventDetails(${event.id})">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    createEventModalContent(event) {
        return `
            <div class="event-modal">
                <h2>${event.title}</h2>
                <div class="event-modal__details">
                    <p><strong>Date:</strong> ${this.formatEventDate(event.date)}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Price:</strong> ${event.price}</p>
                </div>
                <div class="event-modal__description">
                    <p>${event.description}</p>
                </div>
                <button class="btn btn-primary">Register Now</button>
            </div>
        `;
    }
};
