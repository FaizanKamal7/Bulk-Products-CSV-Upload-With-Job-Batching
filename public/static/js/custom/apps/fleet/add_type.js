"use strict";
const addTypeForm =  document.getElementById('nixus_add_vehicle_type_form');
const addTypeModel = new bootstrap.Modal(document.querySelector("#nixus_add_vehicle_type"));
var addTypeValidator = FormValidation.formValidation(
    addTypeForm,
    {

        fields: {
            'vehicle_type': {
                validators: {
                    notEmpty: { message: "Vehicle Type is required" },
                },
            },
            'vehicle_capacity': {
                validators: {
                    notEmpty: { message: "Vehicle Capacity is required" },
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

const typeSubmitButton = document.getElementById('nixus_add_new_type_submit');
typeSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addTypeValidator) {
        addTypeValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                typeSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                typeSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    typeSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    typeSubmitButton.disabled = false;

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

                    addTypeForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});
const typeCancelButton = document.getElementById('nixus_add_new_type_cancel');
typeCancelButton.addEventListener("click", function (t) {
    
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
        }).then(function (typeSubmitButton) {
            typeSubmitButton.value
                ? (addTypeForm.reset(), addTypeModel.hide())
                : "cancel" === typeSubmitButton.dismiss &&
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
// ------------------------------------------ UPDATE VEHICLE TYPE --------------------------------------------
//-------------------------------------------------------------------------------------------------------------
// const modelEditbutton = document.getElementById('nixus_edit_vehicle_model');

function editVehicleType(btn){
    
    var id = btn.getAttribute('data-type-id');
    // alert (id);
    var form = $('#nixus_update_vehicle_type_form');


  // Set the action attribute using the attr() method

     var row = $(btn).closest('tr');

        // Retrieve the values from the <td> cells within the row
        var name = row.find('.name-cell').text();
        var capacity = row.find('.capacity-cell').text();
        var icon = row.find('.icon-cell').text();
        var status = row.find('.status-cell').text();

        var url = `${id}\\update_vehicle_type`;
        form.attr('action', url);


        // Populate the form fields in the modal dialog with the retrieved values
        $('#updated_type_name').val(name);
        $('#updated_type_capacity').val(capacity);
        $('#updated_type_icon').val(icon);
        $('#updated_active_status').val(status);
   
        if (status ==0){
            $('#updated_active_status').prop('checked', false);
        }else{
            $('#updated_active_status').prop('checked', true);

        }

}

const updateTypeForm =  document.getElementById('nixus_update_vehicle_type_form');
var updateTypeValidator = FormValidation.formValidation(
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