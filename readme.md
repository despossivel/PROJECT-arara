hoje refleti sobre o seguinte cenário; Vamos pode se comunicar com o ChatGPT através da linguagem natural que é a fala? Pensando nisso decidi iniciar uma POC capaz de da voz ao chatGPT, e como isso vai funcionar?



Utilizarei alguns recusos de Machinelearning e cloud para ajudar nessa tarefa.



fiz um rascunho de como seria essa arquitetura e fluxo de dados baseado em dois servicos da AWS, sendo eles; 



AWS Transcribe capaz de converter arquivos de audio em texto; ele vai ser responsavel por receber nossa entrada de microfone e converter em texto.



eo 



AWS Polly capaz de converter texto em audio; ele vai ser responsável por receber a resposta do chatGPT e devolver o contudo em um arquivo de audio.





e vamos precisar de uma lambda que vai ficar responsável por gerenciar esses fluxos de entrada/saida na comunicada entre o cliente e nossa nuvem. 





este é o escopo de uma ideia embrionaria, algumas coisas podem mudar nas proximas publicacoes, assim como estou aberto a sujestoes e colaboracao de pessoas que acham essa ideia empolgante. 