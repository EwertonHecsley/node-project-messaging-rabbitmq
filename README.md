<h1 align="center">📦 Projeto de Acompanhamento de Pedidos com RabbitMQ</h1>

<p align="center">
  <strong>Simulação de um sistema distribuído com mensageria assíncrona</strong><br/>
  <em>Desenvolvido com foco em aprendizado e demonstração de arquitetura desacoplada e modular</em>
</p>

---

<h2>🚀 Objetivo do Projeto</h2>

<p>Este projeto tem como foco a implementação de uma arquitetura baseada em mensageria, utilizando <strong>RabbitMQ</strong> para a comunicação entre microserviços.</p>

<p>A proposta é simular o fluxo completo de <strong>criação e acompanhamento de pedidos</strong>, com serviços que reagem a eventos e comandos de forma assíncrona:</p>

<ul>
  <li>Processamento de pagamento</li>
  <li>Envio de notificações</li>
  <li>Atualização do status do pedido</li>
</ul>

---

<h2>🧱 Arquitetura</h2>

<p>Utilizamos RabbitMQ com três exchanges principais:</p>

<table>
  <thead>
    <tr>
      <th>Exchange</th>
      <th>Tipo</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>pedido.events</code></td>
      <td>topic</td>
      <td>Publica eventos relacionados aos pedidos (ex: criado, pago, cancelado)</td>
    </tr>
    <tr>
      <td><code>pagamento.commands</code></td>
      <td>direct</td>
      <td>Comandos para o serviço de pagamento (ex: processar pagamento)</td>
    </tr>
    <tr>
      <td><code>notificacao.events</code></td>
      <td>fanout</td>
      <td>Reservado para notificações (não utilizado diretamente nesta versão)</td>
    </tr>
  </tbody>
</table>

---

<h2>⚙️ Tecnologias Utilizadas</h2>

<ul>
  <li><strong>Node.js</strong> + <strong>TypeScript</strong></li>
  <li><strong>RabbitMQ</strong> (via Docker)</li>
  <li><code>amqplib</code> para integração com RabbitMQ</li>
  <li><code>pino</code> para logs estruturados</li>
  <li><strong>Docker</strong> e <strong>Docker Compose</strong></li>
</ul>

---

<h2>📁 Estrutura de Pastas</h2>

<pre>
project-messaging-rabbitmq/
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts                  # Script principal que orquestra tudo
    ├── exchanges.ts            # Setup de exchanges e filas
    ├── logger.ts               # Logger com Pino
    ├── produtor.ts             # Produtor que publica eventos e comandos
    ├── consumerPedido.ts       # Consumidor para atualizar status do pedido
    ├── consumerPagamento.ts    # Consumidor que simula processamento de pagamento
    └── consumerNotificacao.ts  # Consumidor que envia notificações
</pre>

---

<h2>🧪 Simulações</h2>

<p>O comportamento dos serviços é simulado com:</p>

<ul>
  <li><code>setInterval</code> para criação automática de pedidos a cada 10 segundos</li>
  <li><code>setTimeout</code> para simular tempo de processamento no serviço de pagamento</li>
  <li>Resultado do pagamento (aprovado/cancelado) gerado aleatoriamente</li>
  <li>Logs detalhados com <code>pino</code> para acompanhar o fluxo completo</li>
</ul>

---

<h2>🛠️ Como Executar</h2>

<ol>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/seu-usuario/project-messaging-rabbitmq.git</code></pre>
  </li>
  <li>Suba o RabbitMQ com Docker:
    <pre><code>docker-compose up -d</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Execute o sistema completo:
    <pre><code>npm run start</code></pre>
  </li>
</ol>

<p>Acesse o painel RabbitMQ em <a href="http://localhost:15672" target="_blank">http://localhost:15672</a>  
Usuário: <code>admin</code> • Senha: <code>admin</code></p>

---

<h2>🧠 Aprendizados</h2>

<ul>
  <li>Mensageria assíncrona com RabbitMQ</li>
  <li>Criação e binding de exchanges e filas</li>
  <li>Uso de padrões como fanout, direct e topic</li>
  <li>Integração realista entre serviços usando eventos e comandos</li>
  <li>Organização modular com TypeScript</li>
  <li>Logs profissionais com Pino</li>
</ul>

---

<h2>👨‍💻 Autor</h2>

<p>
  <strong>Ewerton Hecsley</strong><br/>
  Engenheiro de Software | Desenvolvedor Backend<br/>
  LinkedIn: <a href="https://www.linkedin.com/in/ewerton-hecsley-8a613992/" target="_blank">/ewerton-hecsley</a><br/>
  GitHub: <a href="https://github.com/EwertonHecsley" target="_blank">@EwertonHecsley</a>
</p>

---

<h2>📌 Observações</h2>

<p>
  Este projeto é didático e tem como principal objetivo mostrar a aplicação prática de mensageria com RabbitMQ.  
  Os serviços de cliente, produtos e pagamentos são simulados com funções controladas, permitindo fácil entendimento e testes.
</p>
