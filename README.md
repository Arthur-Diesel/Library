<h1 align="center">:open_book: Library</h1>
<h2 align="center">API Construída com Node, Express, JWT e outras bibliotecas.</h2>
<h3 align="left">:bulb: Introdução</h3>
<p align="left">A API tem o objetivo de simular uma biblioteca, possuindo 7 entidades, os bibliotecários, os usuários, os livros, os gêneros que estão relacionados com os livros, os idiomas que representam a língua em que os livros foram escritos, os autores e as nacionalidades, que representam o local de nascimento destes.</p>
<p align="left">Cada entidade possui metódos que podem ser acessados através de suas respectivas rotas.</p>
<h3 align="left">:busts_in_silhouette: Entidades</h3>

<h4 align="left">:bust_in_silhouette: Bibliotecário</h4>
<p align="left">O bibliotecário é a peça principal da API, pois, faz a administração do sistema, sendo assim, pode adicionar nacionalidades, que serão utilizadas para adicionar um autor, também pode acrescentar ao banco de dados, idiomas e gêneros, que serão empregados na criação de um novo livro e por fim, pode cadastrar novos bibliotecários, que também poderão utilizar as funções mencionadas.</p>
<h5 align="left">:bookmark_tabs: Rotas</h5>
<ul>
    <li>/api/bibliotecarios/entrar</li>
    <p>Utilizada para receber o <b>JWT</b> que será utilizado nas outras rotas para a autenticação do bibliotecário, para esse retorno é necessário passar o <b>email</b> e a <b>senha</b> do bibliotecário através do corpo da requisição.</p>
    <li>/api/bibliotecarios/cadastro</li>
    <p>Usada para o cadastro de um novo bibliotecário, para isso, é necessário passar o <b>JWT</b> atráves da cabeçalho da requisição e dos campos <b>nome</b>, <b>email</b> e <b>senha</b> através do corpo.</p>
    <li>/api/bibliotecarios/cadastrar_genero</li>
    <p>Aplicada no cadastro de um novo gênero, para isso, é necessário novamente, o <b>JWT</b> recebido através do login do funcionário no cabeçalho da requisição, também é necessário passar o <b>genero</b> através do corpo da requisição.
    <li>/api/bibliotecarios/deletar_genero</li>
    <p>Utilizada na remoção de um gênero, novamente é necessário o <b>JWT</b> e o <b>idGenero</b>.
    <li>/api/bibliotecarios/cadastrar_idioma</li>
    <p>Aplicada no cadastro de um novo idioma, é preciso do <b>JWT</b> e do <b>idioma</b>.</p>
    <li>/api/bibliotecarios/deletar_idioma</li>
    <p>Utilizada na remoção de um idioma, é preciso do <b>JWT</b> e do <b>idIdioma</b>.</p>
    <li>/api/bibliotecarios/cadastrar_livro</li>
    <p>Aplicada no cadastro de um livro, é necessário o <b>JWT</b>, o <b>titulo</b> do livro, o <b>idAutor</b>, o <b>ano</b>, a quantidade de <b>paginas</b>, o <b>idGenero</b> e o <b>idIdioma</b>.</p>
    <li>/api/bibliotecarios/deletar_livro</li>
    <p>Utilizada na remoção de um livro, é requisitado o <b>JWT</b> e o <b>idLivro</b>.</p>
    <li>/api/bibliotecarios/cadastrar_autor</li>
    <p>Aplicada no cadastro de um autor, é necessário o <b>JWT</b>, o seu <b>nome</b>, o seu <b>idNacionalidade</b> e sua <b>dataNascimento</b>, também pode ser passado sua <b>dataMorte</b>.</p>
    <li>/api/bibliotecarios/deletar_autor</li>
    <p>É aplicada na remoção de um autor, para isso, é neccessário o <b>JWT</b> e o <b>idAutor</b>.</p>
    <li>/api/bibliotecarios/alterar_data_morte_autor</li>
    <p>É utilizada quando um autor morre, para isso, é preciso do <b>JWT</b>, do <b>idAutor</b> e da <b>dataMorte</b>.</p>
    <li>/api/bibliotecarios/cadastrar_nacionalidade</li>
    <p>Usada para o cadastro de novas nacionalidades, é requisitado o <b>JWT</b> e a <b>nacionalidade</b>.</p>
    <li>/api/bibliotecarios/deletar_nacionalidade</li>
    <p>Utilizada para a remoção de uma nacionalidade que não está sendo mais utilizada, é necessário o <b>JWT</b> e o <b>idNacionalidade</b>.</p>
