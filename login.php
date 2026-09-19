<?php

require_once "config.php";


/*
|--------------------------------------------------------------------------
| ONLY POST
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    jsonResponse(
        false,
        "Only POST request is allowed."
    );
}


/*
|--------------------------------------------------------------------------
| GET INPUT
|--------------------------------------------------------------------------
*/

$username = trim(
    $_POST["username"] ?? ""
);

$password = $_POST["password"] ?? "";


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

if (
    $username === "" ||
    $password === ""
) {

    jsonResponse(
        false,
        "Username and password are required."
    );
}


/*
|--------------------------------------------------------------------------
| FIND ADMIN
|--------------------------------------------------------------------------
*/

$stmt = $conn->prepare(
    "SELECT
        id,
        username,
        password_hash
     FROM admins
     WHERE username = ?
     LIMIT 1"
);


if (!$stmt) {

    jsonResponse(
        false,
        "Database query preparation failed."
    );
}


$stmt->bind_param(
    "s",
    $username
);

$stmt->execute();

$result = $stmt->get_result();


/*
|--------------------------------------------------------------------------
| CHECK USERNAME
|--------------------------------------------------------------------------
*/

if ($result->num_rows !== 1) {

    $stmt->close();

    jsonResponse(
        false,
        "Invalid username or password."
    );
}


$admin = $result->fetch_assoc();


/*
|--------------------------------------------------------------------------
| VERIFY PASSWORD
|--------------------------------------------------------------------------
*/

if (
    !password_verify(
        $password,
        $admin["password_hash"]
    )
) {

    $stmt->close();

    jsonResponse(
        false,
        "Invalid username or password."
    );
}


/*
|--------------------------------------------------------------------------
| REGENERATE SESSION ID
|--------------------------------------------------------------------------
*/

session_regenerate_id(true);


/*
|--------------------------------------------------------------------------
| CREATE ADMIN SESSION
|--------------------------------------------------------------------------
*/

$_SESSION["admin_id"] =
    (int) $admin["id"];

$_SESSION["admin_username"] =
    $admin["username"];

$_SESSION["admin_logged_in"] =
    true;

$_SESSION["login_time"] =
    time();


/*
|--------------------------------------------------------------------------
| CLOSE
|--------------------------------------------------------------------------
*/

$stmt->close();
$conn->close();


/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

jsonResponse(
    true,
    "Login successful.",
    [
        "admin" => [
            "id" =>
                (int) $admin["id"],

            "username" =>
                $admin["username"]
        ]
    ]
);

?>