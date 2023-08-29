//Start Select 2 Rich Content JS
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
//End Select 2 Rich Content JS
//Start Edit Select 2 Rich Content JS
function edit_select() {
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
    $('#edit_employee').select2({
        placeholder: "Select an option",
        minimumResultsForSearch: Infinity,
        templateSelection: optionFormat,
        templateResult: optionFormat
    });
}

//End Edit Select 2 Rich Content JS


// Define form element
const addDeductionForm = document.getElementById('re_add_deduction_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addDeductionValidator = FormValidation.formValidation(
    addDeductionForm,
    {
        fields: {
            'date': {
                validators: {
                    notEmpty: {
                        message: 'date is required'
                    }
                }
            },
            'employee': {
                validators: {
                    notEmpty: {
                        message: 'Employee is required'
                    }
                }
            },
            'amount': {
                validators: {
                    notEmpty: {
                        message: 'amount is required'
                    },
                    digits: {
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

$("#employee").change(function () {
    // Revalidate the field when an option is chosen
    addDeductionValidator.revalidateField('employee');
});


// Submit button handler
const DeductionSubmitButton = document.getElementById('re_add_deduction_submit');
DeductionSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addDeductionValidator) {
        addDeductionValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                DeductionSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                DeductionSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    DeductionSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    DeductionSubmitButton.disabled = false;

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

                    addDeductionForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target, {
    message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
});

function editDeduction(id, employee_id) {
    blockUI.block();
    $.ajax({
        url: "deductions/edit/" + id,
        type: "GET",
        success: function (data) {
            $("#id").val(data.deduction.id);
            $("#edit_amount").val(data.deduction.amount);
            $("#edit_description").text(data.deduction.description);
            $("#edit_date").val(data.deduction.date);
            if (data.deduction.deducted === 1) {
                $("#deducted").prop("checked", true);
            } else {

                $("#deducted").prop("checked", false);
            }

            if (data.deduction.status === "Approved") {
                $("#status").prop("checked", true);
            } else {
                $("#status").prop("checked", false);
            }

            for (var employ in data.employees) {
                if (employee_id === data.employees[employ].id) {
                    console.log("working")
                    $("#edit_employee").append('<option selected value="' + data.employees[employ].id + '" data-kt-rich-content-subcontent="' + data.employees[employ].company_email_address + '" data-kt-rich-content-icon="http://127.0.0.1:8000/media/avators/300-1.jpg">' + data.employees[employ].first_name + ' ' + data.employees[employ].last_name + '</option>')

                } else {
                    $("#edit_employee").append('<option value="' + data.employees[employ].id + '" data-kt-rich-content-subcontent="' + data.employees[employ].company_email_address + '" data-kt-rich-content-icon="http://127.0.0.1:8000/media/avators/300-1.jpg">' + data.employees[employ].first_name + ' ' + data.employees[employ].last_name + '</option>');
                }
            }
            edit_select();
            $("#re_edit_deduction_modal").modal("show");
            blockUI.release();
        },
        error: function () {
            $("#re_edit_deduction_modal").modal("hide");
            blockUI.release();
        }
    });
}


function deleteDeduction(id) {
        Swal.fire({
            html: `Are you sure you want to delete this deduction?`,
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
                window.location.replace("deductions/delete/" + id);
            }
        });
}


// For Edit Modal

// Define form element
const editDeductionForm = document.getElementById('re_edit_deduction_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editDeductionValidator = FormValidation.formValidation(
    editDeductionForm,
    {
        fields: {
            'date': {
                validators: {
                    notEmpty: {
                        message: 'date is required'
                    }
                }
            },
            'amount': {
                validators: {
                    notEmpty: {
                        message: 'amount is required'
                    },
                    digits: {
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
const editDeductionSubmitButton = document.getElementById('re_edit_deduction_submit');
editDeductionSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editDeductionValidator) {
        editDeductionValidator.validate().then(function (status) {
            if (status == 'Valid') {
                // Show loading indication
                editDeductionSubmitButton.setAttribute('data-kt-indicator', 'on');
                // Disable button to avoid multiple click
                editDeductionSubmitButton.disabled = true;
                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    editDeductionSubmitButton.removeAttribute('data-kt-indicator');
                    // Enable button
                    editDeductionSubmitButton.disabled = false;
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
                    editDeductionForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


// Status and Deduction


var target2 = document.querySelector("#kt_content_container");
var blockUX = new KTBlockUI(target2, {
    message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> updating...</div>',
});
$(document).on('change', '.deduction-status', function () {
    blockUX.block();
    var id = $(this).attr('id');
    var deductionId = id.substring(0, id.lastIndexOf("-"));
    var status = $(this).val();
    console.log('Deduction ID:', deductionId);
    console.log('Status:', status);
    // Do something with the selected value and deduction ID
    window.location.replace("deductions/status/" + deductionId + "/" + status);
});

$(document).on('change', '.deduction-deduction', function () {
    blockUX.block();
    var id = $(this).attr('id');
    var deductionId = id.substring(0, id.lastIndexOf("-"));
    var deducted = $(this).val();
    console.log('Deduction ID:', deductionId);
    console.log('Status:', deducted);
    // Do something with the selected value and deduction ID
    window.location.replace("deductions/deduct/" + deductionId + "/" + deducted);
});


