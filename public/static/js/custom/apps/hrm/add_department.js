// Define form element
const addDepartmentForm = document.getElementById('re_add_department_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addDepartmentValidator = FormValidation.formValidation(
    addDepartmentForm,
    {
        fields: {
            'department_name': {
                validators: {
                    notEmpty: {
                        message: 'Department name is required'
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
const DepartmentSubmitButton = document.getElementById('re_add_department_submit');
DepartmentSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addDepartmentValidator) {
        addDepartmentValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                DepartmentSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                DepartmentSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    DepartmentSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    DepartmentSubmitButton.disabled = false;

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

                    addDepartmentForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});



var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);

function editDepartment(id) {
    blockUI.block();
    $.ajax({
        url: "departments/edit/"+id,
        type:"GET",
        success: function (data){
            $("#id").val(data.department.id);
            $("#edit_department_name").val(data.department.department_name);
            $("#re_edit_department_modal").modal("show");
            blockUI.release();
        },
        error:function (data){
            console.log(data);
            $("#re_edit_department_modal").modal("hide");
            blockUI.release();
        }
    });
}

function deleteDepartment(id){
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
                window.location.replace("departments/delete/"+id);
            }
        });

}

// Edit
// Define form element
const editDepartmentForm = document.getElementById('re_edit_department_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editDepartmentValidator = FormValidation.formValidation(
    editDepartmentForm,
    {
        fields: {
            'department_name': {
                validators: {
                    notEmpty: {
                        message: 'Department name is required'
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
const editDepartmentSubmitButton = document.getElementById('re_edit_department_submit');
editDepartmentSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editDepartmentValidator) {
        editDepartmentValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                editDepartmentSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                editDepartmentSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    editDepartmentSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    editDepartmentSubmitButton.disabled = false;

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

                    editDepartmentForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
