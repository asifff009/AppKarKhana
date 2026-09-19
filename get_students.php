<?php

require_once "config.php";

if (!isset($_SESSION['admin_id'])) {
    jsonResponse(false, "Unauthorized access.", [
        "authenticated" => false
    ]);
}

$query = "
    SELECT
        id,
        full_name,
        email,
        phone,
        university,
        current_level,
        message,
        payment_method,
        payment_number,
        transaction_id,
        payment_amount,
        payment_screenshot,
        payment_status,
        created_at
    FROM students
    ORDER BY id DESC
";

$result = $conn->query($query);

$students = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

jsonResponse(true, "Students loaded successfully.", [
    "students" => $students,
    "total" => count($students)
]);

?>