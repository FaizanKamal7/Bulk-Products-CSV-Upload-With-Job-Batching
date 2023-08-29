// Define form element
const addLeavePolicyForm = document.getElementById('re_add_leave_policy_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addLeavePolicyValidator = FormValidation.formValidation(
    addLeavePolicyForm,
    {
        fields: {
            'policy_name': {
                validators: {
                    notEmpty: {
                        message: 'Leave policy title is required'
                    }
                }
            },

            'description': {
                validators: {
                    notEmpty: {
                        message: 'Leave policy description title is required'
                    }
                }
            },
            // 'leave_type_id': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Leave type is required'
            //         }
            //     }
            // },

            // 'allowed': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Allowed value is required'
            //         },
            //         digits: {
            //             message: 'Only whole numbers are allowed'
            //         },
            //
            //     }
            // },
            //
            //
            //
            // 'impact_on_pay': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Impact on pay is required'
            //         },
            //         numeric: {
            //             message: 'Only digits are allowed'
            //         },
            //     }
            // },



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
const LeavePolicySubmitButton = document.getElementById('re_add_leave_policy_submit');
LeavePolicySubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addLeavePolicyValidator) {
        addLeavePolicyValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                LeavePolicySubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                LeavePolicySubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    LeavePolicySubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    LeavePolicySubmitButton.disabled = false;

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

                    addLeavePolicyForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

// Attach an event listener to the form submit button
$('#re_add_leave_policy_submit').on('click', function() {
    var isValid = true;

    // Loop through each repeater item
    $('#re_leave_type_repeater').find('[data-repeater-item]').each(function() {
        var leaveType = $(this).find('#leave_type_id').val();
        var allowed = $(this).find('#allowed').val();
        var impactOnPay = $(this).find('#impact_on_pay').val();

        // Validate each input field
        if (leaveType === '') {
            isValid = false;
            $(this).find('#leave_type_id').addClass('is-invalid');
            $(this).find('#leave_type_id').closest('.fv-row').append('<div class="fv-plugins-message-container"><div class="fv-help-block">'+ 'Leave type is required' +'</div></div>');
        } else {
            $(this).find('#leave_type_id').removeClass('is-invalid');
            $(this).find('#leave_type_id').closest('.fv-row').find('.fv-plugins-message-container').remove();
        }

        if (allowed === '') {
            isValid = false;
            $(this).find('#allowed').addClass('is-invalid');
            $(this).find('#allowed').closest('.fv-row').append('<div class="fv-plugins-message-container"><div class="fv-help-block">'+ 'Allowed is required' +'</div></div>');
        } else {
            $(this).find('#allowed').removeClass('is-invalid');
            $(this).find('#allowed').closest('.fv-row').find('.fv-plugins-message-container').remove();
        }

        if (impactOnPay === '') {
            isValid = false;
            $(this).find('#impact_on_pay').addClass('is-invalid');
            $(this).find('#impact_on_pay').closest('.fv-row').append('<div class="fv-plugins-message-container"><div class="fv-help-block">'+ 'Impact on pay is required' +'</div></div>');
        } else {
            $(this).find('#impact_on_pay').removeClass('is-invalid');
            $(this).find('#impact_on_pay').closest('.fv-row').find('.fv-plugins-message-container').remove();
        }
    });

    // If any of the input fields are invalid, prevent form submission and show an error message
    if (!isValid) {
        $('#form-message').addClass('alert alert-danger');
        $('#form-message').html('Please fill in all required fields.');
        return false;
    } else {
        $('#form-message').removeClass('alert alert-danger');
        $('#form-message').html('');
    }
});




