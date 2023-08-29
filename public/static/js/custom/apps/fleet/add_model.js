"use strict";
const addModelForm =  document.getElementById('nixus_add_vehicle_model_form');
const addModelModel = new bootstrap.Modal(document.querySelector("#nixus_add_vehicle_model"));
var addModelValidator = FormValidation.formValidation(
    addModelForm,
    {
        /*TODO unique validation not working */
        fields: {
            'vehicle_make': {
                validators: {
                    notEmpty: { message: "Vehicle Make is required" },
                },
            },


            'vehicle_model': {
                validators: {
                    notEmpty: { message: " Vehicle Model is required" },
                },
            },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
            }),
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        },
    
    }
);

const modelSubmitButton = document.getElementById('nixus_add_new_model_submit');
modelSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addModelValidator) {
        addModelValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                modelSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                modelSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    modelSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    modelSubmitButton.disabled = false;

                    // Show popup confirmation
                    Swal.fire({
                        text: "Form has been successfully submitted!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });

                    addModelForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
const modelCancelButton = document.getElementById('nixus_add_new_model_cancel');
modelCancelButton.addEventListener("click", function (t) {
    
    t.preventDefault(),
        Swal.fire({
            text: "Are you sure you would like to cancel?",
            icon: "warning",
            showCancelButton: !0,
            buttonsStyling: !1,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, return",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light",
            },
        }).then(function (modelSubmitButton) {
            modelSubmitButton.value
                ? (addModelForm.reset(), addModelModel.hide())
                : "cancel" === modelSubmitButton.dismiss &&
                  Swal.fire({
                      text: "Your form has not been cancelled!.",
                      icon: "error",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                          confirmButton: "btn btn-primary",
                      },
                  });
        });
});


//-------------------------------------------------------------------------------------------------------------
// ------------------------------------------ UPDATE VEHICLE MODEL --------------------------------------------
//-------------------------------------------------------------------------------------------------------------
// const modelEditbutton = document.getElementById('nixus_edit_vehicle_model');

function editVehicleModel(btn){
    
    var id = btn.getAttribute('data-model-id');

    var form = $('#nixus_update_vehicle_model_form');


  // Set the action attribute using the attr() method

     var row = $(btn).closest('tr');

        // Retrieve the values from the <td> cells within the row
        var make = row.find('.make_cell').text();
        var model = row.find('.model_cell').text();
        var status = row.find('.status_cell').text();
        
        var url = `${id}\\update_vehicle_model`;
        form.attr('action', url);


        // Populate the form fields in the modal dialog with the retrieved values
        $('#update_vehicle_make').val(make);
        $('#update_vehicle_model').val(model);
        $('#update_vehicle_active_status').val(status);

}

const updateModelForm =  document.getElementById('nixus_update_vehicle_model_form');
var ModelValidator = FormValidation.formValidation(
    updateModelForm,
    {
        /*TODO unique validation not working */
        fields: {
            'update_vehicle_make': {
                validators: {
                    notEmpty: { message: "Vehicle Make is required" },
                },
            },


            'update_vehicle_model': {
                validators: {
                    notEmpty: { message: " Vehicle Model is required" },
                },
            },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: "",
            }),
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        },
    
    }
);