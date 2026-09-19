<?php

require_once "config.php";

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(
        false,
        "Only GET request is allowed."
    );
}


/*
|--------------------------------------------------------------------------
| GET ID + ACCESS TOKEN
|--------------------------------------------------------------------------
*/

$student_id = trim(
    $_GET['id'] ?? ''
);

$access_token = trim(
    $_GET['token'] ?? ''
);


/*
|--------------------------------------------------------------------------
| VALIDATE ID
|--------------------------------------------------------------------------
*/

if ($student_id === '') {
    jsonResponse(
        false,
        "Registration ID is required."
    );
}

if (!ctype_digit($student_id)) {
    jsonResponse(
        false,
        "Invalid Registration ID."
    );
}


/*
|--------------------------------------------------------------------------
| VALIDATE TOKEN
|--------------------------------------------------------------------------
*/

if ($access_token === '') {
    jsonResponse(
        false,
        "Private access token is required."
    );
}

if (!preg_match(
    '/^[a-f0-9]{64}$/i',
    $access_token
)) {
    jsonResponse(
        false,
        "Invalid access token."
    );
}


$student_id = (int) $student_id;


/*
|--------------------------------------------------------------------------
| FIND STUDENT USING BOTH ID + TOKEN
|--------------------------------------------------------------------------
|
| IMPORTANT:
| ID alone is NOT enough.
|
*/

$stmt = $conn->prepare(
    "SELECT
        id,
        full_name,
        email,
        phone,
        university,
        current_level,
        payment_method,
        payment_number,
        transaction_id,
        payment_amount,
        payment_status,
        created_at
     FROM students
     WHERE id = ?
       AND access_token = ?
     LIMIT 1"
);


if (!$stmt) {
    jsonResponse(
        false,
        "Unable to prepare database query."
    );
}


$stmt->bind_param(
    "is",
    $student_id,
    $access_token
);


$stmt->execute();

$result = $stmt->get_result();


/*
|--------------------------------------------------------------------------
| INVALID ID OR TOKEN
|--------------------------------------------------------------------------
|
| We intentionally use the same message.
| This prevents revealing whether a particular
| Registration ID exists.
|
*/

if ($result->num_rows !== 1) {
    jsonResponse(
        false,
        "Registration ID or access token is invalid."
    );
}


$student = $result->fetch_assoc();


/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

jsonResponse(
    true,
    "Registration found.",
    [
        "student" => $student
    ]
);

?>