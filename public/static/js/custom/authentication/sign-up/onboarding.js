// import axios from 'axios';
// const { default: axios } = require("axios");

("use strict");
var KTCreateAccount = (function () {
    var e,
        t,
        i,
        o,
        s,
        r,
        a = [];
    return {
        init: function () {
            (e = document.querySelector("#kt_modal_create_account")) &&
                new bootstrap.Modal(e),
                (t = document.querySelector("#kt_create_account_stepper")),
                (i = t.querySelector("#kt_create_account_form")),
                (o = t.querySelector('[data-kt-stepper-action="submit"]')),
                (s = t.querySelector('[data-kt-stepper-action="next"]')),
                (r = new KTStepper(t)).on("kt.stepper.changed", function (e) {
                    4 === r.getCurrentStepIndex()
                        ? (o.classList.remove("d-none"),
                            o.classList.add("d-inline-block"),
                            s.classList.add("d-none"))
                        : 5 === r.getCurrentStepIndex()
                            ? (o.classList.add("d-none"), s.classList.add("d-none"))
                            : (o.classList.remove("d-inline-block"),
                                o.classList.remove("d-none"),
                                s.classList.remove("d-none"));
                }),
                r.on("kt.stepper.next", function (e) {
                    console.log("stepper.next");
                    var t = a[e.getCurrentStepIndex() - 1];
                    t
                        ? t.validate().then(function (t) {
                            console.log("validated!"),
                                "Valid" == t
                                    ? (e.goNext(), KTUtil.scrollTop())
                                    : Swal.fire({
                                        text: "Sorry, looks like there are some errors detected, please try again.",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-light",
                                        },
                                    }).then(function () {
                                        KTUtil.scrollTop();
                                    });
                        })
                        : (e.goNext(), KTUtil.scrollTop());
                }),
                r.on("kt.stepper.previous", function (e) {
                    console.log("stepper.previous"),
                        e.goPrevious(),
                        KTUtil.scrollTop();
                }),
                a.push(
                    FormValidation.formValidation(i, {
                        fields: {
                            account_type: {
                                validators: {
                                    notEmpty: {
                                        message: "Account type is required",
                                    },
                                },
                            },
                            first_name: {
                                validators: {
                                    notvalidatorsEmpty: {
                                        message: "first name is required",
                                    },
                                },
                            },
                            last_name: {
                                validators: {
                                    notEmpty: {
                                        message: "last name is required",
                                    },
                                },
                            },
                            buisness_name: {
                                validators: {
                                    notEmpty: {
                                        message: "Buisness name is required",
                                    },
                                    async: {
                                        url: "is-unique-vehicle",
                                        type: "get",
                                        data: {
                                            field: "registration_number",
                                            value: function () {
                                                return $(
                                                    '[name="registration_number"]'
                                                ).val();
                                            },
                                        },
                                        message:
                                            "Registration number already exists",
                                        delay: 500,
                                    },
                                },
                            },
                            email: {
                                validators: {
                                    notEmpty: {
                                        message: "Email Adress is required",
                                    },
                                },
                            },
                            password: {
                                validators: {
                                    notEmpty: {
                                        message: "Pasword is required",
                                    },
                                },
                            },
                            confirm_password: {
                                validators: { notEmpty: { message: "" } },
                            },
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: "",
                            }),
                        },
                    })
                ),
                a.push(
                    FormValidation.formValidation(i, {
                        fields: {
                            logo: {
                                // validators: {
                                //     notEmpty: { message: "No File Choosen" },
                                // },
                            },
                            phone_no: {
                                // validators: {
                                //     notEmpty: {
                                //         message: "Phone Number is required",
                                //     },
                                // },
                            },
                            country: {
                                // validators: {
                                //     notEmpty: {
                                //         message: "Country Not Selected",
                                //     },
                                // },
                            },
                            city: {
                                // validators: {
                                //     notEmpty: {
                                //         message: "City Not Selected",
                                //     },
                                // },
                            },
                            state: {
                                // validators: {
                                //     notEmpty: {
                                //         message: "State Not Selected",
                                //     },
                                // },
                            },
                            contact_email: {
                                // validators: {
                                //     notEmpty: {
                                //         message: "Contact Email is Required",
                                //     },
                                // },
                            },
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: "",
                            }),
                        },
                    })
                ),
                a.push(
                    FormValidation.formValidation(i, {
                        fields: {
                            category: {
                                validators: {
                                    notEmpty: {
                                        message: "Category is required",
                                    },
                                },
                            },
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: "",
                            }),
                        },
                    })
                ),
                a.push(
                    FormValidation.formValidation(i, {
                        fields: {
                            card_name: {
                                validators: {
                                    notEmpty: {
                                        message: "Name on card is required",
                                    },
                                },
                            },
                            card_number: {
                                validators: {
                                    notEmpty: {
                                        message: "Card member is required",
                                    },
                                    creditCard: {
                                        message: "Card number is not valid",
                                    },
                                },
                            },
                            card_expiry_month: {
                                validators: {
                                    notEmpty: { message: "Month is required" },
                                },
                            },
                            card_expiry_year: {
                                validators: {
                                    notEmpty: { message: "Year is required" },
                                },
                            },
                            card_cvv: {
                                validators: {
                                    notEmpty: { message: "CVV is required" },
                                    digits: {
                                        message: "CVV must contain only digits",
                                    },
                                    stringLength: {
                                        min: 3,
                                        max: 4,
                                        message:
                                            "CVV must contain 3 to 4 digits only",
                                    },
                                },
                            },
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: "",
                            }),
                        },
                    })
                ),
                o.addEventListener("click", function (e) {
                    a[3].validate().then(function (t) {
                        console.log("validated!"),
                            "Valid" == t
                                ? (e.preventDefault(),
                                    //   (o.disabled = !0),
                                    //   o.setAttribute("data-kt-indicator", "on"),
                                    //   setTimeout(function () {
                                    //         e.submit(),
                                    //       o.removeAttribute("data-kt-indicator"),
                                    //           (o.disabled = !1),
                                    //           r.goNext();
                                    //   }, 2e3))

                                    // Get the form element by its ID

                                    (o.disabled = true),
                                    o.setAttribute("data-kt-indicator", "on"),
                                    setTimeout(function () {
                                        // Submit the form programmatically
                                        var form = document.getElementById(
                                            "kt_create_account_form"
                                        );

                                        form.submit();

                                        o.removeAttribute("data-kt-indicator");
                                        o.disabled = false;
                                        r.goNext();
                                    }, 2e3))
                                : Swal.fire({
                                    text: "Sorry, looks like there are some errors detected, please try again.",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-light",
                                    },
                                }).then(function () {
                                    KTUtil.scrollTop();
                                });
                    });
                }),
                $(i.querySelector('[name="card_expiry_month"]')).on(
                    "change",
                    function () {
                        a[3].revalidateField("card_expiry_month");
                    }
                ),
                $(i.querySelector('[name="card_expiry_year"]')).on(
                    "change",
                    function () {
                        a[3].revalidateField("card_expiry_year");
                    }
                ),
                $(i.querySelector('[name="business_type"]')).on(
                    "change",
                    function () {
                        a[2].revalidateField("business_type");
                    }
                );
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTCreateAccount.init();
});

