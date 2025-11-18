const btn_enviar = document.getElementById('btn_enviar')


btn_enviar.addEventListener('click', async () => {
    const nome = document.getElementById('input_nome').value
    const email = document.getElementById('input_email').value
    const assunto = document.getElementById('input_assunto').value
    const tell = document.getElementById('input_tell').value
    const mensagem = document.getElementById('input_msg').value

    const resposta = await fetch(`http://localhost:3000/contate`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "nome": nome,
            "email": email,
            "telefone": tell,
            "assunto": assunto,
            "mensagem": mensagem
        })
    })
    if (resposta.ok == true) {
        const dados = await resposta.json()
        document.getElementById('resultado').innerText = dados.resposta
    } else {
        const dados = await resposta.json()
        document.getElementById('resultado').innerText = dados.resposta
    }
})