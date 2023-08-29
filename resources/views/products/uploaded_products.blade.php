@extends('layouts.master')
@section('title', 'Home')

@section('main_content')
<table id="kt_datatable_example_1" class="table table-row-bordered gy-5">
    <thead>
        <tr class="fw-bold fs-6 text-muted">
            <th>SKU</th>
            <th>Product Name</th>
            <th>Description</th>

        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
        </tr>

    </tbody>

</table>
@endsection