var _token = $("input[name='_token']").val();
$("#email_address").keyup(function () {
    var email_address = $("#email_address").val();
    $.ajax({
        url: "{{ route('validate_email') }}",
        type: "POST",
        data: {
            _token: _token,
            email_address: email_address,
        },
        success: function (data) {
            if ($.isEmptyObject(data.error)) {
                console.log("unique");
                $("#kt_sign_up_submit").removeAttr("disabled");
                $("#email_alert").addClass("d-none");
            } else {
                console.log("duplicate");
                $("#kt_sign_up_submit").attr("disabled", "disabled");
                $("#email_alert").removeClass("d-none");
            }
        },
    });
});


// config.js

$(document).ready(function () {
    // Make an AJAX request to the Laravel route that returns the config values
    $.get('/api/config', function (data) {
        // Access the Google API key and use it in your JavaScript logic
        var googleApiKey = data.google_key;

        // Now you can use the googleApiKey in your JavaScript code
        // For example, you can use it in your Google Maps API calls
        // Here's a basic example:
        var address_map = new google.maps.Map(document.getElementById('address_map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    });
});

(g => {
    var h, a, k, p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}),
        r = new Set,
        e = new URLSearchParams,
        u = () => h || (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e; // Removed the API key from here
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
        }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
})({
    key: "AIzaSyC45M9bSvmoPH_wfAcwmxCAWCavsUURp3w",
    libraries: "places",
    v: "weekly"
});




var address_map;
var marker;
var searchBox;
var searchInput = document.getElementById('search-location');

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    address_map = new Map(document.getElementById("address_map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    searchBox = new google.maps.places.SearchBox(searchInput);

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            // Clear previous marker if any
            if (marker) {
                marker.setMap(null);
            }

            // Add a new marker at the searched location
            marker = new google.maps.Marker({
                position: place.geometry.location,
                map: address_map, // Fix the property name here
                icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new google.maps.Size(40, 40)
                },
                draggable: true // Make the marker draggable
            });

            // Update the position input with the new marker position
            document.getElementById('latitude').value = place.geometry.location.lat();
            document.getElementById('longitude').value = place.geometry.location.lng();

            // Update position when marker is moved
            marker.addListener('dragend', function (event) {
                document.getElementById('latitude').value = event.latLng.lat();
                document.getElementById('longitude').value = event.latLng.lng();

                // Get the address of the new marker position and update search input
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: event.latLng }, function (results, status) {
                    if (status === 'OK') {
                        if (results[0]) {
                            searchInput.value = results[0].formatted_address;
                        }
                    }
                });
            });
        });

        address_map.fitBounds(bounds);
    });
}


