"use strict";
var KTREAddlocations = function () {
    const t = document.getElementById("kt_modal_add_locations"), e = t.querySelector("#kt_modal_add_locations_form"),
        n = new bootstrap.Modal(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {
                        location_name: {validators: {notEmpty: {message: "location name is required"}}},
                        city: {validators: {notEmpty: {message: "city is required"}}},
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                });
                const i = t.querySelector('[data-kt-locationss-modal-action="submit"]');
                i.addEventListener("click", (t => {
                    t.preventDefault(), o && o.validate().then((function (t) {
                        console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () {
                            i.removeAttribute("data-kt-indicator"), i.disabled = !1, $("#kt_modal_add_locations_form").submit();
                        }), 2e3)) : Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                })), t.querySelector('[data-kt-locationss-modal-action="cancel"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                })), t.querySelector('[data-kt-locationss-modal-action="close"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTREAddlocations.init()
}));
