<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ImportProducts;

class ProductImportController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'excelFile' => 'required|mimes:xls,xlsx,csv'
        ]);
        try {
            Excel::import(new ImportProducts(), $request->file('excelFile'));
            return redirect('/upload')->with('success', 'Excel file imported successfully.');
        } catch (\Exception $e) {
            dd($e);
            return redirect('/upload')->with('error', 'An error occurred while importing the Excel file.');
        }
    }
}
