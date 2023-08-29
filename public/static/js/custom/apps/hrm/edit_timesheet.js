// Define form element
const editTimesheetForm = document.getElementById('re_edit_timesheet_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editTimesheetValidator = FormValidation.formValidation(
    editTimesheetForm,
    {
        fields: {
            'edit_employee': {
                validators: {
                    notEmpty: {
                        message: 'Employee is required'
                    }
                }
            },
            'edit_hours_worked': {
                validators: {
                    notEmpty: {
                        message: 'Hours worked are required'
                    },
                    numeric: {
                        message: 'Only digits are allowed'
                    },

                }
            },
            'edit_sheet_title': {
                validators: {
                    notEmpty: {
                        message: 'Sheet title is required'
                    }
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
    }
);




// Submit button handler
const TimesheetEditSubmitButton = document.getElementById('re_edit_timesheet_submit');

TimesheetEditSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editTimesheetValidator) {
        editTimesheetValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TimesheetEditSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TimesheetEditSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TimesheetEditSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TimesheetEditSubmitButton.disabled = false;

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

                    editTimesheetForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);
function editTimesheet(id) {
    blockUI.block();
    $.ajax({
        url: "timesheets/edit/"+id,
        type:"GET",
        success: function (data){
            console.log("its success");
            $("#id").val(data.timesheet.id);
            $("#edit_sheet_title").val(data.timesheet.sheet_title);
            $("#edit_date").val(data.timesheet.date);
            $("#edit_hours_worked").val(data.timesheet.hours_worked);
            $("#edit_description").val(data.timesheet.description);

            // Populate the employee select field
            var employeeSelect = $("#edit_employee");
            employeeSelect.empty();// Clear any existing options
            var option = $("<option></option>")
                .attr("value", "")
                .text("");
            employeeSelect.append(option);
            // Loop through the employees and add an option for each one
            $.each(data.employees, function(index, employee) {
                var option = $("<option></option>")
                    .attr("value", employee.id)
                    .text(employee.first_name+" "+employee.last_name);
                if (employee.id == data.timesheet.employee_id) {
                    option.attr("selected", true);
                }
                employeeSelect.append(option);
            });

            // status
            $("#edit_status option").remove(); // remove all options first
            var statusOptions = ["Pending", "Approved", "Rejected"]; // options to add
            $.each(statusOptions, function(index, value) {
                var option = $('<option/>').attr('value', value).text(value);
                if (value === data.timesheet.status) {
                    option.attr('selected', true); // select if value matches
                }
                $('#edit_status').append(option);
            });

            $("#re_edit_timesheet_modal").modal("show");
            blockUI.release();
        },
        error:function (){
            console.log("error is coming")
            $("#re_edit_timesheet_modal").modal("hide");
            blockUI.release();
        }
    });
}
