// Define form element
const addTeamForm = document.getElementById('re_add_team_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addTeamValidator = FormValidation.formValidation(
    addTeamForm,
    {
        fields: {
            'team_name': {
                validators: {
                    notEmpty: {
                        message: 'Team name is required'
                    }
                }
            },

            'department': {
                validators: {
                    notEmpty: {
                        message: 'Department is required'
                    }
                }
            },
            'team_members[]': {
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
$("#department").change(function() {
    // Revalidate the field when an option is chosen
    addTeamValidator.revalidateField('department');
});
$("#team_members").change(function() {
    // Revalidate the field when an option is chosen
    addTeamValidator.revalidateField('team_members[]');
});
// Submit button handler
const TeamSubmitButton = document.getElementById('re_add_team_submit');
TeamSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addTeamValidator) {
        addTeamValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TeamSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TeamSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TeamSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TeamSubmitButton.disabled = false;

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

                    addTeamForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


function deleteTeam(id) {
    const button = document.getElementById('delete_team_btn_' + id);
    Swal.fire({
        html: `Are you sure you want to delete this team?`,
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
            window.location.replace("teams/delete/" + id);
        }
    });
}
