<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailer Files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $message = trim($data['message'] ?? '');

    if (
        empty($name) ||
        empty($email) ||
        empty($phone) ||
        empty($message)
    ) {
        echo json_encode([
            'success' => false,
            'error' => 'All fields are required.'
        ]);
        exit;
    }

    $mail = new PHPMailer(true);

    /*
    |--------------------------------------------------------------------------
    | SMTP SETTINGS
    |--------------------------------------------------------------------------
    */

    // $mail->isSMTP();

    // $mail->Host = 'mail.gtnomads.com';
    // $mail->SMTPAuth = true;

    // $mail->Username = 'contact@gtnomads.com';
    // $mail->Password = 'YOUR_EMAIL_PASSWORD';

    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    // $mail->Port = 465;
     $mail->isSMTP();

    // CHANGE THESE VALUES
    $mail->Host = 'mail.gtnomads.com';
$mail->SMTPAuth = true;

$mail->Username = 'contact@gtnomads.com';
$mail->Password = 'gtNomads@123';

$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port = 465;

    $mail->CharSet = 'UTF-8';

    /*
    |--------------------------------------------------------------------------
    | FROM / TO
    |--------------------------------------------------------------------------
    */

    $mail->setFrom(
        'contact@gtnomads.com',
        'GT Nomads Website'
    );

    $mail->addAddress(
        'andre@gtnomads.com'
    );

    $mail->addReplyTo(
        $email,
        $name
    );

    /*
    |--------------------------------------------------------------------------
    | EMAIL CONTENT
    |--------------------------------------------------------------------------
    */

    $mail->isHTML(true);

    $mail->Subject = 'New Contact Form Inquiry - GT Nomads';

    $mail->Body = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body{
                font-family:Arial,sans-serif;
                background:#f5f5f5;
                padding:20px;
            }

            .container{
                max-width:700px;
                margin:auto;
                background:#ffffff;
                border-radius:10px;
                overflow:hidden;
                box-shadow:0 0 15px rgba(0,0,0,0.1);
            }

            .header{
                background:#111827;
                color:#fff;
                padding:25px;
                text-align:center;
            }

            .content{
                padding:30px;
            }

            .row{
                margin-bottom:18px;
            }

            .label{
                font-weight:bold;
                color:#111827;
            }

            .footer{
                text-align:center;
                background:#f3f4f6;
                padding:20px;
                font-size:13px;
            }
        </style>
    </head>

    <body>

        <div class="container">

            <div class="header">
                <h2>New Contact Inquiry</h2>
            </div>

            <div class="content">

                <div class="row">
                    <div class="label">Name</div>
                    '.$name.'
                </div>

                <div class="row">
                    <div class="label">Email</div>
                    '.$email.'
                </div>

                <div class="row">
                    <div class="label">Phone</div>
                    '.$phone.'
                </div>

                <div class="row">
                    <div class="label">Message</div>
                    '.nl2br($message).'
                </div>

            </div>

            <div class="footer">
                GT Nomads Contact Form Submission
            </div>

        </div>

    </body>
    </html>';

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully.'
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}