// Define form element
const addLeaveTypeForm = document.getElementById('re_add_leave_policy_record_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addLeaveTypeValidator = FormValidation.formValidation(
    addLeaveTypeForm,
    {
        fields: {
            'leave_type_id': {
                validators: {
                    notEmpty: {
                        message: 'Leave type is required'
                    }
                }
            },

            'allowed': {
                validators: {
                    notEmpty:{
                        message: 'Allowed value  is required'
                    },
                    digits:{
                        message: 'Only whole numbers are allowed'
                    }

                }
            },

            'impact_on_pay': {
                validators: {
                    notEmpty:{
                        message: 'Impact on pay  is required'
                    },
                    numeric:{
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

function editPolicyRecord(id) {
    blockUI.block();
    $.ajax({
        url: "/hr/leave-policy-records/edit/"+id,
        type:"GET",
        success: function (data){
            console.log(data);
            $("#id").val(data.policy_record.id);
            $("#edit_leave_type_id").val(data.policy_record.leave_type_id);
            $("#edit_allowed").val(data.policy_record.allowed);
            $("#edit_impact_on_pay").val(data.policy_record.impact_on_pay);
            $("#re_edit_leave_policy_record_modal").modal("show");
            blockUI.release();
        },
        error:function (data){
            console.log(data);
            $("#re_edit_leave_policy_record_modal").modal("hide");
            blockUI.release();
        }
    });
}

function deletePolicyRecord(record_id,id){
     Swal.fire({
            html: `Are you sure you want to delete this record?`,
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
                window.location.replace("/hr/leave-policy-records/delete/"+record_id+"/"+id);
            }
        });
}


// Edit
// Define form element
const LeaveTypeEditForm = document.getElementById('re_edit_leave_policy_record_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var LeaveTypeEditValidator = FormValidation.formValidation(
    LeaveTypeEditForm,
    {
        fields: {
            'allowed': {
                validators: {
                    notEmpty:{
                        message: 'Allowed value  is required'
                    },
                    digits:{
                        message: 'Only whole numbers are allowed'
                    }

                }
            },

            'impact_on_pay': {
                validators: {
                    notEmpty:{
                        message: 'Impact on pay  is required'
                    },
                    numeric:{
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
const LeaveTypeEditSubmitButton = document.getElementById('re_edit_leave_type_submit');
LeaveTypeEditSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (LeaveTypeEditValidator) {
        LeaveTypeEditValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                LeaveTypeEditSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                LeaveTypeEditSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    LeaveTypeEditSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    LeaveTypeEditSubmitButton.disabled = false;

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

                    LeaveTypeEditForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
