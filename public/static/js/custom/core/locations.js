function fetchStates(...parameters) {
    var countryId = "";
    var stateDropdown = "";
    var stateDropdown = document.getElementById("state");

    if (parameters.length >= 1) {
        var selectElement = parameters[0];
        // Find the parent repeater item to get its index
        var repeaterItem = $(selectElement).closest('[data-repeater-item]');
        var index = repeaterItem.index();

        // Generate the unique ID for the country dropdown using the index
        var countryDropdownId = 'country_' + index;

        // Get the selected value of the country dropdown
        var countryId = $(selectElement).val();

        // Get the ID of the state dropdown using the generated ID
        var stateDropdownId = 'state_' + index;
        var selectedStateValue = $('#' + stateDropdownId).val();

        // Now you can use the generated IDs and selected values for whatever you need
        console.log('Generated ID for country dropdown:', countryDropdownId);
        console.log('Selected country value:', countryId);
        console.log('Generated ID for state dropdown:', stateDropdownId);
        console.log('Selected state value:', selectedStateValue);

    } else {
        var countryId = document.getElementById("country").value;
        var stateDropdown = document.getElementById("state");
        console.log("Inside IF " + countryId.value + " " + stateDropdown);

    }


    // Clear current options
    stateDropdown.innerHTML = '<option value="">Select state</option>';

    // Make AJAX request to fetch states
    if (countryId) {
        var url = "/core/settings/locations/get-states";

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: { country_id: countryId },
            success: function (response) {
                var states = response;
                // Populate states dropdown
                // Loop through the response data and create an option element for each item
                states.forEach((item) => {
                    console.log(item);
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.name; // Set the displayed text
                    stateDropdown.appendChild(option); // Add the option to the dropdown
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}

function fetchStatesWithMultiSelectOption() {
    var countryId = document.getElementById("country").value;
    var stateDropdown = document.getElementById("state");

    // Clear current options
    stateDropdown.innerHTML = '<option value="">Select state</option>';

    // Make AJAX request to fetch states
    if (countryId) {
        var url = "/core/settings/locations/get-states";

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: { country_id: countryId },
            success: function (response) {
                // Keep track of the iterations
                var iteration = 0;

                // Populate city dropdown
                // Loop through the response data and create an option element for each item
                response.forEach((item) => {
                    // If it's the first iteration, append the "Select All" option
                    if (iteration === 0) {
                        const allOption = document.createElement("option");
                        allOption.value = "all";
                        allOption.text = "Select All";
                        stateDropdown.appendChild(allOption);
                    }
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.name; // Set the displayed text
                    stateDropdown.appendChild(option); // Add the option to the dropdown
                    iteration++; // Increase the counter
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}

function fetchCities() {
    var stateID = document.getElementById("state").value;
    var cityDropdown = document.getElementById("city");

    // Clear current options
    cityDropdown.innerHTML = '<option value="">Select city</option>';

    // Make AJAX request to fetch city
    if (stateID) {
        var url = "/core/settings/locations/get-cities";

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: { state_id: stateID },
            success: function (response) {
                var city = response;
                // Populate city dropdown
                // Loop through the response data and create an option element for each item
                city.forEach((item) => {
                    console.log(item);
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.name; // Set the displayed text
                    cityDropdown.appendChild(option); // Add the option to the dropdown
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}

function fetchCitiesWithMultiSelectOption() {
    var stateID = document.getElementById("state").value;
    var cityDropdown = document.getElementById("city");
    // Clear current options
    cityDropdown.innerHTML = '<option value="">Select city</option>';

    // Make AJAX request to fetch city
    if (stateID) {
        var url = "/core/settings/locations/get-cities";

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: { state_id: stateID },
            success: function (response) {
                // Keep track of the iterations
                var iteration = 0;
                // Populate city dropdown
                // Loop through the response data and create an option element for each item
                response.forEach((item) => {
                    // If it's the first iteration, append the "Select All" option
                    if (iteration === 0) {
                        const allOption = document.createElement("option");
                        allOption.value = "all";
                        allOption.text = "Select All";
                        cityDropdown.appendChild(allOption);
                    }
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.name; // Set the displayed text
                    cityDropdown.appendChild(option); // Add the option to the dropdown
                    iteration++; // Increase the counter
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}

function fetchAreas() {
    var cityID = document.getElementById("city").value;

    var areaDropdown = document.getElementById("area");

    // Clear current options
    areaDropdown.innerHTML = '<option value="">Select area</option>';

    // Make AJAX request to fetch area
    if (cityID) {
        var url = "/core/settings/locations/get-areas";

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: { city_id: cityID },
            success: function (response) {
                var area = response;
                // Populate city dropdown
                // Loop through the response data and create an option element for each item
                area.forEach((item) => {
                    console.log(item);
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.name; // Set the displayed text
                    areaDropdown.appendChild(option); // Add the option to the dropdown
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}

function fetchAreasWithMultiSelectOption() {
    var cityID = document.getElementById("city").value;

    var areaDropdown = document.getElementById("area");

    // Clear current options
    areaDropdown.innerHTML = '<option value="">Select area</option>';

    // Make AJAX request to fetch area
    if (cityID) {
        var url = "/core/settings/locations/get-areas";

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: { city_id: cityID },
            success: function (response) {
                // Keep track of the iterations
                var iteration = 0;

                // Populate city dropdown
                // Loop through the response data and create an option element for each item
                response.forEach((item) => {
                    // If it's the first iteration, append the "Select All" option
                    if (iteration === 0) {
                        const allOption = document.createElement("option");
                        allOption.value = "all";
                        allOption.text = "Select All";
                        areaDropdown.appendChild(allOption);
                    }
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.name; // Set the displayed text
                    areaDropdown.appendChild(option); // Add the option to the dropdown
                    iteration++; // Increase the counter
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}
