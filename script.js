
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

// Initialize the popup
let popup = createPopup("#popup");

// Add event listener to open the popup
document.querySelector("#open-popup").addEventListener("click", popup);