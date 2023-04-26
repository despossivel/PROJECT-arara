Hoje, refleti sobre a possibilidade de se comunicar com o ChatGPT usando a fala como linguagem natural. Decidi iniciar uma prova de conceito (POC) para dar voz ao ChatGPT, utilizando recursos de Machine Learning e nuvem.

Minha ideia é usar dois serviços da AWS: o Transcribe, que converte áudio em texto, e o Polly, que converte texto em áudio. O Transcribe será responsável por receber nossa entrada de microfone e convertê-la em texto, enquanto o Polly irá receber a resposta do ChatGPT e devolver o conteúdo em um arquivo de áudio. Para gerenciar esses fluxos de entrada e saída na comunicação entre o cliente e a nuvem, será necessário uma lambda.

Este é um esboço inicial e estou aberto a sugestões e colaborações de pessoas que também acham essa ideia empolgante. É possível que alguns detalhes mudem nas próximas publicações.



---------




Atualização sobre o projeto de POC para criar um canal de comunicação por voz com o ChatGPT e sintetizar em voz suas respostas:

Inicialmente, planejamos utilizar alguns serviços da AWS para resolver nosso fluxo de texto para áudio e de áudio para texto. No entanto, infelizmente, minha conta na AWS foi suspensa sem motivo aparente até o momento.

Como o objetivo ainda se mantém, decidimos usar a GCP. Dessa forma, no lugar do Polly, vamos utilizar o Text to Speech, e no lugar do Transcribe, vamos utilizar o Speech to Text.

Além disso, uma novidade é que decidimos incluir um front-end, que será o nosso "Memo Voice", com a responsabilidade de captar o stream do microfone.


-------------

Atualização sobre o projeto POC para criar um canal de comunicação por voz com o ChatGPT e sintetizar suas respostas em voz:

Já foram desenvolvidos dois scripts isolados: text-to-speech.js e speech-to-text.js. 

Com o text-to-speech.js, agora é possível sintetizar uma string de texto em voz. Ele funciona recebendo um objeto de entrada com o texto a ser sintetizado, enviando uma solicitação para a API do Google Cloud Text-to-Speech e recebendo um buffer de áudio em resposta. Em seguida, o buffer é tratado e um arquivo .wav é criado.

O speech-to-text.js, por sua vez, tem a responsabilidade contrária. Ele pega um arquivo .wav gerado, extrai o buffer do arquivo, converte para base64 e o envia para a API do Google Cloud Speech-to-Text, que retorna um objeto de resultados.

A próxima etapa é construir o backend para gerenciar o fluxo de entrada e saída e procurar um memo voice para integrar com o ChatGPT.

Este é apenas um esboço inicial, e estou aberto a sugestões e colaborações de pessoas que também acreditam nessa ideia empolgante. É possível que alguns detalhes mudem nas próximas atualizações.