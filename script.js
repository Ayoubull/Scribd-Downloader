 var spans = document.querySelectorAll(".color-change");
        var currentIndex = 0;
        var colors = ["#ab006b", "#6b00ab", "#ab6b00"];

        function changeColor() {
            spans[currentIndex].style.color = colors[currentIndex];
            spans.forEach((span, index) => {
                if (index !== currentIndex) {
                    span.style.color = "rgb(0, 0, 0)";
                }
            });
            currentIndex = (currentIndex + 1) % colors.length;
        }

        setInterval(changeColor, 2000);

// Function to parse document number and title from the current URL
  function parseURLParameters() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('doc') && params.has('title')) {
      const documentNumber = params.get('doc');
      const pageTitle = params.get('title');

      // Update the input field with the title
      const inputLink = `https://www.scribd.com/document/${documentNumber}/${pageTitle}`;
      document.getElementById('scribdLink').value = inputLink;

      // Update the page title without hyphens
      const cleanTitle = pageTitle.replace(/-/g, ' ');
      document.getElementById('pageTitle').textContent = cleanTitle;

      // Update the iframe source
      const iframe = document.getElementById('scribdIframe');
      iframe.src = `https://www.scribd.com/embeds/${documentNumber}/content`;

      // Display the iframe container since the iframe source is set
      document.getElementById('iframeContainer').style.display = 'block';
    }
  }

  // Handle the "Change Link" button click event
  document.getElementById('changeLink').addEventListener('click', () => {
    const inputLink = document.getElementById('scribdLink').value;
    
    if (isValidScribdLink(inputLink)) {
      // Valid Scribd link format
      updateIframeAndWebsiteLink(inputLink);

      // Update the browser's address bar with the new URL
      const { documentNumber, pageTitle } = parseScribdLink(inputLink);
      const myWebsiteLink = `https://scribdvpdf.blogspot.com/?doc=${documentNumber}&title=${pageTitle}`;
      window.history.pushState({}, null, myWebsiteLink); // Update URL without refreshing the page
    } else {
      // Invalid link format or empty input
      displayErrorMessage("This type of doc is not supported or please enter a valid Scribd link.");
    }
  });

  // Function to check if the input is a valid Scribd link
  function isValidScribdLink(inputLink) {
    // Regular expression to match the expected Scribd link format
    const scribdLinkPattern = /^https:\/\/www\.scribd\.com\/document\/\d+\/[\w-]+$/;
    return scribdLinkPattern.test(inputLink);
  }

  // Function to display an error message
  function displayErrorMessage(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
  }

  // Function to parse document number and title from the Scribd link
  function parseScribdLink(inputLink) {
    const parts = inputLink.split('/');
    const documentNumber = parts[parts.length - 2];
    const pageTitle = parts[parts.length - 1];
    return { documentNumber, pageTitle };
  }

  // Function to update the iframe source and custom website link
  function updateIframeAndWebsiteLink(inputLink) {
    const { documentNumber, pageTitle } = parseScribdLink(inputLink);

    // Update the iframe source
    const iframe = document.getElementById('scribdIframe');
    iframe.src = `https://www.scribd.com/embeds/${documentNumber}/content`;

    // Update the page title without hyphens
    const cleanTitle = pageTitle.replace(/-/g, ' ');
    document.getElementById('pageTitle').textContent = cleanTitle;

    // Display the iframe container since the iframe source is set
    document.getElementById('iframeContainer').style.display = 'block';
  }

  // Call the function to parse the URL parameters on page load
  window.onload = parseURLParameters;
