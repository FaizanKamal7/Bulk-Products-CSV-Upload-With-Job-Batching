@extends('layouts.master')
@section('title', 'Home')

@section('main_content')
<!--begin::Post-->
<div class="post d-flex flex-column-fluid" id="kt_post">
    <!--begin::Container-->
    <div id="kt_content_container" class="container-fluid">
        <!--begin::Row-->
        <h1>Upload Excel Sheet</h1>
        <hr>
        <form action="{{ route('import.excel') }}" method="post" enctype="multipart/form-data">
            @csrf
            <label for="excelFile">Choose an Excel file:</label>
            <br>
            <br>
            <input type="file" id="excelFile" name="excelFile" accept=".xls, .xlsx" required>
            <br><br>

            <button type="submit" data-kt-contacts-type="submit" class="btn btn-primary float-right">Upload Now
            </button>
        </form>
    </div>
</div>
@endsection