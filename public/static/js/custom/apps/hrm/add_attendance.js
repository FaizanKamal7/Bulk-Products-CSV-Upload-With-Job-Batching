// Screen blockers
{
    var target = document.querySelector("#kt_post");
    var blockUI = new KTBlockUI(target, {
        message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
    });

    var target2 = document.querySelector("#re_add_attendance_form");
    var blockUX = new KTBlockUI(target2, {
        message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> fetching...</div>',
    });
}
// Add Form Validation and Submit Handling
{
// Define form element
    const addAttendanceForm = document.getElementById('re_add_attendance_form');
// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var addAttendanceValidator = FormValidation.formValidation(
        addAttendanceForm,
        {
            fields: {
                'employees[]': {
                    validators: {
                        notEmpty: {
                            message: 'At least one employee is required'
                        }
                    }
                },

                'date': {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        }
                    }
                },
                'status': {
                    validators: {
                        notEmpty: {
                            message: 'Status is required'
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
// Revalidate Fields
    $("#employees").change(function () {
        // Revalidate the field when an option is chosen
        addAttendanceValidator.revalidateField('employees[]');
    });
    $("#status").change(function () {
        // Revalidate the field when an option is chosen
        addAttendanceValidator.revalidateField('status');
    });
// Submit button handler
    const AttendanceSubmitButton = document.getElementById('re_add_attendance_submit');
    AttendanceSubmitButton.addEventListener('click', function (e) {
        // Prevent default button action
        e.preventDefault();

        // Validate form before submit
        if (addAttendanceValidator) {
            addAttendanceValidator.validate().then(function (status) {
                console.log('validated!');

                if (status == 'Valid') {
                    // Show loading indication
                    AttendanceSubmitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    AttendanceSubmitButton.disabled = true;

                    // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    setTimeout(function () {
                        // Remove loading indication
                        AttendanceSubmitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        AttendanceSubmitButton.disabled = false;

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

                        addAttendanceForm.submit(); // Submit form
                    }, 1500);
                }
            });
        }
    });
}
// Add Form Ajax call
{
    $('#departments').on('change', function () {
        blockUX.block();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const department_id = $(this).val();
        const dpt_no_employee = $("#dpt_no_employee");
        const employees = $("#employees");

        dpt_no_employee.addClass('d-none');
        employees.empty();
        $.ajax({
            url: '/hr/attendance/get/employees/',
            type: 'POST',
            data: {
                department_id: department_id,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.data.id === 'empty') {
                    var option = '<option value="' + 'all' + '">' + 'All' + '</option>';

                    employees.append(option);
                    // Loop through the employee's data and populate all emp
                    $.each(response.data.employees, function (index, employee) {

                        var option = '<option value="' + employee.id + '">' + employee.first_name + ' ' + employee.last_name + '</option>';
                        employees.append(option);
                    });
                } else {
                    if (response.data.employees.length === 0) {
                        dpt_no_employee.removeClass('d-none');
                    } else {
                        var option = '<option value="' + 'all' + '">' + 'All' + '</option>';
                        employees.append(option);
                        // Loop through the employee's data(based on dpt) and append new options to the select element
                        $.each(response.data.employees, function (index, employee) {
                            var option = '<option value="' + employee.employee.id + '">' + employee.employee.first_name + ' ' + employee.employee.last_name + '</option>';
                            employees.append(option);
                        });
                    }

                }
                blockUX.release();
            },
            error: function (response) {
                console.log("Error");
                blockUX.release();
            }
        });
    });
}
// Edit on Click loader
{
    // function editAttendance(id) {
    //     console.log("function is working");
    //     blockUI.block();
    //     $.ajax({
    //         url: ""+id,
    //         type:"GET",
    //         success: function (data){
    //             console.log("its success");
    //
    //             $("#").modal("show");
    //             blockUI.release();
    //         },
    //         error:function (){
    //             console.log("error")
    //
    //             $("#").modal("hide");
    //             blockUI.release();
    //         }
    //     });
    // }
}
