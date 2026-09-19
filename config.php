<?php

/*
|--------------------------------------------------------------------------
| DATABASE CONFIGURATION
|--------------------------------------------------------------------------
*/

$host = "localhost";
$dbname = "appkarkhana";
$dbuser = "root";
$dbpass = "";


/*
|--------------------------------------------------------------------------
| DATABASE CONNECTION
|--------------------------------------------------------------------------
*/

$conn = new mysqli(
    $host,
    $dbuser,
    $dbpass,
    $dbname
);

if ($conn->connect_error) {

    http_response_code(500);

    header("Content-Type: application/json; charset=UTF-8");

    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);

    exit;
}

$conn->set_charset("utf8mb4");


/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

$allowed_origin = "http://localhost:5173";

if (isset($_SERVER["HTTP_ORIGIN"])) {

    if ($_SERVER["HTTP_ORIGIN"] === $allowed_origin) {

        header(
            "Access-Control-Allow-Origin: " .
            $allowed_origin
        );

        header(
            "Access-Control-Allow-Credentials: true"
        );

        header(
            "Access-Control-Allow-Headers: Content-Type"
        );

        header(
            "Access-Control-Allow-Methods: GET, POST, OPTIONS"
        );
    }
}


/*
|--------------------------------------------------------------------------
| OPTIONS REQUEST
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);

    exit;
}


/*
|--------------------------------------------------------------------------
| JSON RESPONSE HELPER
|--------------------------------------------------------------------------
*/

function jsonResponse(
    $success,
    $message,
    $data = []
) {

    header(
        "Content-Type: application/json; charset=UTF-8"
    );

    echo json_encode(
        array_merge(
            [
                "success" => $success,
                "message" => $message
            ],
            $data
        )
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| START SESSION
|--------------------------------------------------------------------------
*/

if (session_status() === PHP_SESSION_NONE) {

    session_set_cookie_params([
        "lifetime" => 0,
        "path" => "/",
        "secure" => false,
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    session_start();
}

?>