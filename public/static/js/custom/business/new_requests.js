function send_base_pricing_contract(bzn_id) {
    console.log("bzn_id");
    console.log(bzn_id);
    Swal.fire({
        text: "Send contract to client with base pricing?",
        icon: "warning",
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, return",
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-active-light",
        },
    }).then(function (t) {
        $.ajax({
            url: "new_requests/send-docusign/",
            type: "POST",

            dataType: "html",
            success: function (response) {
                // // swal("Done!", "It was succesfully deleted!", "success");
                console.log("Success");
                console.log(response);

                var parsedResponse = JSON.parse(response);
                console.log(parsedResponse["redirect"]);
                // if (parsedResponse['redirect']) {
                //     window.location.href = response.redirect;
                // } else {
                //     console.log("Not redirected");
                // }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // swal("Error deleting!", "Please try again", "error");
                console.log("Error");
            },
        });
    });
}