</ul>

<h4 align="left">:bust_in_silhouette: Usuário</h4>
<p align="left">É responsável pela utilização do sistema, sendo assim, possui o poder de, efetuar seu cadastro, entrar no sistema e com isso receber um JWT com permissão relacionada ao seu nível de acesso, emprestar um livro, devolver um livro, consultar seu saldo de dívida, consultar seus empréstimos e também pagar sua dívida caso a possua.</p>
<h5 align="left">:bookmark_tabs: Rotas</h5>
<ul>
    <li>/api/usuarios/entrar</li>
    <p>Utilizada para a obtenção do <b>JWT</b> que será necessário para a utilização das outras rotas. Para isso, é necessário, passar o <b>email</b> e a <b>senha</b> do usuário específico através do corpo da requisição.</p>
    <li>/api/usuarios/cadastro</li>
    <p>Necessária para a adição de novos usuários ao sistema, para isso, é necessário chamar o endpoint com o <b>nome</b>, o <b>email</b> e a <b>senha</b> do novo usuário a ser adicionado.</p>
    <li>/api/usuarios/emprestar_livro</li>
    <p>Responsável por alterar o status dos livros livres no banco de dados da biblioteca para 'Emprestado', para isso, é necessário o <b>JWT</b> e o <b>idLivro</b>.</p>
    <li>/api/usuarios/devolver_livro</li>
    <p>Utilizada na devolução de um livro, sendo assim, é necessário, informar o <b>JWT</b> e o <b>idEmprestimo</b>, que pode ser obtido na rota /api/usuarios/consultar_emprestimos.</p>
    <li>/api/usuarios/consultar_divida</li>
    <p>Necessária para a consulta de dívida relacionada ao usuário, para a consulta, é necessário informar o <b>JWT</b> obtido no login do usuário.</p>
    <li>/api/usuarios/consultar_emprestimos</li>
    <p>Necessária para a consulta de emprestímos relacionados ao usuário, para a consulta, é necessário informar o <b>JWT</b> obtido no login do usuário.</p>
    <li>/api/usuarios/pagar_divida</li>
    <p>Utilizada para a remoção inteira ou parcial da dívida do usuário, para isso, é preciso passar o <b>JWT</b> e a <b>quantidadedPagamento</b> em valor decimal, separado por um ponto (".").</p>
</ul>


<h4 align="left">:books: Livros</h4>
<p align="left">Os livros são uma das peças principais do sistema, sendo assim podem ser cadastrados, emprestados e devolvidos por bibliotecários e usuários.</p>
<h5 align="left"></h5>
<ul>
    <li>/api/livros_ver_livros</li>
    <p>Utilizada para requisitar as informações dos livros cadastrados.</p>
</ul>

<h4 align="left">:triangular_flag_on_post: Nacionalidades</h4>
<p align="left">Entidade responsável por representar o local de nascimento de um autor.</p>
<h5 align="left">:bookmark_tabs: Rotas</h5>
<ul>
    <li>/api/nacionalidades/ver_nacionalidades</li>
    <p></p>
</ul>

<h4 align="left">:fountain_pen: Autores</h4>
<p align="left">Os autores são utilizados no sistema para serem relacionados a um ou mais livros, assim, informando, quem os escreveu.</p>
<h5 align="left">:bookmark_tabs: Rotas</h5>
<ul>
    <li>/api/autores/ver_autores</li>
    <p>Utilizada para requisitar as informações dos autores cadastrados.</p>
</ul>

<h4 align="left">:speaking_head: Idiomas</h4>
<p align="left">Entidade responsável por informar em qual idioma um livro armazenado no banco de dados foi escrito.</p>
<h5 align="left">:bookmark_tabs: Rotas</h5>
<ul>
    <li>/api/idiomas/ver_idiomas</li>
    <p>Utilizada para requisitar as informações dos idiomas cadastrados.</p>
</ul>

<h4 align="left">:transgender_symbol: Gêneros</h4>
<p align="left">Os gêneros são responsáveis por informar qual a categoria de um livro cadastrado no banco de dados.</p>
<h5 align="left">:bookmark_tabs: Rotas</h5>
<ul>
    <li>/api/generos/ver_generos</li>
    <p>Utilizada para requisitar as informações dos gêneros cadastrados.</p>
</ul>