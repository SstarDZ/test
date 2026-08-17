<?php
if (isset($_FILES['image'])) {
    $targetDir = "img/";
    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["imagePath" => $targetFilePath]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "فشل رفع الصورة"]);
    }
}
?>