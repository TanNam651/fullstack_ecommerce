<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\View;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $inputEmail;

    /**
     * Create a new message instance.
     */
    public function __construct($inputEmail)
    {
        $this->inputEmail = $inputEmail;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Send Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.name',
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

    public function build(): SendMail
    {
        return $this->view('TemplateEmail.'. $this->inputEmail['template'], ['name' => $this->name]);
    }

    public function render(): string
    {
        return View::make('TemplateEmail.VerifyTemplate',['code'=>$this->inputEmail['code']])->render();
    }
}
