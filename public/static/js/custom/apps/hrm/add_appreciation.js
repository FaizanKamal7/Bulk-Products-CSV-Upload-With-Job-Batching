// Define form element
const addAppreciationForm = document.getElementById('re_add_appreciation_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addAppreciationValidator = FormValidation.formValidation(
    addAppreciationForm,
    {
        fields: {
            'employee_id': {
                validators: {
                    notEmpty: {
                        message: 'Employee is required'
                    }
                }
            },
            'amount': {
                validators: {
                    notEmpty: {
                        message: 'Bonus amount is required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
                    },
                }
            },

            'award_id': {
                validators: {
                    notEmpty: {
                        message: 'Award is required'
                    }
                }
            },
            'date': {
                validators: {
                    notEmpty: {
                        message: 'Award date is required'
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
$("#employee_id").change(function () {
    // Revalidate the field when an option is chosen
    addAppreciationValidator.revalidateField('employee_id');
});
$("#award_id").change(function () {
    // Revalidate the field when an option is chosen
    addAppreciationValidator.revalidateField('award_id');
    addAppreciationValidator.revalidateField('amount');
});

// Submit button handler
const AppreciationSubmitButton = document.getElementById('re_add_appreciation_submit');
AppreciationSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addAppreciationValidator) {
        addAppreciationValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                AppreciationSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                AppreciationSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    AppreciationSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    AppreciationSubmitButton.disabled = false;

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

                    addAppreciationForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

// populate amount in filed depending on award type
$("#award_id").change(function (){
    const id = $(this).val();
    $("#amount").val($("#"+id).text());
})


// Delete Record
function deleteAppreciation(id) {
    const button = document.getElementById('delete_appreciation_btn_' + id);

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
            window.location.replace("appreciation/delete/" + id);
        }
    });
}
