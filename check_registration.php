<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Only POST request is allowed."
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| Database Connection
|--------------------------------------------------------------------------
*/

$host = "localhost";
$username = "root";
$password = "";
$database = "appkarkhana";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit;
}

$conn->set_charset("utf8mb4");

/*
|--------------------------------------------------------------------------
| Get Input
|--------------------------------------------------------------------------
*/

$registration_id = trim($_POST['registration_id'] ?? '');
$email = trim($_POST['email'] ?? '');

if ($registration_id === '' || $email === '') {
    echo json_encode([
        "success" => false,
        "message" => "Registration ID and email are required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

if (!ctype_digit($registration_id)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid registration ID."
    ]);
    exit;
}

$id = (int) $registration_id;

/*
|--------------------------------------------------------------------------
| Find Registration
|--------------------------------------------------------------------------
*/

$stmt = $conn->prepare(
    "SELECT
        id,
        full_name,
        email,
        university,
        current_level,
        payment_method,
        payment_amount,
        transaction_id,
        payment_status,
        created_at,
        updated_at
     FROM students
     WHERE id = ? AND email = ?
     LIMIT 1"
);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database query preparation failed."
    ]);
    exit;
}

$stmt->bind_param("is", $id, $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    echo json_encode([
        "success" => false,
        "message" => "No registration found with the provided information."
    ]);
    exit;
}

$student = $result->fetch_assoc();

/*
|--------------------------------------------------------------------------
| Response
|--------------------------------------------------------------------------
*/

echo json_encode([
    "success" => true,
    "message" => "Registration found successfully.",
    "student" => [
        "id" => (int) $student['id'],
        "full_name" => $student['full_name'],
        "email" => $student['email'],
        "university" => $student['university'],
        "current_level" => $student['current_level'],
        "payment_method" => $student['payment_method'],
        "payment_amount" => (float) $student['payment_amount'],
        "transaction_id" => $student['transaction_id'],
        "payment_status" => $student['payment_status'],
        "created_at" => $student['created_at'],
        "updated_at" => $student['updated_at']
    ]
]);

$stmt->close();
$conn->close();

?>