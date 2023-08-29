// Define form element
const addTeamMemberForm = document.getElementById('re_add_team_member_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addTeamMemberValidator = FormValidation.formValidation(
    addTeamMemberForm,
    {
        fields: {
            'team_member_members[]': {
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
$("#team_member_members").change(function() {
    // Revalidate the field when an option is chosen
    addTeamMemberValidator.revalidateField('team_member_members[]');
});

// Submit button handler
const TeamMemberSubmitButton = document.getElementById('re_add_team_member_submit');
TeamMemberSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addTeamMemberValidator) {
        addTeamMemberValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TeamMemberSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TeamMemberSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TeamMemberSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TeamMemberSubmitButton.disabled = false;

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

                    addTeamMemberForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


function deleteTeamMember(member_id,team_id) {
    console.log(member_id);
    console.log(team_id);
    const button = document.getElementById('delete_team_member_btn_' + member_id);
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
            window.location.replace("/hr/team-members/"+team_id+"/delete/"+member_id);
        }
    });
}
