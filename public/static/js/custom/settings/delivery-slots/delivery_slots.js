// function fetchStates() {
//     console.log("publicstaticjscustomsettingsdelivery-slotsdelivery_slots.js");
//     var countryId = document.getElementById("country").value;
//     var stateDropdown = document.getElementById("state");

//     // Clear current options
//     stateDropdown.innerHTML = '<option value="">Select state</option>';

//     // Make AJAX request to fetch states
//     if (countryId) {
//         var url = "/core/settings/locations/get-states";

//         $.ajax({
//             url: url,
//             method: "GET",
//             dataType: "json",
//             data: { country_id: countryId },
//             success: function (response) {
//                 var states = response;
//                 // Populate states dropdown
//                 // Loop through the response data and create an option element for each item
//                 states.forEach((item) => {
//                     console.log(item);
//                     const option = document.createElement("option");
//                     option.value = item.id; // Set the value attribute
//                     option.text = item.name; // Set the displayed text
//                     stateDropdown.appendChild(option); // Add the option to the dropdown
//                 });
//             },
//             error: function (error) {
//                 console.log(error);
//             },
//         });
//     }
// }

// function fetchCities() {
//     var stateID = document.getElementById("state").value;
//     var cityDropdown = document.getElementById("city");

//     // Clear current options
//     cityDropdown.innerHTML = '<option value="">Select city</option>';

//     // Make AJAX request to fetch city
//     if (stateID) {
//         var url = "/core/settings/locations/get-cities";

//         $.ajax({
//             url: url,
//             method: "GET",
//             dataType: "json",
//             data: { state_id: stateID },
//             success: function (response) {
//                 var city = response;
//                 // Keep track of the iterations
//                 var iteration = 0;

//                 // Populate city dropdown
//                 // Loop through the response data and create an option element for each item
//                 city.forEach((item) => {
//                     console.log(item);
//                     // If it's the first iteration, append the "Select All" option
//                     if (iteration === 0) {
//                         const allOption = document.createElement("option");
//                         allOption.value = "all";
//                         allOption.text = "Select All";
//                         cityDropdown.appendChild(allOption);
//                     }
//                     const option = document.createElement("option");
//                     option.value = item.id; // Set the value attribute
//                     option.text = item.name; // Set the displayed text
//                     cityDropdown.appendChild(option); // Add the option to the dropdown
//                     iteration++; // Increase the counter
//                 });

//             },
//             error: function (error) {
//                 console.log(error);
//             },
//         });
//     }
// }

$(document).ready(function () {
    initializeFlatpickr();
});

function initializeFlatpickr() {
    $(".start_time, .end_time").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });
}

$("#delivery_slot_repeater_form").repeater({
    initEmpty: false,

    defaultValues: {
        "text-input": "foo",
    },

    show: function () {
        $(this).slideDown();
        initializeFlatpickr(); // Initialize Flatpickr again
    },

    hide: function (deleteElement) {
        $(this).slideUp(deleteElement);
    },
});
