"use strict";
const addDriverForm =  document.getElementById('nixus_add_new_driver_form');
const addDriverModel = new bootstrap.Modal(document.querySelector("#nixus_add_new_driver"));
var addDriverValidator = FormValidation.formValidation(
    addDriverForm,
    {
        /*TODO unique validation not working */
        fields:{
            'Employee1': {
                validators: {
                    notEmpty: { message: "Employee  is required" },
                },
            },
            'license_number': {
                validators: {
                    notEmpty: { message: " License Number is required" },
                },
            },
            'license_Document': {
                validators: {
                    notEmpty: { message: "License Document  is required" },
                },
            },
            'license_issue_Date': {
                validators: {
                    notEmpty: { message: "License Issue Date  is required" },
                },
            },
            'license_expiry_Date': {
                validators: {
                    notEmpty: { message: "License Expiry Date is required" },
                },
            },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        },
    
    }
);
$("#Employee").change(function() {
    // Revalidate the field when an option is chosen
    addDriverValidator.revalidateField('vehicle_make');
});
// Submit button handler
const driverSubmitButton = document.getElementById('nixus_add_new_driver_submit');
driverSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addDriverValidator) {
        addDriverValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                driverSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                driverSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                // setTimeout(function () {
                //     // Remove loading indication
                //     driverSubmitButton.removeAttribute('data-kt-indicator');

                //     // Enable button
                //     driverSubmitButton.disabled = false;

                //     // Show popup confirmation
                //     Swal.fire({
                //         text: "Form has been successfully submitted!",
                //         icon: "success",
                //         buttonsStyling: false,
                //         confirmButtonText: "Ok, got it!",
                //         customClass: {
                //             confirmButton: "btn btn-primary"
                //         }
                //     });

                //     addDriverForm.submit(); // Submit form
                // }, 1500);
                addDriverForm.submit(); 
            }
        });
    }
});
const driverCancelButton = document.getElementById('nixus_add_new_driver_cancel');
driverCancelButton.addEventListener("click", function (t) {
    
    t.preventDefault(),
        Swal.fire({
            text: "Are you sure you would like to cancel?",
            icon: "warning",
            showCancelButton: !0,
            buttonsStyling: !1,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, return",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light",
            },
        }).then(function (driverSubmitButton) {
            driverSubmitButton.value
                ? (addDriverForm.reset(), addDriverModel.hide())
                : "cancel" === driverSubmitButton.dismiss &&
                  Swal.fire({
                      text: "Your form has not been cancelled!.",
                      icon: "error",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                          confirmButton: "btn btn-primary",
                      },
                  });
        });
});

const optionFormat = (item) => {
    if (!item.id) {
        return item.text;
    }

    var span = document.createElement('span');
    var template = '';

    template += '<div class="d-flex align-items-center">';
    template += '<img src="' + item.element.getAttribute('data-kt-rich-content-icon') + '" class="rounded-circle h-40px me-3" alt="' + item.text + '"/>';
    template += '<div class="d-flex flex-column">'
    template += '<span class="fs-4 fw-bolder lh-1">' + item.text + '</span>';
    template += '<span class="text-muted fs-5">' + item.element.getAttribute('data-kt-rich-content-subcontent') + '</span>';
    template += '</div>';
    template += '</div>';

    span.innerHTML = template;

    return $(span);
}

// Init Select2 --- more info: https://select2.org/
$('#employee').select2({
    placeholder: "Select an option",
    minimumResultsForSearch: Infinity,
    templateSelection: optionFormat,
    templateResult: optionFormat
});

