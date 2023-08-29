// Define form element
const addDesignationForm = document.getElementById('re_add_designations_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addDesignationValidator = FormValidation.formValidation(
    addDesignationForm,
    {
        fields: {
            'designation_name': {
                validators: {
                    notEmpty: {
                        message: 'Designation name is required'
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
const DesignationSubmitButton = document.getElementById('re_add_designations_submit');
DesignationSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addDesignationValidator) {
        addDesignationValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                DesignationSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                DesignationSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    DesignationSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    DesignationSubmitButton.disabled = false;

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

                    addDesignationForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);

function editDesignation(id) {
    blockUI.block();
    $.ajax({
        url: "designations/edit/"+id,
        type:"GET",
        success: function (data){
            console.log(data);
            $("#id").val(data.designation.id);
            $("#edit_designation_name").val(data.designation.name);
            $("#re_edit_designations_modal").modal("show");
            blockUI.release();
        },
        error:function (){
            $("#re_edit_designations_modal").modal("hide");
            blockUI.release();
        }
    });
}

function deleteDesignation(id){
    const button = document.getElementById('delete_designation_btn_'+id);
        Swal.fire({
            html: `Are you sure you want to delete this designation?`,
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
                window.location.replace("designations/delete/"+id);
            }
        });
}

// Edit

// Define form element
const editDesignationForm = document.getElementById('re_edit_designations_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editDesignationValidator = FormValidation.formValidation(
    editDesignationForm,
    {
        fields: {
            'designation_name': {
                validators: {
                    notEmpty: {
                        message: 'Designation name is required'
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
const DesignationEditSubmitButton = document.getElementById('re_edit_designations_submit');
DesignationEditSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editDesignationValidator) {
        editDesignationValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                DesignationEditSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                DesignationEditSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    DesignationEditSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    DesignationEditSubmitButton.disabled = false;

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

                    editDesignationForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
