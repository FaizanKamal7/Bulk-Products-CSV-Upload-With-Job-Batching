// Define form element
const editOvertimeForm = document.getElementById('re_edit_overtime_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editOvertimeValidator = FormValidation.formValidation(editOvertimeForm, {
    fields: {
        'edit_timesheet': {
            validators: {
                notEmpty: {
                    message: 'Timesheet is required'
                }
            }
        },
        'edit_title': {
            validators: {
                notEmpty: {
                    message: 'Title is required'
                }
            }
        },
        'edit_pay_adjustment': {
            validators: {
                notEmpty: {
                    message: 'Pay adjustment is required'
                }, numeric: {
                    message: 'Only digits are allowed'
                },
            }
        },
        'edit_hours': {
            validators: {
                notEmpty: {
                    message: 'Hours are required'
                }, numeric: {
                    message: 'Only digits are allowed'
                },
            }
        },
        'edit_date': {
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

// Submit button handler
const OvertimeEditSubmitButton = document.getElementById('re_edit_overtime_submit');
OvertimeEditSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editOvertimeValidator) {
        editOvertimeValidator.validate().then(function (status) {
            console.log('validated!');
            if (status == 'Valid') {
                // Show loading indication
                OvertimeEditSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                OvertimeEditSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    OvertimeEditSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    OvertimeEditSubmitButton.disabled = false;

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

                    editOvertimeForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});



var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);
function editOvertime(id) {
    blockUI.block();
    $.ajax({
        url: "overtimes/edit/"+id,
        type:"GET",
        success: function (data){
            console.log("its success");
            $("#id").val(data.overtime.id);
            $("#edit_title").val(data.overtime.title);
            $("#edit_hours").val(data.overtime.hours);
            $("#edit_date").val(data.overtime.date);
            $("#edit_pay_adjustment").val(data.overtime.pay_adjustment);
            $("#edit_description").val(data.overtime.description);

            $("#edit_employee").val(data.employee.first_name+" "+data.employee.last_name);
            // timesheet
            let my_time_sheet_id = "";
            try{
                my_time_sheet_id = data.overtime.timesheet_id
            } catch(error){
                my_time_sheet_id = "not_found"
            }
            $("#edit_timesheet option").remove();
            $.each(data.timesheets, function(index, timesheet) {
                var option = $('<option/>').attr('value', timesheet.id).text(timesheet.sheet_title);
                if (timesheet.id === my_time_sheet_id ) {
                    option.attr('selected', true); // select if timesheet_id matches
                }
                $('#edit_timesheet').append(option);
            });
            // status
            $("#edit_status option").remove();
            var statusOptions = ["Pending", "Approved", "Rejected"]; // options to add
            $.each(statusOptions, function(index, value) {
                var option = $('<option/>').attr('value', value).text(value);
                if (value === data.overtime.status) {
                    option.attr('selected', true); // select if value matches
                }
                $('#edit_status').append(option);
            });

            $("#re_edit_overtime_modal").modal("show");
            blockUI.release();
        },
        error:function (){
            console.log("error is coming")
            $("#re_edit_overtime_modal").modal("hide");
            blockUI.release();
        }
    });
}
