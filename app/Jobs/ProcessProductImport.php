<?php

namespace App\Jobs;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessProductImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $data;
    /**
     * Create a new job instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $products = collect($this->data)->map(function ($row) {
            return new Product([
                'title' => $row['title'] ?? "",
                'description' => $row['body'] ?? "",
                'sku' => $row['handle'] ?? "",
                'type' => $row['type'] ?? "",
                'status' => $row['published'] ?? "",
            ]);
        });


        Product::insert($products->toArray());
    }
}
