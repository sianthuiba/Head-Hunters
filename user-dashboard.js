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

  // 2. AI Search Form logic
  const aiSearchForm = document.getElementById("aiSearchForm");
  const searchInput = document.getElementById("aiSearchInput");
  const resultsWrapper = document.getElementById("aiResultsWrapper");
  const dossierDynamicContent = document.getElementById("dossierDynamicContent");
  const fullDossierModal = document.getElementById("fullDossierModal");

  const GOOGLE_API_KEY = "YOUR_ACTUAL_API_KEY";
  const GOOGLE_CX = "YOUR_ACTUAL_CX_ID";

  if (aiSearchForm) {
    aiSearchForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const rawInput = searchInput ? searchInput.value.trim() : "";
      if (!rawInput) return;

      if (resultsWrapper) {
        resultsWrapper.innerHTML = "<p style='color:#a855f7'>Scanning public records...</p>";
      }

      // Check if keys are placeholders
      if (GOOGLE_API_KEY === "YOUR_ACTUAL_API_KEY" || GOOGLE_CX === "YOUR_ACTUAL_CX_ID") {
        if (resultsWrapper) {
          resultsWrapper.innerHTML = "<p style='color:red'>Error: Please replace placeholder API keys in your script.</p>";
        }
        return;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(rawInput)}`
        );
        const data = await response.json();

        if (data.error) {
          console.error("API Error:", data.error);
          resultsWrapper.innerHTML = `<p style='color:red'>API Error: ${data.error.message}</p>`;
          return;
        }

        if (!data.items || data.items.length === 0) {
          resultsWrapper.innerHTML = "<p style='color:red'>No results found.</p>";
          return;
        }

        const result = data.items[0];

        // Fallback rendering if modal/dossier elements aren't present in HTML
        if (dossierDynamicContent && fullDossierModal) {
          dossierDynamicContent.innerHTML = `
            <h2>${result.title}</h2>
            <p><strong>Description:</strong><br>${result.snippet}</p>
            <p><strong>Official Website:</strong><br>
              <a href="${result.link}" target="_blank">${result.link}</a>
            </p>
          `;
          fullDossierModal.classList.add("active");
          if (resultsWrapper) resultsWrapper.innerHTML = "";
        } else if (resultsWrapper) {
          // Fallback to display results directly inside the wrapper if modal elements are missing
          resultsWrapper.innerHTML = `
            <div class="result-card" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-top: 10px;">
              <h3 style="margin-bottom: 5px;"><a href="${result.link}" target="_blank" style="color: #a855f7;">${result.title}</a></h3>
              <p style="font-size: 14px; color: #ccc;">${result.snippet}</p>
            </div>
          `;
        }
      } catch (error) {
        console.error("Fetch failure:", error);
        if (resultsWrapper) {
          resultsWrapper.innerHTML = "<p style='color:red'>Search failed. Check console for details.</p>";
        }
      }
    });
  }
});
    setTimeout(() => {
        resultsWrapper.innerHTML = `<div class="result-card">Results for ${query} will appear here.</div>`;
    }, 1000);
});
