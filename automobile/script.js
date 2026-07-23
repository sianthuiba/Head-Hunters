function filterCompanies() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Grab title from the h3 tag inside the card
        const nameElement = card.getElementsByTagName('h3')[0];
        const name = nameElement ? nameElement.innerText.toLowerCase() : "";
        
        // Grab all other internal card text descriptors
        const details = card.innerText.toLowerCase();
        
        // Read your dataset filter flag
        const type = card.getAttribute('data-type');

        const matchesSearch = name.includes(searchInput) || details.includes(searchInput);
        const matchesType = typeFilter === 'all' || type === typeFilter;

        if (matchesSearch && matchesType) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}

// OPTIONAL: If you ever want to switch over to loading data from a separate 'companies.json' file, 
// you can uncomment this script below:
/*
fetch('companies.json')
    .then(response => response.json())
    .then(companies => {
        const gridContainer = document.getElementById('company-grid');
        gridContainer.innerHTML = ''; // Clear hardcoded elements
        
        companies.forEach(company => {
            const cardHTML = `
                <div class="card" data-type="${company.badge}">
                    <h3>${company.name}</h3>
                    <span class="badge">${company.badge}</span>
                    <div class="info-row"><span class="label">Headquarters:</span> ${company.headquarters}</div>
                    <div class="info-row"><span class="label">Focus:</span> ${company.focus}</div>
                    <a href="${company.url}" target="_blank" class="btn">Visit Official Website</a>
                </div>
            `;
            gridContainer.innerHTML += cardHTML;
        });
    })
    .catch(error => console.error('Error loading the company data:', error));
*/