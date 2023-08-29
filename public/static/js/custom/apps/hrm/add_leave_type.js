// Define form element
const addLeaveTypeForm = document.getElementById('re_add_leave_type_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addLeaveTypeValidator = FormValidation.formValidation(
    addLeaveTypeForm,
    {
        fields: {
            'name': {
                validators: {
                    notEmpty: {
                        message: 'Name is required'
                    }
                }
            },

            'color': {
                validators: {
                    notEmpty:{
                        message: 'Color is required'
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
const LeaveTypeSubmitButton = document.getElementById('re_add_leave_type_submit');
LeaveTypeSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addLeaveTypeValidator) {
        addLeaveTypeValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                LeaveTypeSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                LeaveTypeSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    LeaveTypeSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    LeaveTypeSubmitButton.disabled = false;

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

                    addLeaveTypeForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);

function editLeaveType(id) {
    blockUI.block();
    $.ajax({
        url: "leaves/edit/"+id,
        type:"GET",
        success: function (data){
            console.log(data);
            $("#id").val(data.leaveType.id);
            $("#edit_name").val(data.leaveType.name);
            $("#edit_color").val(data.leaveType.color);
            $("#re_edit_leave_type_modal").modal("show");
            blockUI.release();
        },
        error:function (data){
            console.log(data);
            $("#re_edit_leave_type_modal").modal("hide");
            blockUI.release();
        }
    });
}

function deleteLeaveType(id){
        Swal.fire({
            html: `Are you sure you want to delete this leave type?`,
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
                window.location.replace("leaves/delete/"+id);
            }
        });
}


// Edit

// Define form element
const editLeaveTypeForm = document.getElementById('re_edit_leave_type_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editLeaveTypeValidator = FormValidation.formValidation(
    editLeaveTypeForm,
    {
        fields: {
            'name': {
                validators: {
                    notEmpty: {
                        message: 'Name is required'
                    }
                }
            },

            'color': {
                validators: {
                    notEmpty:{
                        message: 'Color is required'
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
const editLeaveTypeSubmitButton = document.getElementById('re_edit_leave_type_submit');
editLeaveTypeSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editLeaveTypeValidator) {
        editLeaveTypeValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                editLeaveTypeSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                editLeaveTypeSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    editLeaveTypeSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    editLeaveTypeSubmitButton.disabled = false;

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

                    editLeaveTypeForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
