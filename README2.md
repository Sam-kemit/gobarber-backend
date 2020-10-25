# Recuparaçao de senha

**RF_requisitos_funcionais**

- O usuario deve poder recuperar sua senha informando o seu e-mail;
- O usuario deve receber um e-mail com instruçoes de recuperaçao de senha;
- O usuario deve poder resetar sua senha;

**RNF_requisitos_nao_funcionais**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produçao;
- O envio de emails deve acontecer em segundo plano (background job);

**RN_regra_de_negocio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualizaçao do perfil

**RF**

- O usuario deve atualizar o seu nome, email e senha;

**RN**

- O usuario nao pode alterar seu email para um email ja utilizado;
- Para atualizar sua senha, o usuario deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificaçao sempre que houver um novo agandamento;
- O prestador deve poder visualizar as notificaçoes nao lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificaçoes do prestador devem ser armazenadas no MongoDB;
- As notificaçoes de prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificaçao deve ter um status de lida ou nao lida para que o prestador possa controlar;


# Agendamento de serviços

**RF**

- O usuario deve poder listar todos prestadores de serviço cadastrados;
- O usuario deve poder listar os dias de um mês com pelo menos um horario disponivel de um prestador;
- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;
-

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h (Primeiro as 8h, ultimo as 17h);
- O usuario nao pode agendar em um horario ja ocupado;
- O usuario nao pode agendar em um horario que ja passou;
- O usuario nao pode agendar serviços consigo mesmo;
