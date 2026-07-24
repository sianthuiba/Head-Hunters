// Sidebar functionality

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const trigger = document.querySelector(".sidebar-trigger");
    const main = document.querySelector(".main");

    if (!sidebar || !trigger) return;

    trigger.addEventListener("mouseenter", () => {
        sidebar.classList.add("active");

        if (main) {
            main.classList.add("dimmed");
        }
    });

    sidebar.addEventListener("mouseleave", () => {
        sidebar.classList.remove("active");

        if (main) {
            main.classList.remove("dimmed");
        }
    });

});
if (aiSearchForm) {

    aiSearchForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const rawInput = searchInput.value.trim();

        if (!rawInput) return;

        resultsWrapper.innerHTML =
            "<p style='color:#a855f7'>Searching...</p>";

        try {

            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(rawInput)}`
            );

            const data = await response.json();

            if (!data.items || data.items.length === 0) {

                resultsWrapper.innerHTML =
                    "<p style='color:red'>No results found.</p>";

                return;
            }

            const result = data.items[0];

            dossierDynamicContent.innerHTML = `

                <h2>${result.title}</h2>

                <p>
                    <strong>Description:</strong><br>
                    ${result.snippet}
                </p>

                <p>
                    <strong>Official Website:</strong><br>
                    <a href="${result.link}" target="_blank">
                        ${result.link}
                    </a>
                </p>

            `;

            fullDossierModal.classList.add("active");

            resultsWrapper.innerHTML = "";

        } catch (error) {

            console.error(error);

            resultsWrapper.innerHTML =
                "<p style='color:red'>Search failed.</p>";
        }

    });

}
function toggleTranslator() {
  const modal = document.getElementById("translatorModal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

// Seamlessly close the window if clicking the outside background
window.onclick = function(event) {
  const modal = document.getElementById("translatorModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
document.getElementById('aiSearchForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page refresh
    
    const query = document.getElementById('aiSearchInput').value;
    const resultsWrapper = document.getElementById('aiResultsWrapper');

    if (!query) return;

    // Fetch data from your backend API or mock responses
    resultsWrapper.innerHTML = `<p>Searching for <strong>${query}</strong>...</p>`;
    
    // Example placeholder logic:
    setTimeout(() => {
        resultsWrapper.innerHTML = `<div class="result-card">Results for ${query} will appear here.</div>`;
    }, 1000);
});
