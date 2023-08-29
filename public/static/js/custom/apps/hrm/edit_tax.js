// Define form element
const editTaxForm = document.getElementById('re_edit_tax_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editTaxValidator = FormValidation.formValidation(
    editTaxForm,
    {
        fields: {
            'edit_name': {
                validators: {
                    notEmpty: {
                        message: 'Tax class name is required'
                    }
                }
            },

            'edit_amount_percentage': {
                validators: {
                    notEmpty: {
                        message: 'Amount is required'
                    },
                    digits:{
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
const TaxEditSubmitButton = document.getElementById('re_edit_tax_submit');

TaxEditSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editTaxValidator) {
        editTaxValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TaxEditSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TaxEditSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TaxEditSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TaxEditSubmitButton.disabled = false;

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

                    editTaxForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);
function editTax(id) {
    blockUI.block();
    $.ajax({
        url: "taxes/edit/"+id,
        type:"GET",
        success: function (data){
            $("#id").val(data.tax.id);
            $("#edit_name").val(data.tax.name);
            $("#edit_amount_percentage").val(data.tax.amount_percentage);
            $("#re_edit_tax_modal").modal("show");
            blockUI.release();
        },
        error:function (){
            $("#re_edit_tax_modal").modal("hide");
            blockUI.release();
        }
    });
}
