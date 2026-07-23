// Simple function to extract profile data from a webpage
function extractProfileData() {
  let candidateName = "";
  let candidateTitle = "";

  // Check if we are on LinkedIn and grab elements (Note: LinkedIn changes classes often)
  if (window.location.href.includes("linkedin.com/in/")) {
    candidateName = document.querySelector(".text-heading-xlarge")?.innerText || "Name not found";
    candidateTitle = document.querySelector(".text-body-medium")?.innerText || "Title not found";
  } else {
    // Fallback generic selector for other sites
    candidateName = document.querySelector("h1")?.innerText || "Unknown Profiles";
    candidateTitle = document.querySelector("h2")?.innerText || "Unknown Title";
  }

  // Send the extracted data back to the extension UI
  chrome.runtime.sendMessage({
    action: "PROFILE_EXTRACTED",
    data: {
      name: candidateName.trim(),
      title: candidateTitle.trim(),
      url: window.location.href
    }
  });
}

// Run the extraction script when the extension requests it
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "TRIGGER_EXTRACTION") {
    extractProfileData();
  }
});