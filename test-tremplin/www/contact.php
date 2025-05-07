<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

try {
    $pdo = new PDO("mysql:host=db;dbname=majordhom;charset=utf8", "root", "verysecurepassword");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("INSERT INTO contact_form (
        civility, last_name, first_name, email, phone,
        message_type, message, visit_day, visit_hour,
        visit_minute, selected_times
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->execute([
        $data['civility'],
        $data['lastName'],
        $data['firstName'],
        $data['email'],
        $data['phone'],
        $data['messageType'],
        $data['message'],
        $data['visitDay'],
        $data['visitHour'],
        $data['visitMinute'],
        json_encode($data['selectedTimes'])
    ]);

    echo json_encode(["success" => true, "message" => "Formulaire envoyé avec succès."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
?>
