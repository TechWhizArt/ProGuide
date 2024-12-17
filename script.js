
// function to copy text for multiple text area ............................................................
function copyToClipboard(className) {
    // Get the non-editable element
    const textbox = document.getElementsByClassName(className)[0];

    // Create a temporary input element to copy content
    const tempInput = document.createElement("textarea");
    tempInput.value = textbox.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary element
    document.body.removeChild(tempInput);

    alert("Text copied to clipboard!");
}


// popup functionality ...................................................

function createPopup(id) {
    // Select popup and its elements
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close");

    // Function to open the popup
    function openPopup() {
        popupNode.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    // Function to close the popup
    function closePopup() {
        popupNode.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    // Add event listeners to close the popup
    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);

    // Return the function to open the popup
    return openPopup;
}

// Initialize all popups dynamically
document.querySelectorAll(".popup").forEach((popupElement) => {
    let popupId = `#${popupElement.id}`;
    let popupOpenFunction = createPopup(popupId);

    // Attach the popup open function to buttons with matching data-target
    document.querySelectorAll(`[data-target="${popupId}"]`).forEach((button) => {
        button.addEventListener("click", popupOpenFunction);
    });
});





// for list page functioning...

document.addEventListener('DOMContentLoaded', () => {
    // Select all icons with the class 'box'
    const icons = document.querySelectorAll('.box');
    // Function to reset the color of the button
    function resetButtonColor() {
        icons.forEach(icon => {
            icon.style.backgroundColor = 'cadetblue';
            icon.style.color = 'white';  // Optional: reset text color to black
        });
    }
    // Apply color changes on mousedown, mouseup, touchstart, touchend
    icons.forEach(icon => {
        // Add mousedown event to change color on click
        icon.addEventListener('mousedown', () => {
            icon.style.backgroundColor = 'darkcyan'; // Change background color
            icon.style.color = 'white'; // Optional: change text color
        });
        // Add mouseup event to navigate on release
        icon.addEventListener('mouseup', () => {
            icon.style.backgroundColor = 'cadetblue';
            window.location.href = icon.href; // Navigate to the linked page
        });
        // For touch devices, handle touchstart and touchend
        icon.addEventListener('touchstart', () => {
            icon.style.backgroundColor = 'darkcyan'; // Change background color
            icon.style.color = 'white'; // Optional: change text color
        });
        icon.addEventListener('touchend', () => {
            icon.style.backgroundColor = 'cadetblue';
            window.location.href = icon.href; // Navigate to the linked page
        });
    });
    // Reset button colors when the user navigates back
    window.addEventListener('pageshow', resetButtonColor);
    window.addEventListener('focus', resetButtonColor); // Useful for mobile devices
});
