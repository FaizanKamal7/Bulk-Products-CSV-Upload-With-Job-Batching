// Define form element
const addDepartmentMemberForm = document.getElementById('re_add_department_member_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addDepartmentMemberValidator = FormValidation.formValidation(
    addDepartmentMemberForm,
    {
        fields: {
            'department_member_members[]': {
                validators: {
                    notEmpty: {
                        message: 'Please select at least one member'
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
// Revalidate Select2 input. For more info, plase visit the official plugin site: https://select2.org/
$("#department_member_members").change(function() {
    // Revalidate the field when an option is chosen
    addDepartmentMemberValidator.revalidateField('department_member_members[]');
});

// Submit button handler
const DepartmentMemberSubmitButton = document.getElementById('re_add_department_member_submit');
DepartmentMemberSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addDepartmentMemberValidator) {
        addDepartmentMemberValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                DepartmentMemberSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                DepartmentMemberSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    DepartmentMemberSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    DepartmentMemberSubmitButton.disabled = false;

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

                    addDepartmentMemberForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


function deleteDepartmentMember(member_id,department_id) {
    console.log(member_id);
    console.log(department_id);
    Swal.fire({
        html: `Are you sure you want to delete this team member?`,
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
            window.location.replace("/hr/department-members/"+department_id+"/delete/"+member_id);
        }
    });
}
