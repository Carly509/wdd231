// DOM elements
const spotlightContainer = document.getElementById('spotlight-container');

// Sample member data - Replace with your JSON data in a production environment
const members = [
    {
        name: "Riverside Cafe",
        logo: "img/members/riverside-cafe.png",
        phone: "(555) 234-5678",
        address: "456 River Lane, Anytown",
        website: "https://www.riversidecafe.example",
        membershipLevel: "gold"
    },
    {
        name: "Tech Solutions Inc.",
        logo: "img/members/tech-solutions.png",
        phone: "(555) 345-6789",
        address: "789 Tech Park, Anytown",
        website: "https://www.techsolutions.example",
        membershipLevel: "gold"
    },
    {
        name: "Green Thumb Landscaping",
        logo: "img/members/green-thumb.png",
        phone: "(555) 456-7890",
        address: "101 Garden Way, Anytown",
        website: "https://www.greenthumb.example",
        membershipLevel: "silver"
    },
    {
        name: "Smith & Associates Law",
        logo: "img/members/smith-law.png",
        phone: "(555) 567-8901",
        address: "222 Legal Avenue, Anytown",
        website: "https://www.smithlaw.example",
        membershipLevel: "silver"
    },
    {
        name: "Bright Future Financial",
        logo: "img/members/bright-future.png",
        phone: "(555) 678-9012",
        address: "333 Finance Boulevard, Anytown",
        website: "https://www.brightfuture.example",
        membershipLevel: "gold"
    }
];

// Get gold and silver members
function getPremiumMembers() {
    return members.filter(member =>
        member.membershipLevel === "gold" || member.membershipLevel === "silver"
    );
}

// Randomly select members for spotlight
function getRandomSpotlights(count = 3) {
    const premiumMembers = getPremiumMembers();

    // Shuffle array
    const shuffled = [...premiumMembers].sort(() => 0.5 - Math.random());

    // Get first 'count' elements or all if there are fewer than 'count'
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Display spotlight members
function displaySpotlights() {
    // Clear container
    spotlightContainer.innerHTML = "";

    // Get random members
    const spotlightMembers = getRandomSpotlights();

    // Create spotlight cards
    spotlightMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';

        card.innerHTML = `
            <div class="spotlight-logo">
                <img src="${member.logo}" alt="${member.name} logo">
            </div>
            <h3>${member.name}</h3>
            <div class="spotlight-details">
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <p><span class="membership-level ${member.membershipLevel}">${member.membershipLevel.charAt(0).toUpperCase() + member.membershipLevel.slice(1)} Member</span></p>
            </div>
            <a href="${member.website}" class="website" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

// Initialize spotlights on page load
document.addEventListener('DOMContentLoaded', function() {
    displaySpotlights();
});
