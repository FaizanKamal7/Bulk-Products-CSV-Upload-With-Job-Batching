// Define form element
const addEventForm = document.getElementById('re_add_event_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addEventValidator = FormValidation.formValidation(
    addEventForm,
    {
        fields: {
            'event_title': {
                validators: {
                    notEmpty: {
                        message: 'Event title is required'
                    }
                }
            },

            'start_date_time': {
                validators: {
                    notEmpty: {
                        message: 'Start date is required'
                    }
                }
            },'end_date_time': {
                validators: {
                    notEmpty: {
                        message: 'Start date is required'
                    }
                }
            },

            'venue': {
                validators: {
                    notEmpty: {
                        message: 'Venu is required'
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
const EventSubmitButton = document.getElementById('re_add_event_submit');
EventSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addEventValidator) {
        addEventValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                EventSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                EventSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    EventSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    EventSubmitButton.disabled = false;

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

                    addEventForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);
function editEvent(id) {
    blockUI.block();
    $.ajax({
        url: "events/edit/"+id,
        type:"GET",
        success: function (data){
            console.log(data);
            $("#id").val(data.event.id);
            $("#edit_event_title").val(data.event.event_title);
            $("#edit_type").val(data.event.type);
            $("#edit_venue").val(data.event.venue);
            $("#edit_start_date_time").val(data.event.start_date_time);
            $("#edit_end_date_time").val(data.event.end_date_time);
            $("#edit_color").val(data.event.color);
            $("#edit_description").val(data.event.description);
            $("#re_edit_event_modal").modal("show");
            blockUI.release();
        },
        error:function (data){
            console.log(data);
            $("#re_edit_event_modal").modal("hide");
            blockUI.release();
        }
    });
}

function deleteEvent(id){
        Swal.fire({
            html: `Are you sure you want to delete this event?`,
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
                window.location.replace("events/delete/"+id);
            }
        });
}

// Edit

// Define form element
const editEventForm = document.getElementById('re_edit_event_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var editEventValidator = FormValidation.formValidation(
    editEventForm,
    {
        fields: {
            'event_title': {
                validators: {
                    notEmpty: {
                        message: 'Event title is required'
                    }
                }
            },

            'start_date_time': {
                validators: {
                    notEmpty: {
                        message: 'Start date is required'
                    }
                }
            },
            'end_date_time': {
                validators: {
                    notEmpty: {
                        message: 'Start date is required'
                    }
                }
            },

            'venue': {
                validators: {
                    notEmpty: {
                        message: 'Venu is required'
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
const editEventSubmitButton = document.getElementById('re_edit_event_submit');
editEventSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (editEventValidator) {
        editEventValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                editEventSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                editEventSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    editEventSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    editEventSubmitButton.disabled = false;

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

                    editEventForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
