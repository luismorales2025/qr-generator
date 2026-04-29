const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {

    // Si viene texto
    if(event.headers["content-type"] === "application/json"){
        const { texto } = JSON.parse(event.body);

        const fileContent = Buffer.from(texto);

        // Subir como TXT (simula documento)
        const form = new FormData();
        form.append("file", fileContent, "documento.txt");

        const res = await fetch("https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/raw/upload", {
            method: "POST",
            body: form
        });

        const data = await res.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ url: data.secure_url })
        };
    }

    // Si viene archivo
    return {
        statusCode: 200,
        body: JSON.stringify({
            url: "https://ejemplo.com/archivo.pdf"
        })
    };
};