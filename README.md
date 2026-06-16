Este projeto consiste em um protótipo de fórum web funcional, ideal para estudos de integração entre sistemas. Ele foi desenvolvido com uma arquitetura separada entre cliente e servidor, permitindo que os usuários criem contas, façam login, publiquem posts e comentem em publicações.

Foi utilizado Flask para elaborar uma API local em python, permitindo a persistência de dados e simular mais fielmente um fórum. O local escolhido para armazenar estes dados foi um arquivo json local, então sob hipótese alguma ponha dados sensíveis neste projeto.

Para rodar o projeto é necessário instalar as biblitecas no requirement.txt, como também inserir o seguinte comando no terminal para iniciar a API:
python server/main.py

Se o index.html não abrir ao rodar o comando acima, será necessário abrir manualmente a arquivo na pasta cliente.
