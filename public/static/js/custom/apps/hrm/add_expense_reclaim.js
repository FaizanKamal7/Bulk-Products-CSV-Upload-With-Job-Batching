// Define form element
const addExpenseReclaimForm = document.getElementById('re_add_expense_reclaim_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addExpenseReclaimValidator = FormValidation.formValidation(
    addExpenseReclaimForm,
    {
        fields: {
            'employee_id': {
                validators: {
                    notEmpty: {
                        message: 'Employee is required'
                    }
                }
            },

            'title': {
                validators: {
                    notEmpty: {
                        message: 'Title is required'
                    }
                }
            },
            'currency': {
                validators: {
                    notEmpty: {
                        message: 'Currency is required'
                    }
                }
            },
            'exchange_rate': {
                validators: {
                    notEmpty: {
                        message: 'Exchange Rate is required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
                    }
                }
            },
            'amount': {
                validators: {
                    notEmpty: {
                        message: 'Amount is required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
                    }
                }
            },
            'total_amount': {
                validators: {
                    notEmpty: {
                        message: 'Total Amount is required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
                    }
                }
            },
            'purchase_date': {
                validators: {
                    notEmpty: {
                        message: 'Purchase Date is required'
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
$("#employee_id").change(function() {
    // Revalidate the field when an option is chosen
    addExpenseReclaimValidator.revalidateField('employee_id');
});
$("#currency").change(function() {
    // Revalidate the field when an option is chosen
    addExpenseReclaimValidator.revalidateField('currency');
});
// Submit button handler
const ExpenseReclaimSubmitButton = document.getElementById('re_add_expense_reclaim_submit');
ExpenseReclaimSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addExpenseReclaimValidator) {
        addExpenseReclaimValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                ExpenseReclaimSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                ExpenseReclaimSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    ExpenseReclaimSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    ExpenseReclaimSubmitButton.disabled = false;

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

                    addExpenseReclaimForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});




function deleteExpenseReclaim(id){
    const button = document.getElementById('delete_expense_reclaim_btn_'+id);

        Swal.fire({
            html: `Are you sure you want to delete this department?`,
            icon: "question",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Yes!",
            cancelButtonText: 'Nope, cancel it',
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: 'btn btn-primary'
            }
        }).then((result) =>{
            if (result.isConfirmed){
                window.location.replace("expense-reclaims/delete/"+id);
            }
        });

}