initMap();


function showMap() {
    var address_map = document.getElementById("address_map");
    address_map.style.display = "block";
}

function toggleLocationDiv() {
    var googleMapDiv = document.getElementById("google_map_address_selection");
    var dropdownDiv = document.getElementById("dropdown_address_selection");

    if (googleMapDiv.style.display === "none") {
        // Map view open
        googleMapDiv.style.display = "block";
        dropdownDiv.style.display = "none";
        console.log("inside googleMapDiv.style.display === none");

    } else {
        // drop down view open 
        googleMapDiv.style.display = "none";
        dropdownDiv.style.display = "block";
        document.getElementById('latitude').value = 0;
        document.getElementById('longitude').value = 0;

    }
}

function fetchDeliverySlotsOfCity() {
    fetchAreasWithMultiSelectOption();
    var cityID = document.getElementById("city").value;
    var deliverySlotsDropdown = document.getElementById("delivery_slots");

    // Clear current options
    deliverySlotsDropdown.innerHTML = '<option value="">Select Slot</option>';

    // Make AJAX request to fetch area
    if (cityID) {
        var url = "/core/settings/delivery-slots/get-delivery-slots-of-city";

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
                        deliverySlotsDropdown.appendChild(allOption);
                    }
                    const option = document.createElement("option");
                    option.value = item.id; // Set the value attribute
                    option.text = item.start_time + " - " + item.end_time; // Set the displayed text
                    deliverySlotsDropdown.appendChild(option); // Add the option to the dropdown
                    iteration++; // Increase the counter
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

function fetchAddressAreas() {
    var cityID = document.getElementById("address_city").value;

    var areaDropdown = document.getElementById("address_area");

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

function fetchAddressCities() {
    var stateID = document.getElementById("address_state").value;
    var cityDropdown = document.getElementById("address_city");

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

function fetchAddressStates() {
    var countryId = document.getElementById("address_country").value;
    var stateDropdown = document.getElementById("address_state");

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
