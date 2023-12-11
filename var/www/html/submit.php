<?php
//phpinfo();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $folder = "/var/www/uploads/";
    $allowedTypes = array(
        "application/zip",
        "application/x-zip",
        "application/octet-stream",
        "application/x-zip-compressed"
    );

//    echo "<pre>" . print_r($_FILES, true) . "</pre>";
    foreach($_FILES as $serverType => $fileArray) {
        for ($i = 0; $i < count($_FILES[$serverType]['name']); $i++) {
            if ($_FILES[$serverType]['error'][$i]['files'] === 0 && $_FILES[$serverType]['size'][$i]['files'] > 0) {
                $current_path = $_FILES[$serverType]['tmp_name'][$i]['files'];
                $file_name = basename($_FILES[$serverType]['name'][$i]['files']);
                $dest_path = $folder . $file_name;
                $file_type = $_FILES[$serverType]['type'][$i]['files'];
        		if (in_array($file_type, $allowedTypes)) {
                    if (move_uploaded_file($current_path, $dest_path)) {
                        echo "File uploaded successfully to: " . $dest_path . "<br>";
                        $_FILES[$serverType]['full_path'][$i]['files'] = $dest_path;
                    } else {
                        echo "Error uploading file to: " . $dest_path . "<br>";
                    }
                } else {
                    echo ".ZIP files are the only accepted format.<br>";
                    //don't submit JSON produce error
                }
            }
        }
    }

    echo "<pre>" . print_r($_FILES, true) . "</pre>";


    // Saving $_POST data to a JSON file
    $jsonPostData = json_encode($_POST, JSON_PRETTY_PRINT);
    $jsonFilesData = json_encode($_FILES, JSON_PRETTY_PRINT);

    $jsonPostPath = '/var/www/uploads/infra_variables.json';
    $jsonFilesPath = '/var/www/uploads/infra_files.json';

    file_put_contents($jsonPostPath, $jsonPostData);
    file_put_contents($jsonFilesPath, $jsonFilesData);

    //shell_exec('python3 /etc/ansible/handler/main.subproccess.py > /tmp/py.log 2> /tmp/error.log');
}
?>
