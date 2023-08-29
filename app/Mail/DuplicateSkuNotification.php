<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DuplicateSkuNotification extends Mailable
{
    use Queueable, SerializesModels;
    public $sku;

    /**
     * Create a new message instance.
     */
    public function __construct($sku)
    {
        $this->sku = $sku;
    }

    public function build()
    {
        return $this->subject('Duplicate SKU Detected')
            ->view('emails.duplicate_sku_notification');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Duplicate Sku Notification',
            
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'products.upload_products',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
