// Define form element
const addEmployeeForm = document.getElementById('re_add_employee_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addEmployeeValidator = FormValidation.formValidation(
    addEmployeeForm,
    {
        fields: {
            // required
            'first_name': {
                validators: {
                    notEmpty: {
                        message: 'First name is required'
                    },
                }
            },
            'last_name': {
                validators: {
                    notEmpty: {
                        message: 'Last name is required'
                    }
                }
            },
            'personal_phone_number': {
                validators: {
                    notEmpty: {
                        message: 'Personal phone number is required'
                    },
                    digits: {
                        message: 'Only digits are allowed'
                    },
                }
            },
            'company_email_address': {
                validators: {
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    },
                    notEmpty: {
                        message: 'Company email address is required'
                    }
                }
            },
            'designation': {
                validators: {
                    notEmpty: {
                        message: 'Designation is required'
                    }
                }
            },
            'department[]': {
                validators: {
                    notEmpty: {
                        message: 'Select at least one department'
                    }
                }
            },
            'basic_salary': {
                validators: {
                    notEmpty: {
                        message: 'Basic salary is required'
                    },
                    digits: {
                        message: 'Only digits are allowed'
                    },
                }
            },
            // basic Checks
            'personal_email_address': {
                validators: {
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    },
                }
            },
            'company_phone_number': {
                validators: {
                    digits: {
                        message: 'Only digits are allowed'
                    },
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

// Revalidate
$("#designation").change(function() {
    // Revalidate the field when an option is chosen
    addEmployeeValidator.revalidateField('designation');
});
$("#department").change(function() {
    // Revalidate the field when an option is chosen
    addEmployeeValidator.revalidateField('department[]');
});


// Submit button handler
const employeeSubmitButton = document.getElementById('re_add_employee_submit');
employeeSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addEmployeeValidator) {
        addEmployeeValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                employeeSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                employeeSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    employeeSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    employeeSubmitButton.disabled = false;

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

                    addEmployeeForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
