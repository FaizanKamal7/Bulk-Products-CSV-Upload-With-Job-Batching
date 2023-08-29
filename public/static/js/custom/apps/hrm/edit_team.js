// Define form element
const editTeamForm = document.getElementById('re_edit_team_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editTeamValidator = FormValidation.formValidation(
    editTeamForm,
    {
        fields: {
            'edit_team_name': {
                validators: {
                    notEmpty: {
                        message: 'Team name is required'
                    }
                }
            },

            'edit_department': {
                validators: {
                    notEmpty: {
                        message: 'Department is required'
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
$("#edit_department").change(function () {
    // Revalidate the field when an option is chosen
    editTeamValidator.revalidateField('edit_department');
});

// Submit button handler
const TeamEditSubmitButton = document.getElementById('re_edit_team_submit');
TeamEditSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editTeamForm) {
        editTeamValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                TeamEditSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                TeamEditSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    TeamEditSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    TeamEditSubmitButton.disabled = false;

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

                    editTeamForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});


var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);

function editTeam(id) {
    blockUI.block();
    $.ajax({
        url: "teams/edit/" + id,
        type: "GET",
        success: function (data) {
            $("#id").val(data.team.id);
            $("#edit_team_name").val(data.team.team_name);
            $("#edit_description").val(data.team.description);

            // Populate the department select field
            var departmentSelect = $("#edit_department");
            departmentSelect.empty(); // Clear any existing options
            // Add empty option
            departmentSelect.append($("<option>", {
                value: "",
                text: ""
            }));
            // Loop through the departments and add an option for each one
            $.each(data.departments, function (index, department) {
                var option = $("<option></option>")
                    .attr("value", department.id)
                    .text(department.department_name);
                if (department.id == data.team.department_id) {
                    option.attr("selected", true);
                }
                departmentSelect.append(option);
            });
            $("#re_edit_team_modal").modal("show");
            blockUI.release();
        },
        error: function () {
            console.log("error is coming")
            $("#re_edit_team_modal").modal("hide");
            blockUI.release();
        }
    });
}
