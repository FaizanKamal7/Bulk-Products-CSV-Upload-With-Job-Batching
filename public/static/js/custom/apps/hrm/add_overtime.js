// Define form element
const addOvertimeForm = document.getElementById('re_add_overtime_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addOvertimeValidator = FormValidation.formValidation(addOvertimeForm, {
    fields: {
        'employee': {
            validators: {
                notEmpty: {
                    message: 'Employee is required'
                }
            }
        },
        'timesheet': {
            validators: {
                notEmpty: {
                    message: 'Timesheet is required'
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
        'pay_adjustment': {
            validators: {
                notEmpty: {
                    message: 'Pay adjustment is required'
                }, numeric: {
                    message: 'Only digits are allowed'
                },
            }
        },
        'hours': {
            validators: {
                notEmpty: {
                    message: 'Hours are required'
                }, numeric: {
                    message: 'Only digits are allowed'
                },
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
});


// Revalidate Select2 input. For more info, plase visit the official plugin site: https://select2.org/
$("#employee,#timesheet").change(function () {
    // Revalidate the field when an option is chosen
    addOvertimeValidator.revalidateField('employee');
    addOvertimeValidator.revalidateField('timesheet');
});

//On change employee : Get all his timesheets
$("#employee").change(function () {
    const id = $(this).val();
    console.log(id);
    $.ajax({
        url: "overtimes/get/timesheets/" + id, type: "GET",
        success: function (data) {
            // Clear all existing options and add an empty option
            $("#timesheet").empty().append($("<option></option>"));
            // if len > 0 populate : else warning
            if (data.timesheets.length === 0) {
                $("#emp_warning").removeClass('d-none');
            } else {
                $("#emp_warning").addClass('d-none');
                // Loop through the timesheets and add new options
                $.each(data.timesheets, function (i, timesheet) {
                    $("#timesheet").append($("<option></option>")
                        .attr("value", timesheet.id)
                        .text(timesheet.sheet_title));
                });
            }

        },
        error: function () {

        }
    });

});

// Submit button handler
const OvertimeSubmitButton = document.getElementById('re_add_overtime_submit');
OvertimeSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addOvertimeValidator) {
        addOvertimeValidator.validate().then(function (status) {
            console.log('validated!');
            if (status == 'Valid') {
                // Show loading indication
                OvertimeSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                OvertimeSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    OvertimeSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    OvertimeSubmitButton.disabled = false;

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

                    addOvertimeForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});



function deleteOvertime(id) {
    const button = document.getElementById('delete_overtime_btn_' + id);

    Swal.fire({
        html: `Are you sure you want to delete this overtime?`,
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
            window.location.replace("overtimes/delete/" + id);
        }
    });
}
