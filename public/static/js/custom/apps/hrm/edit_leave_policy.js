// Define form element
const editLeavePolicyForm = document.getElementById('re_edit_leave_policy_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editLeavePolicyValidator = FormValidation.formValidation(
    editLeavePolicyForm,
    {
        fields: {
            'policy_name': {
                validators: {
                    notEmpty: {
                        message: 'Leave policy title is required'
                    }
                }
            },

            'description': {
                validators: {
                    notEmpty: {
                        message: 'Leave policy description title is required'
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
const editLeavePolicySubmitButton = document.getElementById('re_edit_leave_policy_submit');
editLeavePolicySubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editLeavePolicyValidator) {
        editLeavePolicyValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                editLeavePolicySubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                editLeavePolicySubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    editLeavePolicySubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    editLeavePolicySubmitButton.disabled = false;

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

                    editLeavePolicyForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});



var target = document.querySelector("#kt_post2");
var blockUI = new KTBlockUI(target);


function editLeavePolicy(id) {
    // blockUI.block();
    $.ajax({
        url: "leave-policy/edit/"+id,
        type:"GET",
        success: function (data){
            console.log(data);
            $("#id").val(data.policy.id);
            $("#edit_policy_name").val(data.policy.policy_name);
            $("#edit_description").val(data.policy.description);
            $("#re_edit_policies_modal").modal("show");
            // blockUI.release();
        },
        error:function (data){
            console.log(data);
            $("#re_edit_event_modal").modal("hide");
            // blockUI.release();
        }
    });
}

function deletePolicy(id){
        Swal.fire({
            html: `Are you sure you want to delete this leave policy?`,
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
                window.location.replace("leave-policy/delete/"+id);
            }
        });
}

