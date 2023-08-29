<?php

namespace App\Imports;

use App\Jobs\ProcessProductImport;
use App\Mail\DuplicateSkuNotification;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class ImportProducts implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function model(array $row)
    {

        // Perform custom validation
        $validator = Validator::make($row, [
            // 'handle' => 'required|string',
            // 'body' => 'required|string',
            // 'type' => 'required|string',
            // 'published' => 'required',
        ]);

        $existingProduct = DB::table('products')->where('sku', $row['handle'])->first();

        if ($existingProduct) {
            $this->sendDuplicateSkuEmail($row['handle']);
            return null; // Return null to indicate no model creation
        }

        if ($existingProduct) {
            return ['error' => 'SKU already exists: ' . $row['sku']];
        }

        ProcessProductImport::dispatch([$row]);

        return null; // Return null to indicate no model creation
    }

    public function batchSize(): int
    {
        return 100;
    }

    public function headingRow(): int
    {
        return 1;
    }

    // private function sendDuplicateSkuEmail($sku)
    // {
    //     $recipient = 'xxyz@gmail.com';
    //     $subject = 'Duplicate SKU Detected';
    //     $message = "A product with SKU {$sku} already exists in the database.";

    //     Mail::raw($message, function ($mail) use ($recipient, $subject) {
    //         $mail->to($recipient)->subject($subject);
    //     });
    // }

    private function sendDuplicateSkuEmail($sku)
    {
        $recipient = 'faizankhan619.fk@gmail.com';

        Mail::to($recipient)->send(new DuplicateSkuNotification($sku));
    }
}
