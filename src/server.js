import app from "./app";
const port = 8080;

// Estabelecer conexões na porta especificados

app.listen(port,()=>{
    console.log("Servidor conectado com sucesso na porta "+port);
});

