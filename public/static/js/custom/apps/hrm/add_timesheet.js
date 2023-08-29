// Define form element
const addTimesheetForm = document.getElementById('re_add_timesheet_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addTimesheetValidator = FormValidation.formValidation(
    addTimesheetForm,
    {
        fields: {
            'employee': {
                validators: {
                    notEmpty: {
                        message: 'Employee is required'
                    }
                }
            },
            'hours_worked': {
                validators: {
                    notEmpty: {
                        message: 'Hours worked are required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
                    },

                }
            },
            'sheet_title': {
                validators: {
                    notEmpty: {
                        message: 'Sheet title is required'
                    }
                }
            },
            'date': {
                validators: {
                    notEmpty: {
                        message: 'Date is required'
                    }
                }
            },


        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

// Revalidate Select2 input. For more info, plase visit the official plugin site: https://select2.org/
$("#employee").change(function() {
    // Revalidate the field when an option is chosen
    addTimesheetValidator.revalidateField('employee');
});


// Submit button handler
const TimesheetSubmitButton = document.getElementById('re_add_timesheet_submit');
TimesheetSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addTimesheetValidator) {
        addTimesheetValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TimesheetSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TimesheetSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TimesheetSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TimesheetSubmitButton.disabled = false;

                    // Show popup confirmation
                    // Swal.fire({
                    //     text: "Form has been successfully submitted!",
                    //     icon: "success",
                    //     buttonsStyling: false,
                    //     confirmButtonText: "Ok, got it!",
                    //     customClass: {
                    //         confirmButton: "btn btn-primary"
                    //     }
                    // });

                    addTimesheetForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

function deleteTimesheet(id) {
    const button = document.getElementById('delete_timesheet_btn_' + id);

    Swal.fire({
        html: `Are you sure you want to delete this timesheet?`,
        icon: "question",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: 'Nope, cancel it',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: 'btn btn-primary'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("timesheets/delete/" + id);
        }
    });
}
