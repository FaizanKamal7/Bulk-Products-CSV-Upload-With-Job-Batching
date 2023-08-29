// Define form element
const addTaxForm = document.getElementById('re_add_tax_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addTaxValidator = FormValidation.formValidation(
    addTaxForm,
    {
        fields: {
            'name': {
                validators: {
                    notEmpty: {
                        message: 'Tax class name is required'
                    }
                }
            },

            'amount_percentage': {
                validators: {
                    notEmpty: {
                        message: 'Amount is required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
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

// Submit button handler
const TaxSubmitButton = document.getElementById('re_add_tax_submit');
TaxSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addTaxValidator) {
        addTaxValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TaxSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TaxSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TaxSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TaxSubmitButton.disabled = false;

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

                    addTaxForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


function deleteTax(id) {
    const button = document.getElementById('delete_tax_btn_' + id);

    Swal.fire({
        html: `Are you sure you want to delete this tax?`,
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
            window.location.replace("taxes/delete/" + id);
        }
    });
}
