<?php

require_once "config.php";

/*
|--------------------------------------------------------------------------
| UPDATE PAYMENT STATUS
|--------------------------------------------------------------------------
| Admin only
|
| Allowed statuses:
| pending
| verified
| rejected
|--------------------------------------------------------------------------
*/


// ---------------------------------------------------------
// ONLY POST
// ---------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, "Only POST request is allowed.");
}


// ---------------------------------------------------------
// CHECK ADMIN SESSION
// ---------------------------------------------------------

if (
    !isset($_SESSION['admin_id']) ||
    empty($_SESSION['admin_id'])
) {
    http_response_code(401);

    jsonResponse(
        false,
        "Unauthorized. Admin login is required."
    );
}


// ---------------------------------------------------------
// GET DATA
// ---------------------------------------------------------

$id = isset($_POST['id'])
    ? (int) $_POST['id']
    : 0;

$payment_status = strtolower(
    trim($_POST['payment_status'] ?? '')
);


// ---------------------------------------------------------
// VALIDATE ID
// ---------------------------------------------------------

if ($id <= 0) {
    jsonResponse(
        false,
        "Invalid student registration ID."
    );
}


// ---------------------------------------------------------
// VALIDATE STATUS
// ---------------------------------------------------------

$allowed_statuses = [
    'pending',
    'verified',
    'rejected'
];

if (!in_array($payment_status, $allowed_statuses, true)) {
    jsonResponse(
        false,
        "Invalid payment status."
    );
}


// ---------------------------------------------------------
// CHECK STUDENT EXISTS
// ---------------------------------------------------------

$check_stmt = $conn->prepare(
    "SELECT id
     FROM students
     WHERE id = ?
     LIMIT 1"
);

if (!$check_stmt) {
    http_response_code(500);

    jsonResponse(
        false,
        "Database query preparation failed."
    );
}

$check_stmt->bind_param(
    "i",
    $id
);

$check_stmt->execute();

$check_result = $check_stmt->get_result();

if ($check_result->num_rows !== 1) {

    $check_stmt->close();

    jsonResponse(
        false,
        "Registration not found."
    );
}

$check_stmt->close();


// ---------------------------------------------------------
// UPDATE PAYMENT STATUS
// ---------------------------------------------------------

$update_stmt = $conn->prepare(
    "UPDATE students
     SET payment_status = ?
     WHERE id = ?"
);

if (!$update_stmt) {
    http_response_code(500);

    jsonResponse(
        false,
        "Could not prepare update query."
    );
}

$update_stmt->bind_param(
    "si",
    $payment_status,
    $id
);

$success = $update_stmt->execute();


// ---------------------------------------------------------
// RESPONSE
// ---------------------------------------------------------

if (!$success) {

    $update_stmt->close();

    http_response_code(500);

    jsonResponse(
        false,
        "Could not update payment status."
    );
}

$update_stmt->close();


// ---------------------------------------------------------
// SUCCESS
// ---------------------------------------------------------

jsonResponse(
    true,
    "Payment status updated successfully.",
    [
        "student_id" => $id,
        "payment_status" => $payment_status
    ]
);

?>