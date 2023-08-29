"use strict";

const creditAmount = document.getElementById('kt_modal_new_card_form');
const creditAmountModel = new bootstrap.Modal(document.querySelector("#kt_modal_new_card"));
var creditAmountValidator = FormValidation.formValidation(
    creditAmount,
    {
        /*TODO unique validation not working */
        fields: {
            'card_holder_name': {
                validators: {
                    notEmpty: { message: "Card holder name is required" },
                },
            },


            'card_number': {
                validators: {
                    notEmpty: { message: "card number is required" },
                },
            },
            'expiry_month': {
                validators: {
                    notEmpty: { message: "expiry is required" },
                },
            },
            'expiry_year': {
                validators: {
                    notEmpty: { message: "expiry year is required" },
                },
            },
            'cvv': {
                validators: {
                    notEmpty: { message: "cvv is required" },
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

const modelSubmitButton = document.getElementById('kt_modal_new_card_submit');
modelSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    // e.preventDefault();

    // // Validate form before submit
    // if (creditAmountValidator) {
    //     creditAmountValidator.validate().then(function (status) {
    //         console.log('validated!');

    //         if (status == 'Valid') {
    //             // alert(creditAmount.elements.namedItem('card_holder_name').value);

    //             try{
    //             Stripe.setPublishableKey(creditAmount.getAttribute('data-stripe-publishable-key'));


    //             Stripe.createToken({
    //                 number: creditAmount.elements.namedItem('card_number').value,
    //                 cvc: creditAmount.elements.namedItem('cvv').value,
    //                 exp_month: creditAmount.elements.namedItem('expiry_month').value,
    //                 exp_year: creditAmount.elements.namedItem('expiry_year').value,
    //             }, function (status, response) {
                    
    //                     // ---------------------- REMOVING ERRORS
    //                     $('#card_number').text('');
    //                     $('#cvv').text('');
    //                     $('#expiry_month').text('');
    //                     //------------------------END REMOVING ERRORS
    //                 if (response.error) {

    //                     if(response.error.code == 'invalid_number' || response.error.code == 'incorrect_number')
    //                     {
    //                        $('#card_number').text(response.error.message);
                        
    //                     }
    //                     else if(response.error.code == 'invalid_cvc'){
    //                        $('#cvv').text(response.error.message);
                            
    //                     }
    //                     else if (response.error.code == 'invalid_expiry_month'){
    //                        $('#expiry_month').text(response.error.message);
                            
    //                     }
    //                     else {
    //                         setTimeout(function () {
    //                             // Remove loading indication
    //                             modelSubmitButton.removeAttribute('data-kt-indicator');
            
    //                             // Enable button
    //                             modelSubmitButton.disabled = false;
            
    //                             // Show popup confirmation
    //                             Swal.fire({
    //                                 text: "Something went wrong please try later",
    //                                 icon: "danger",
    //                                 buttonsStyling: false,
    //                                 confirmButtonText: "Ok, got it!",
    //                                 customClass: {
    //                                     confirmButton: "btn btn-primary"
    //                                 }
    //                             });
            
            
    //                         }, 1500);
    //                     }

    //                 } else {
    //                     /* token contains id, last4, and card type */
    //                     var token = response['id'];
    //                     creditAmount.elements.namedItem('stripe_token').value= token;
    //                     // $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
    //                     creditAmount.submit(); // Submit form
    //                     }
    //                 });

    //             }catch(error){
    //                 setTimeout(function () {
    //                     // Remove loading indication
    //                     modelSubmitButton.removeAttribute('data-kt-indicator');
    
    //                     // Enable button
    //                     modelSubmitButton.disabled = false;
    
    //                     // Show popup confirmation
    //                     Swal.fire({
    //                         text: "Something went wrong please Contact Support",
    //                         icon: "danger",
    //                         buttonsStyling: false,
    //                         confirmButtonText: "Ok, got it!",
    //                         customClass: {
    //                             confirmButton: "btn btn-primary"
    //                         }
    //                     });
    
    
    //                 }, 1500);
    //             }

    //             // Show loading indication
    //             modelSubmitButton.setAttribute('data-kt-indicator', 'on');

    //             // Disable button to avoid multiple click
    //             modelSubmitButton.disabled = true;

    //             // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
    //             setTimeout(function () {
    //                 // Remove loading indication
    //                 modelSubmitButton.removeAttribute('data-kt-indicator');

    //                 // Enable button
    //                 modelSubmitButton.disabled = false;

    //                 // Show popup confirmation
    //                 Swal.fire({
    //                     text: "Form has been successfully submitted!",
    //                     icon: "success",
    //                     buttonsStyling: false,
    //                     confirmButtonText: "Ok, got it!",
    //                     customClass: {
    //                         confirmButton: "btn btn-primary"
    //                     }
    //                 });


    //             }, 1500);
    //         }
    //     });
    // }
});

function stripeResponseHandler(status, response) {
    console.log(response);
    alert(status);
    // if (response.error) {
    //     $('.error')
    //         .removeClass('hide')
    //         .find('.alert')
    //         .text(response.error.message);
    // } else {
    /* token contains id, last4, and card type */
    var token = response['id'];

    $form.find('input[type=text]').empty();
    $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
    creditAmount.submit(); // Submit form
    // }
}
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
                ? (creditAmount.reset(), creditAmountModel.hide())
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

