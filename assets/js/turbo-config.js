// /assets/js/turbo-config.js
document.addEventListener("turbo:load", function() {
  console.log("Page loaded with Turbo!");
  // This function runs whenever a new page is loaded via Turbo
});

// Before content changes
document.addEventListener("turbo:before-render", function() {
  // Very minimal state change
  document.body.classList.add("content-changing");
});

// After content changes
document.addEventListener("turbo:render", function() {
  // Remove the changing state
  document.body.classList.remove("content-changing");
});

// Make forms work with Turbo
document.addEventListener("turbo:load", function() {
  const forms = document.querySelectorAll('form:not([data-turbo="false"])');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      // For forms that submit to external services
      if (form.method.toLowerCase() === 'get') {
        // Let the browser handle GET forms normally
        return;
      }
      
      // For forms handled by static site services like Formspree
      // This prevents full page reload
      if (form.action && !form.action.startsWith(window.location.origin)) {
        event.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          // Handle success - show a message
          const successMessage = document.createElement('div');
          successMessage.classList.add('form-success');
          successMessage.textContent = "Form submitted successfully!";
          form.parentNode.insertBefore(successMessage, form.nextSibling);
          form.reset();
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
      }
    });
  });
});

// Img loadin
document.addEventListener("turbo:load", function() {
  // Handle image loading
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // If image is already loaded
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      // Set initial state
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      // When image loads
      img.addEventListener('load', function() {
        img.style.opacity = '1';
      });
      
      // Fallback for errors
      img.addEventListener('error', function() {
        img.style.opacity = '0.5'; // Semi-transparent for failed images
      });
    }
  });
});