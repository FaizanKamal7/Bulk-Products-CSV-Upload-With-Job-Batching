"use strict";
var KTAppEcommerceCategories = (function () {
    var t,
        e,
        isInitialized = false;
    var n = () => {
        t.querySelectorAll(
            '[data-kt-ecommerce-category-filter="delete_row"]'
        ).forEach((t) => {
            t.addEventListener("click", function (t) {
                t.preventDefault();
                const n = t.target.closest("tr"),
                    o = n.querySelector(
                        '[data-kt-ecommerce-category-filter="category_name"]'
                    ).innerText;
                Swal.fire({
                    text: "Are you sure you want to delete " + o + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary",
                    },
                }).then(function (t) {
                    if (t.value) {
                        Swal.fire({
                            text: "You have deleted " + o + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            },
                        }).then(function () {
                            e.row($(n)).remove().draw();
                        });
                    } else if (t.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            text: o + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            },
                        });
                    }
                });
            });
        });

        // Add the pagination to the card header
        const cardHeader = document.querySelector(".card-header");
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container");
        paginationContainer.appendChild(
            e.table().container().querySelector(".dataTables_paginate")
        );
        cardHeader.appendChild(paginationContainer);
    };

    return {
        init: function () {
            t = document.querySelector("#kt_ecommerce_category_table");
            if (t && !isInitialized) {
                isInitialized = true;
                e = $(t).DataTable({
                    info: false,
                    order: [],
                    pageLength: 10,
                    columnDefs: [
                        { orderable: false, targets: 0 },
                        { orderable: false, targets: 3 },
                    ],
                    language: {
                        lengthMenu: "Show _MENU_",
                    },
                    dom:
                        "<'row'" +
                        "<'col-sm-6 d-flex align-items-center justify-content-start'l>" +
                        ">" +
                        "<'row'" +
                        "<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i>" +
                        "<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>" +
                        ">" +
                        "<'table-responsive'tr>",
                });
                e.on("draw", function () {
                    n();
                });
                document
                    .querySelector(
                        '[data-kt-ecommerce-category-filter="search"]'
                    )
                    .addEventListener("keyup", function (t) {
                      var value =   e.search(t.target.value).draw();
                    });
                n();
            }
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTAppEcommerceCategories.init();
});
