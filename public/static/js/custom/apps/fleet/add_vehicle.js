
const addVehicleForm =  document.getElementById('add_fleet_vehicle_form');
var addVehicleValidator = FormValidation.formValidation(
    addVehicleForm,
    {
        /*TODO unique validation not working */
        fields:{
            'registration_number': {
                validators: {
                    notEmpty: {
                        message: 'Registration number is required'
                    },
                   
                    }
            },
            'engine_number': {
                validators: {
                    notEmpty: {
                        message: 'Engine number is required'
                    },
                   
                }
            },
            'chassis_number': {
                validators: {
                    notEmpty: {
                        message: 'Chassis number is required'
                    },
                }
            },
            'vehicle_make': {
                validators: {
                    notEmpty: {
                        message: 'Select vehicle make'
                    },
                }
            },
            'vehicle_model': {
                validators: {
                    notEmpty: {
                        message: 'Model is required'
                    },
                }
            },
            'vehicle_year': {
                validators: {
                    notEmpty: {
                        message: 'year is required'
                    },
                }
            },
            'vehicle_color': {
                validators: {
                    notEmpty: {
                        message: 'Color is required'
                    },
                }
            },
            'vehicle_status': {
                validators: {
                    notEmpty: {
                        message: 'Select vehicle status'
                    },
                }
            },
            'vehicle_type': {
                validators: {
                    notEmpty: {
                        message: 'Registration is required'
                    },
                }
            },
            // 'vehicle_picture': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Select vehicle type'
            //         },
            //     }
            // },
            'vehicle_milage': {
                validators: {
                    notEmpty: {
                        message: 'Milage is required'
                    },
                    integer: {
                        message: 'Milage must be an Number'
                    },     
                    stringLength: {
                        max: 3,
                        message: 'Milage must not exceed 3 digits'
                    }
            
                }
            },
            // 'registration_picture': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Registration picture is required'
            //         },
            //     }
            // },  
            'registration_issue_date': {
                validators: {
                    notEmpty: {
                        message: 'Registration issue date is required'
                    },
                }
            },  'registration_expiry_date': {
                validators: {
                    notEmpty: {
                        message: 'Registration expiry date is required'
                    },
                }
            },
            // 'insurance_picture': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Insurance picture is required'
            //         },
            //     }
            // },
              'insurance_issue_date': {
                validators: {
                    notEmpty: {
                        message: 'Insurance issue date is required'
                    },
                }
            },  'insurance_expiry_date': {
                validators: {
                    notEmpty: {
                        message: 'Insurance expiry date is required'
                    },
                }
            },
            // 'municipality_picture': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Municipality picture is required'
            //         },
            //     }
            // }, 
             'municipality_issue_date': {
                validators: {
                    notEmpty: {
                        message: 'Municipality issue date is required'
                    },
                }
            },  'municipality_expiry_date': {
                validators: {
                    notEmpty: {
                        message: 'Municipality expiry date is required'
                    },
                }
            },
            'api_unit_id': {
                validators: {
                    notEmpty: {
                        message: 'API unit id is required'
                    },
                    integer: {
                        message: 'API unit id  must be an integer'
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
        },
    
    }
);

// Revalidate
$("#vehicle_make").change(function() {
    // Revalidate the field when an option is chosen
    addVehicleValidator.revalidateField('vehicle_make');
});
$("#vehicle_year").change(function() {
    // Revalidate the field when an option is chosen
    addVehicleValidator.revalidateField('vehicle_year');
});
$("#vehicle_status").change(function() {
    // Revalidate the field when an option is chosen
    addVehicleValidator.revalidateField('vehicle_status');
});
$("#vehicle_type").change(function() {
    // Revalidate the field when an option is chosen
    addVehicleValidator.revalidateField('vehicle_status');
});
// SHOWING THE RELEVENT MODELS BASED ON THE MAKE SELECTED 
$('#vehicle_make').on('change', function() {
    var make = $(this).val();

    // Clear previous options from models dropdown
    $('#vehicle_model').empty();

    // Get the models for the selected make via AJAX request
    $.ajax({
        url: '/fleets/vehicle/get-make-models',  // Replace with your route URL to fetch the models based on make
        type: 'GET',
        data: { 'make': make },
        success: function(response) {
            console.log(response.models);
            // Add options to the models dropdown
            $.each(response.models, function(key, model) {
                console.log(model);
                $('#vehicle_model').append('<option value="' + model.id + '">' + model.model + '</option>');
            });
        }
    });
});

// Submit button handler
const vehicleSubmitButton = document.getElementById('re_add_fleet_vehicle_submit');
vehicleSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addVehicleValidator) {
        addVehicleValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                vehicleSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                vehicleSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    vehicleSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    vehicleSubmitButton.disabled = false;

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
        // Show the loader
                    $('#loader').show();
                    addVehicleForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});