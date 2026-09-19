<?php

require_once "config.php";


/*
|--------------------------------------------------------------------------
| CHECK ADMIN SESSION
|--------------------------------------------------------------------------
*/

if (
    empty($_SESSION["admin_logged_in"]) ||
    $_SESSION["admin_logged_in"] !== true ||
    empty($_SESSION["admin_id"])
) {

    http_response_code(401);

    jsonResponse(
        false,
        "Unauthorized. Admin login required."
    );
}


/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

jsonResponse(
    true,
    "Admin authenticated.",
    [
        "admin" => [
            "id" =>
                (int) $_SESSION["admin_id"],

            "username" =>
                $_SESSION["admin_username"] ?? ""
        ]
    ]
);

?>