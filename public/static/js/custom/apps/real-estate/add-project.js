// Define form element
const form = document.getElementById('kt_realestate_add_project_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var validator = FormValidation.formValidation(
    form,
    {
        fields: {
            project_title: {
                validators: {
                    notEmpty: {
                        message: 'project title is required'
                    }
                }
            },
            project_description: {
                validators: {
                    notEmpty: {
                        message: 'project description is required'
                    }
                }
            },
            project_logo: {
                validators: {
                    notEmpty: {
                        message: 'project logo is required'
                    }
                }
            },

            category: {
                validators: {
                    notEmpty: {
                        message: 'project category is required'
                    }
                }
            },

            location: {
                validators: {
                    notEmpty: {
                        message: 'project location is required'
                    }
                }
            },
            city: {
                validators: {
                    notEmpty: {
                        message: 'project city is required'
                    }
                }
            },
            country: {
                validators: {
                    notEmpty: {
                        message: 'project country is required'
                    }
                }
            },

            contact_name: {
                validators: {
                    notEmpty: {
                        message: 'contact name is required'
                    }
                }
            },
            contact_email: {
                validators: {
                    notEmpty: {
                        message: 'contact email is required'
                    }
                }
            },
            contact_phone: {
                validators: {
                    notEmpty: {
                        message: 'contact phone is required'
                    }
                }
            },

            project_images: {
                validators: {
                    notEmpty: {
                        message: 'project images is required'
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
$(form.querySelector('[name="project_title"]')).on('change', function () {
    // Revalidate the field when an option is chosen
    validator.revalidateField('project_title');
});

$(form.querySelector('[name="category"]')).on('change', function () {
    // Revalidate the field when an option is chosen
    validator.revalidateField('category');
});

$(form.querySelector('[name="city"]')).on('change', function () {
    // Revalidate the field when an option is chosen
    validator.revalidateField('city');
});


$(form.querySelector('[name="country"]')).on('change', function () {
    // Revalidate the field when an option is chosen
    validator.revalidateField('country');
});

// Submit button handler
const submitButton = document.getElementById('kt_realestate_add_project_submit');
submitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (validator) {
        validator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                submitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                submitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    submitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    submitButton.disabled = false;

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
                    $("#kt_realestate_add_project_form").submit()
                    //form.submit(); // Submit form
                }, 2000);
            }
        });
    }
});
