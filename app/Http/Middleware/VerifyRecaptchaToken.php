<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class VerifyRecaptchaToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $recaptcha = new \ReCaptcha\ReCaptcha(env('GOOGLE_RECAPTCHA_SERVER_KEY'));
        $response = $recaptcha
            // ->setScoreThreshold(env('APP_ENV') === 'production' && 0.1)
            ->verify($request->input('g-recaptcha-response'), $request->ip());

        // return $response;
        if ($response->isSuccess()) {
            return $next($request);
        } else {
            Log::notice(['captcha verify fail', $response->getErrorCodes()], ["request by" => $request->ip()]);
            return back()->withErrors([trans('server.recaptcha')], 500);
        }
    }
}
