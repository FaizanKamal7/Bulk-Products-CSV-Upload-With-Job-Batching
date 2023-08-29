// Define form element
const addAwardForm = document.getElementById('re_add_award_form');

// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
var addAwardValidator = FormValidation.formValidation(
    addAwardForm,
    {
        fields: {
            'title': {
                validators: {
                    notEmpty: {
                        message: 'Award title is required'
                    }
                }
            },

            'amount': {
                validators: {
                    digits:{
                        message: 'Only digits are allowed'
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
const AwardSubmitButton = document.getElementById('re_add_award_submit');
AwardSubmitButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (addAwardValidator) {
        addAwardValidator.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                AwardSubmitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                AwardSubmitButton.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    AwardSubmitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    AwardSubmitButton.disabled = false;

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

                    addAwardForm.submit(); // Submit form
                }, 1500);
            }
        });
    }
});

var target = document.querySelector("#kt_post");
var blockUI = new KTBlockUI(target);

function editAward(id) {
    blockUI.block();
    $.ajax({
        url: "awards/edit/"+id,
        type:"GET",
        success: function (data){
            $("#id").val(data.award.id);
            $("#edit_title").val(data.award.title);
            $("#edit_amount").val(data.award.amount);
            $("#edit_description").text(data.award.description);
            $("#re_edit_award_modal").modal("show");
            blockUI.release();
        },
        error:function (){
            $("#re_edit_award_modal").modal("hide");
            blockUI.release();
        }
    });
}

function deleteAward(id){

        Swal.fire({
            html: `Are you sure you want to delete this award?`,
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
               window.location.replace("awards/delete/"+id);
            }
        });

}
