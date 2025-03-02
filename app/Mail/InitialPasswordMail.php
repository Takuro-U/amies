<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InitialPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    // public $initialPassword;
    
    public function __construct($initialPassword)
    {
        $this->initialPassword = $initialPassword;
    }

    public function build()
    {
        return $this->subject("AMie's 仮登録完了のお知らせ")
                    ->markdown('emails.initial_password')
                    ->with(['initial_password' => $this->initialPassword]);
    }
}