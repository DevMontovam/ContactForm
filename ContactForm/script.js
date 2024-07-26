// Obter todos os elementos necessários
const form = document.querySelector("form"),
      statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
    e.preventDefault(); // Impedir o envio do formulário

    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block";

    let xhr = new XMLHttpRequest(); // Criar um novo objeto XMLHTTPRequest
    xhr.open("POST", "message.php", true); // Enviar solicitação POST para o arquivo message.php

    xhr.onload = () => { // Quando a resposta AJAX for carregada
        if (xhr.readyState == 4 && xhr.status == 200) { // Se o status da resposta AJAX for 200 e o estado estiver pronto
            let response = xhr.responseText; // Armazenar a resposta AJAX na variável response
            console.log("Server Response: ", response); // Exibir a resposta no console para depuração
            
            // Verificar o conteúdo da resposta
            if (response.includes("Email and message field is required!") ||
                response.includes("Sorry, failed to send your message!") ||
                response.includes("Enter a valid email address!")) {
                
                statusTxt.style.color = "red";
            } else {
                form.reset();
                setTimeout(() => {
                    statusTxt.style.display = "none";
                }, 3000); // Ocultar o statusTxt após 3 segundos se a mensagem for enviada
            }
            statusTxt.innerText = response;     
        }
    }

    xhr.onerror = () => {
        console.error("Request failed");
        statusTxt.style.color = "red";
        statusTxt.innerText = "An error occurred while sending the request.";
    };

    let formData = new FormData(form);
    xhr.send(formData);
}
