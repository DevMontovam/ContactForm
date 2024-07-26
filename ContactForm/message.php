<?php
    //let's get all form values
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $website = isset($_POST['website']) ? $_POST['website'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';
    if(!empty($email) && !empty($message)){ //if email and message field is not empty
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){ //if user entered email is valid
        $receiver = "guilhermemsilva16@gmail.com"; //email receiver email address
        $subject = "From: $name <$email>"; //subject of the email. Subject looks like From: CodingNepal <abc@gmail.com>
        //merging concating all user values inside body variable. \n is used for new line
        $body = "Name: $name\nEmail: $email\nPhone: $phone\nWebsite: $website\n\nMessage: $message\n\nRegards, \n$name";
        $sent = mail($receiver, $subject, $body);

        // Verificar se o e-mail foi enviado com sucesso
        if($sent){
            echo "Message has been sent successfully!";
        } else {
            echo "Sorry, failed to send your message. Please check your SMTP settings.";
        }
    } else {
        echo "Enter a valid email address!";
    }
} else {
    echo "Email and message field is required!";
}
?>