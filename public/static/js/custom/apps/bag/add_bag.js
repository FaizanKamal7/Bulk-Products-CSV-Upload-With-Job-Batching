
const add_bag_form =  document.getElementById('add_new_bag_form');
var add_bag_validation = FormValidation.formValidation(
    add_bag_form,
    {

        fields:{
           'partner_id': {
                validators: {
                    notEmpty: {
                        message: 'Partner is Required'
                    },
                }
            },
            'no_of_bags': {
                validators: {
                    notEmpty: {
                        message: 'No of Bags is required'
                    },
                    integer: {
                        message: 'No of Bags must be an integer'
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
const bag_submit_btn = document.getElementById('add_bag_submit_btn');
bag_submit_btn.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (add_bag_validation) {
        add_bag_validation.validate().then(function (status) {
            console.log('validated!');

            if (status == 'Valid') {
                // Show loading indication
                bag_submit_btn.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click
                bag_submit_btn.disabled = true;

                // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                setTimeout(function () {
                    // Remove loading indication
                    bag_submit_btn.removeAttribute('data-kt-indicator');

                    // Enable button
                    bag_submit_btn.disabled = false;

                    add_bag_form.submit(); // Submit form
                }, 1500);
            }
        });
    }
});