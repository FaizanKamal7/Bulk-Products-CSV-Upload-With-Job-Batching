function activate_location(passed_city_name, passed_city_id) {
    console.log(passed_city_name + passed_city_id);
    console.log(typeof passed_city_name + passed_city_id);
    // Remove nested double quotes
    // var modifiedString = passed_city_name+.replaceAll('"{', "{").replaceAll('}"', "}");

    console.log("----------");
    // const city = JSON.parse(modifiedString);

    // // console.log(city);E
    // const arr = Object.entries(city).map(([key, value]) => value);
    // console.log(arr);
    // alert(arr);
    $.ajax({
        url:
            "/core/settings/locations/extract-api-areas-of-city/" +
            passed_city_name +
            "/" +
            passed_city_id,
        type: "GET",
        // success: function (response) {
        //     console.log(response); // Output the response to the browser console
        //     // Example: Display the first element of the array in an HTML element with ID 'result'
        //     $("#result").text(response[0]);
        // },
        // error: function (xhr, status, error) {
        //     // Handle any error that occurs during the request
        //     console.error(error);
        // },
    });

    // // Get the modal element
    // var myModal = document.getElementById("activate_location_modal");
    // // Update the modal's content with the extracted data
    // document.getElementById("cityId").textContent = city.name;

    // // When the modal is about to be shown
    // myModal.addEventListener("show.bs.modal", function (event) {
    //     // Get the button that triggered the modal
    //     var button = event.relatedTarget;

    //     // Extract data from the button's data-* attributes
    //     // var city = button.getAttribute('data-city');
    // });
}

// function toggle(source) {
//     checkboxes = document.getElementsByName("foo");
//     for (var i = 0, n = checkboxes.length; i < n; i++) {
//         checkboxes[i].checked = source.checked;
//     }

function toggle(source) {
    checkboxes = document.getElementsByName("areas[]");
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
