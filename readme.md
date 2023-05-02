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


---------------


Atualização do projeto POC para criar um canal de comunicação por voz com o ChatGPT e sintetizar suas respostas em voz:

Já temos um servidor WebSocket para fazer o streaming de áudio entre o cliente e o servidor. Nosso objetivo é converter a entrada de áudio do microfone em texto, enviar o comando para o ChatGPT, receber sua resposta e sintetizá-la em voz.

No entanto, tivemos alguns problemas ao longo do caminho que gostaríamos de destacar aqui. Um dos principais problemas que encontramos foi com arquivos de áudio WAV que estavam chegando corrompidos no servidor. Inicialmente, estávamos recebendo o Base64 do áudio em um JSON, mas o arquivo de áudio criado do lado do servidor era inválido. Como resultado, iniciamos algumas discussões sobre as melhores práticas para transportar o áudio para o servidor sem perdas. Eventualmente, construímos um servidor que recebe o arquivo de áudio por um FormData e retorna a voz do GPT sintetizada por um stream de áudio.

Esta é uma iniciativa de esforço inicial, e estamos abertos a sugestões e colaborações de pessoas que também acreditam nessa ideia empolgante. É possível que alguns detalhes mudem nas próximas atualizações, mas estamos animados com o progresso que fizemos até agora e esperamos continuar a avançar neste projeto promissor.


----------------

Atualização do projeto POC para criação de um canal de comunicação por voz com o ChatGPT e sintetização de suas respostas em voz:

Apresentamos a nossa POC para a criação de um canal de comunicação por voz com o ChatGPT. A seguir, compartilhamos algumas anotações sobre o projeto, suas dificuldades e próximos passos.

Nosso objetivo era criar uma POC para um canal de comunicação por voz com o ChatGPT. Disponibilizamos o nosso repositório do laboratório, que contém anotações diversas, tentativas que não deram certo, exemplos e outros repositórios e projetos utilizados como referência.

O resultado obtido foi satisfatório para a nossa equipe, apesar de o áudio recebido do Text-To-Speech apresentar atraso na fala, por decisão intencional do nosso time, para testes. 

A maior dificuldade que enfrentamos durante as quatro madrugadas de trabalho foi transferir o buffer do microfone para o servidor. Depois de muitas tentativas e discussões sobre boas práticas, conseguimos chegar a um resultado satisfatório.

Com esse projeto, atingimos nosso objetivo e agora estamos planejando os próximos passos para construir um MVP com foco em assistência pessoal. 

Essa é uma iniciativa de esforço inicial, e estamos abertos a sugestões e colaborações de pessoas que também acreditam nessa ideia empolgante. É possível que alguns detalhes mudem nas próximas atualizações, mas estamos animados com o progresso que fizemos até agora e esperamos continuar avançando nesse projeto promissor.