function deleteLeaveApplication(id) {
        Swal.fire({
            html: `Are you sure you want to delete this leave?`,
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
                window.location.replace("leave-applications/delete/" + id);
            }
        });
}

