<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\SendMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Resend\Laravel\Facades\Resend;


class ResendMailController extends Controller
{
    public function send(Request $request):JsonResponse
    {
        $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        Resend::emails()->send([
            'from'=>'onboarding@resend.dev',
            'to'=>[$request->to],
            'subject'=>$request->subject,
            'html'=>(new SendMail("
                <h1>{$request->subject}</h1>
                <p>{$request->name}</p>"))->render(),
        ]);

        return response()->json([
            'message' => 'Email sent successfully'
        ], 200);
    }

    public function sendEmailWithData($data)
    {
        Resend::emails()->send([
            'from'=>'onboarding@resend.dev',
            'to'=>[$data['to']],
            'subject'=>$data['subject'],
            'html'=>(new SendMail(['code'=>$data['code']]))->render(),
        ]);
    }
}
