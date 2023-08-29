<!--begin::Javascript-->
<script>
    var hostUrl = "assets/";
</script>
<!--begin::Global Javascript Bundle(used by all pages)-->
<script src="{{ asset('static/plugins/global/plugins.bundle.js') }}"></script>
<script src="{{ asset('static/js/scripts.bundle.js') }}"></script>
<!--end::Global Javascript Bundle-->
<!--begin::Page Vendors Javascript(used by this page)-->
<script src="{{ asset('static/plugins/custom/datatables/datatables.bundle.js') }}"></script>
<script src="{{ asset('static/plugins/custom/formrepeater/formrepeater.bundle.js')}}"></script>
<script src="{{ asset('static/plugins/custom/vis-timeline/vis-timeline.bundle.js') }}"></script>
<!--end::Page Vendors Javascript-->
<!--begin::Page Custom Javascript(used by this page)-->
<script src="{{ asset('static/js/widgets.bundle.js') }}"></script>
<script src="{{ asset('static/js/custom/widgets.js') }}"></script>



<!--end::Page Custom Javascript-->

<script>
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toastr-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    @if(Session::has("success"))
    toastr.success("{{ Session::get("success") }}");
    @endif
    @if(Session::has("error"))
    toastr.error("{{ Session::get("error") }}");
    @endif
    @if(Session::has("info"))
    toastr.info("{{ Session::get("info") }}");
    @endif
    @if(Session::has("warning"))
    toastr.warning("{{ Session::get("warning") }}");
    @endif
</script>
<!--end::Javascript-->