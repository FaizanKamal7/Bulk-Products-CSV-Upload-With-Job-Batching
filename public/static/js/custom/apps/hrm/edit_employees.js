//
// Personal Info Form Validations
const addPersonalInfoForm = document.getElementById('re_add_employee_form_personal_info');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addPersonalInfoValidator = FormValidation.formValidation(
    addPersonalInfoForm,
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
                        message: 'Email address is required'
                    }
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

// Submit button handler
const personalInfoSubmitButton = document.getElementById('re_add_employee_personal_info_submit');
personalInfoSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addPersonalInfoValidator) {
        addPersonalInfoValidator.validate().then(function (status) {
            if (status == 'Valid') {
                // Show loading indication
                personalInfoSubmitButton.setAttribute('data-kt-indicator', 'on');
                // Disable button to avoid multiple click
                personalInfoSubmitButton.disabled = true;
                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    personalInfoSubmitButton.removeAttribute('data-kt-indicator');
                    personalInfoSubmitButton.disabled = false;
                    addPersonalInfoForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Employment Form Validations
const addEmploymentForm = document.getElementById('re_add_employee_form_employment');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addEmploymentValidator = FormValidation.formValidation(
    addEmploymentForm,
    {
        fields: {
            // required
            'designation': {
                validators: {
                    notEmpty: {
                        message: 'Designation is required'
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

$("#designation").change(function() {
    // Revalidate the field when an option is chosen
    addEmploymentValidator.revalidateField('designation');
});

// Submit button handler
const employmentSubmitButton = document.getElementById('re_add_employee_employment_submit');
employmentSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addEmploymentValidator) {
        addEmploymentValidator.validate().then(function (status) {
            if (status == 'Valid') {
                // Show loading indication
                employmentSubmitButton.setAttribute('data-kt-indicator', 'on');
                // Disable button to avoid multiple click
                employmentSubmitButton.disabled = true;
                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    employmentSubmitButton.removeAttribute('data-kt-indicator');
                    employmentSubmitButton.disabled = false;

                    addEmploymentForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Salary Form Validations
const addSalaryForm = document.getElementById('re_add_employee_form_salary');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addSalaryValidator = FormValidation.formValidation(
    addSalaryForm,
    {
        fields: {
            // required
            'basic_salary': {
                validators: {
                    notEmpty: {
                        message: 'Basic salary is required'
                    },
                    digits: {
                        message: 'only digits are allowed'
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
// Submit button handler
const SalarySubmitButton = document.getElementById('re_add_employee_salary_submit');
SalarySubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addSalaryValidator) {
        addSalaryValidator.validate().then(function (status) {
            if (status == 'Valid') {
                // Show loading indication
                SalarySubmitButton.setAttribute('data-kt-indicator', 'on');
                // Disable button to avoid multiple click
                SalarySubmitButton.disabled = true;
                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    SalarySubmitButton.removeAttribute('data-kt-indicator');
                    SalarySubmitButton.disabled = false;

                    addSalaryForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

