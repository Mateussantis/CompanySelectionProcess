# EwallySelectionProcess
Processo Seletivo

<p align="center">
 <a href="#problema">Problema</a> •
 <a href="#solucao">Solução</a> • 
 <a href="#funcionalidades">Funcionalidades</a> •
 <a href="#andamento">Andamento</a> •
 <a href="#tecnologias">Tecnologias</a> •  
 <a href="#decisoes ">Decisões</a> • 	
 <a href="#rodar ">Como rodar o projeto ?</a> •
 <a href="#autor">Autor</a> •
</p>



## Problema

<p id="problema" align="center"> 
Desenvolver uma Api em Node.JS que consiga através de uma linha digitavel, validar e retornar dados de um boleto. ( Titulo Bancário e Pagamento de Concenssionárias ).
</p>



### Solução

<p id="solucao" align="center">Focando resolver esse problema, proposto pela empresa Ewally, desenvolvi uma API. .</p>



<h2 id="andamento" align="center"> 
	🚧 Projeto em andamento, Concluído apenas para Titulo Bancário ! 🚀
</h2>




<p id="funcionalidades"></p>
<h3>Funcionalidades</h2>

- [x] Back-End ( API ) - Node.JS
    - [x] Tradução de uma Linha Digitavel para dados de um boleto.
    - [x] Validação ( Através dos três primeiros campo ). 

<h3 id="decisoes"> Decisões </h3>
	
<p>
  Foi utilizado como requisitado Node.js.
	Optei neste projeto por utilizar Docker, pela facilidade de execução sem a necessidade de uma configuração muito expecifica, também é possivel roda-lo localmente, se o node estiver configurado na maquina.  
	</p>
	

<h3 id="rodar">Como rodar o projeto ?</h3>
	
<h4>Primeira forma ( Localmente )</h4>
	
		1: Clonar o projeto.
		2: Abrir o terminal dentro da pasta.
		3: Rodar o comando "Yarn", pois instalara todas as dependencias.
		4: Por ultimo, apenas rodar o comando "yarn dev", que ira iniciar o servidor.
    5: Utilizar a rota -> http://localhost:8080/boleto/xxxxxx (xxxx = Linha Digitavel)
	
<h4>Segunda forma ( Via Docker )</h4>

		1: Clonar o projeto.
		2: Abrir o terminal dentro da pasta.
		3: Rodar o comando "docker build -t container_name .", pois criara o container com todas as dependencias.
		4: Por ultimo, apenas rodar o comando "docker run -p 8080:8080 container_name", que ira definir a porta e iniciar o servidor.
    5: Utilizar a rota -> http://localhost:8080/boleto/xxxxxx (xxxx = Linha Digitavel)  

<h3>Autor</h3>
	
<p>Mateus Silva De Santis</p>
