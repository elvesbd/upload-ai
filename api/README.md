# Upload IA API

Esta API foi desenvolvida durante a NLW IA promovida pela [Rocketseat](https://www.rocketseat.com.br/) e permite o upload de arquivos de vídeos .mp3, a transcrição de áudio e a geração de resumos com base na transcrição utilizando a [OpenAI](https://openai.com/).

## Rotas

### 1. Upload de Vídeo

Rota para fazer o upload de um vídeo .mp3.

- **Endpoint:** `/videos`
- **Método:** `POST`
- **Parâmetros de Requisição:**
  - `file` (video.mp3) - O arquivo de vídeo a ser transcritado.
- **Headers de Requisição:**
  - `Content-Type` - `multipart/form-data`.
- **Exemplo de Requisição:**
  ```bash
  curl -X POST -H "Content-Type: multipart/form-data" -F "file=@audio.mp3" http://localhost:{port}/videos
  ```

### 2. Criar Transcrição de Vídeo

Rota para fazer a transcrição do vídeo .mp3.

- **Endpoint:** `/videos/{videoId}/transcriptions`
- **Método:** `POST`
- **Corpo da Requisição (JSON):**
  - `prompt` (string) - Mensagem de prompt para a transcrição.
- **Exemplo de Requisição:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Transcreva o conteúdo do vídeo."}' http://localhost:{port}/videos/{videoId}/transcriptions
  ```

### 3. Gerar Resumo da Transcrição de Vídeo

Rota para fazer a geração do resumo da transcrição do vídeo .mp3.

- **Endpoint:** `/generate-transcription`
- **Método:** `POST`
- **Corpo da Requisição (JSON):**
  - `videoId` (string) - ID do vídeo para a transcrição.
  - `template` (string) - Ponto de partida ou guia para a geração de texto.
  - `temperature` (number) - Grau de aleatoriedade na geração de texto.
- **Exemplo de Requisição:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d
  '{
    "videoId": "f043d4d1-8ad2-4680-acec-d19e942fbbc9",
    "template": "Gere um resumo sucinto da transcrição a seguir: '''{transcription}'''",
    "temperature": 0.5
   }' http://localhost:{port}/generate-transcription
  ```

## Tecnologias Utilizadas

Esta aplicação foi desenvolvida utilizando as seguintes tecnologias e bibliotecas:

- **Node.js:** Plataforma de execução de JavaScript do lado do servidor.
- **OpenAI:** Integração com a plataforma de inteligência artificial da OpenAI para processamento de linguagem natural.

## Conclusão

Este projeto demonstra o uso da openai como ferramenta que pode ser integrada de forma simples em seus projetos, O projeto que desenvolvi segue um padrão um pouco deferente do que foi desenvolvido no evento. Eu procurei separa melhor as responsabilidades deixando o código mais limpo e legível.

Para quaisquer dúvidas ou comentários, sinta-se à vontade para entrar em contato!

## 🤝 Colaborador

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/elvesbd.png" width="100px;" alt="Foto do Elves Brito no GitHub"/><br>
        <sub>
          <b>Elves Brito</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
