"use strict";
var KTCreateProperty = function () {
    var e, t, i, o, s, r, a = [];
    return {
        init: function () {
            (e = document.querySelector("#kt_modal_create_property")) && new bootstrap.Modal(e), t = document.querySelector("#kt_create_property_stepper"), i = t.querySelector("#kt_create_property_form"), o = t.querySelector('[data-kt-stepper-action="submit"]'), s = t.querySelector('[data-kt-stepper-action="next"]'), (r = new KTStepper(t)).on("kt.stepper.changed", (function (e) {
                10 === r.getCurrentStepIndex() ? (o.classList.remove("d-none"), o.classList.add("d-inline-block"), s.classList.add("d-none")) : 11 === r.getCurrentStepIndex() ? (o.classList.add("d-none"), s.classList.add("d-none")) : (o.classList.remove("d-inline-block"), o.classList.remove("d-none"), s.classList.remove("d-none"))
            })), r.on("kt.stepper.next", (function (e) {
                console.log("stepper.next");
                var t = a[e.getCurrentStepIndex() - 1];
                t ? t.validate().then((function (t) {
                    console.log("validated!"), "Valid" == t ? (e.goNext(), KTUtil.scrollTop()) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {confirmButton: "btn btn-light"}
                    }).then((function () {
                        KTUtil.scrollTop()
                    }))
                })) : (e.goNext(), KTUtil.scrollTop())
            })), r.on("kt.stepper.previous", (function (e) {
                console.log("stepper.previous"), e.goPrevious(), KTUtil.scrollTop()
            })), a.push(FormValidation.formValidation(i, {
                fields: {
                    listing_purpose: {validators: {notEmpty: {message: "Please select listing purpose"}}}},
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), a.push(FormValidation.formValidation(i, {
                fields: {
                    property_category: {validators: {notEmpty: {message: "Please select property category"}}},
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), a.push(FormValidation.formValidation(i, {
                fields: {
                    property_sub_category: {validators: {notEmpty: {message: "Please select property sub category"}}},
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),a.push(FormValidation.formValidation(i, {
                fields: {
                    property_title: {validators: {notEmpty: {message: "Property title is required"}}},
                    property_price: {
                        validators: {
                            notEmpty: {message: "Property price is required"},
                            digits: {message: "price must contain only digits"},
                        }
                    },
                    currency_type: {validators: {notEmpty: {message: "Please currency type"}}},
                    property_area: {validators: {notEmpty: {message: "Property area is required"}}},
                    area_unit: {validators: {notEmpty: {message: "Please select area unit"}}},
                    long_description: {validators: {notEmpty: {message: "Property description is required"}}},
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),a.push(FormValidation.formValidation(i, {
                fields: {
                    location: {validators: {notEmpty: {message: "Property location is required"}}},
                    city: {validators: {notEmpty: {message: "Property city is required"}}},
                    country: {validators: {notEmpty: {message: "Property country is required"}}},
                    longitude: {validators: {notEmpty: {message: "longitude is required"}}},
                    latitude: {validators: {notEmpty: {message: "latitude is required"}}},
                    contact_number: {validators: {notEmpty: {message: "contact number is required"}}},
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),a.push(FormValidation.formValidation(i, {
                fields: {
                    card_fname: {validators: {notEmpty: {message: "Name on card is required"}}},
                    cardf_number: {
                        validators: {
                            notEmpty: {message: "Card member is required"},
                            creditCard: {message: "Card number is not valid"}
                        }
                    },
                    card_expiryf_month: {validators: {notEmpty: {message: "Month is required"}}},
                    card_expifry_year: {validators: {notEmpty: {message: "Year is required"}}},
                    card_cfvv: {
                        validators: {
                            notEmpty: {message: "CVV is required"},
                            digits: {message: "CVV must contain only digits"},
                            stringLength: {min: 3, max: 4, message: "CVV must contain 3 to 4 digits only"}
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })), o.addEventListener("click", (function (e) {
                a[3].validate().then((function (t) {
                    console.log("validated!"), "Valid" == t ? (e.preventDefault(), o.disabled = !0, o.setAttribute("data-kt-indicator", "on"), setTimeout((function () {
                        o.removeAttribute("data-kt-indicator"), o.disabled = !1, r.goNext(),
                            $("#kt_create_property_form").submit();
                    }), 2e3)) : Swal.fire({
                        text: "Sorry, looks likeff there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {confirmButton: "btn btn-light"}
                    }).then((function () {
                        KTUtil.scrollTop()
                    }))
                }))
            })), $(i.querySelector('[name="area_unit"]')).on("change", (function () {
                a[3].revalidateField("area_unit")
            })), $(i.querySelector('[name="city"]')).on("change", (function () {
                a[4].revalidateField("city")
            })), $(i.querySelector('[name="country"]')).on("change", (function () {
                a[4].revalidateField("country")
            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTCreateProperty.init()
}));
