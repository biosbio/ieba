C:\Users\KUDUTAR KEIA\Music\PROJETOS KILO\Ieba# TEMPLATE MESTRE — DESENVOLVIMENTO DO SITE INSTITUCIONAL DA IEBA

**Projeto:** Site institucional da Igreja Evangélica de Bairro de Ajuda (IEBA)  
**Tipo:** Website institucional, informativo, multimédia e de comunicação religiosa e social  
**Versão da especificação:** 1.0  
**Objetivo:** Desenvolver um site profissional, moderno, responsivo, seguro e de baixo custo operacional.

---

# 1. PAPEL DA IA DE DESENVOLVIMENTO

Atua como uma equipa multidisciplinar experiente, composta por:

- Arquiteto de software.
- Desenvolvedor frontend.
- Desenvolvedor JavaScript.
- Especialista em Firebase.
- Engenheiro de cibersegurança.
- Especialista em UX/UI Design.
- Especialista em acessibilidade e otimização de desempenho.
- Engenheiro de testes e qualidade de software.

A tua responsabilidade é analisar, projetar, desenvolver, testar, documentar e preparar para publicação o website institucional da Igreja Evangélica de Bairro de Ajuda (IEBA).

Não te limites a criar uma demonstração visual. Desenvolve um sistema funcional, com integração real da base de dados, autenticação, gestão de conteúdos, permissões e segurança.

Respeita rigorosamente os requisitos deste documento.

Não elimines funcionalidades, não substituas tecnologias aprovadas sem justificação e não inventes informações institucionais.

# 2. IDENTIDADE E FINALIDADE DO PROJETO

A IEBA é a Igreja Evangélica de Bairro de Ajuda.

O website deverá:

1. Apresentar a igreja ao público.
2. Divulgar a história, missão, visão e valores.
3. Informar sobre cultos, horários e atividades.
4. Divulgar eventos e programações.
5. Apresentar os diferentes ministérios e organizações.
6. Disponibilizar fotografias e vídeos das atividades.
7. Receber pedidos de oração.
8. Permitir o contacto com a igreja.
9. Apresentar formas de contribuição e doação.
10. Divulgar projetos sociais e missionários.

O site deverá transmitir uma identidade cristã, acolhedora, organizada, profissional e contemporânea.

# 3. PRINCÍPIOS OBRIGATÓRIOS DO DESENVOLVIMENTO

- Simplicidade na utilização.
- Design moderno e responsivo.
- Código organizado e documentado.
- Baixo custo de desenvolvimento e manutenção.
- Segurança desde a arquitetura inicial.
- Facilidade de administração.
- Separação entre conteúdos públicos e privados.
- Independência entre os diferentes ministérios.
- Escalabilidade sem complexidade desnecessária.
- Compatibilidade com computadores, tablets e smartphones.

Não introduzir frameworks pesados sem necessidade técnica comprovada.

# 4. TECNOLOGIAS OBRIGATÓRIAS

## 4.1. Frontend

Utilizar exclusivamente tecnologias web nativas:

- HTML5.
- CSS3.
- JavaScript (ES6+).

Não utilizar React, Next.js, Angular, Vue ou outros frameworks frontend.

Utilizar JavaScript modular, com separação de responsabilidades.

## 4.2. Backend e serviços

Utilizar:

**Firebase Authentication**
- Autenticação de administradores e responsáveis.
- Gestão de sessões.
- Recuperação de palavra-passe.
- MFA, conforme as capacidades e os requisitos do plano adotado.

**Firebase Firestore**
- Eventos.
- Ministérios.
- Atividades.
- Horários dos cultos.
- Notícias.
- Projetos sociais.
- Pedidos de oração.
- Mensagens de contacto.
- Metadados da mídia.
- Registos de auditoria.

**Cloudflare Pages**
- Hospedagem do website estático.
- HTTPS.
- Integração com GitHub.
- Publicação automática através de CI/CD.

**Cloudflare**
- DNS.
- Proteção de tráfego.
- WAF e regras de segurança disponíveis.
- Proteção contra bots e abuso, conforme o plano.

**Cloudinary**
- Armazenamento e otimização de fotografias.
- Upload seguro através de mecanismos autenticados e assinados.
- Limites de tamanho e formatos permitidos.

**YouTube**
- Hospedagem de vídeos.
- Incorporação através de iframe.
- Galeria de vídeos da igreja.

**GitHub**
- Repositório de código.
- Histórico de alterações.
- Controlo de versões.
- Verificação de segurança e integração contínua.

## 4.3. Política de custos

Priorizar planos gratuitos.

Objetivo inicial: custo operacional próximo de zero.

Não contratar serviços pagos sem necessidade e sem autorização.

Considerar que:
- O Firebase Cloud Storage exige plano Blaze nas condições atuais do serviço.
- O Cloudinary possui quotas gratuitas limitadas.
- O Firebase, Cloudflare e demais serviços podem alterar os seus limites e condições.
- O domínio próprio poderá gerar despesas.
- O processamento de pagamentos poderá envolver comissões.

Não ativar faturação automática sem autorização.

Antes da implementação, verificar os preços, as quotas, os termos de utilização e as limitações atuais dos fornecedores.

# 5. ESTRUTURA DO WEBSITE PÚBLICO

Criar as seguintes páginas:

## 5.1. Página inicial — index.html

Deverá apresentar:

- Logótipo da IEBA.
- Menu principal.
- Imagem principal ou banner institucional.
- Mensagem de boas-vindas.
- Apresentação resumida da igreja.
- Eventos em destaque.
- Horários fixos dos cultos.
- Atividades dos ministérios.
- Notícias e comunicados.
- Destaques multimédia.
- Projetos sociais.
- Botão de pedidos de oração.
- Botão de doações.
- Informações de contacto.
- Rodapé institucional.

### Regra dos eventos em destaque

Somente o administrador geral poderá escolher os eventos destacados na página inicial.

Deverá poder:
- Marcar e desmarcar um evento como destaque.
- Definir a ordem de apresentação.
- Escolher a imagem.
- Definir a posição do evento.
- Retirar eventos antigos do destaque.

Não selecionar automaticamente os eventos em destaque.

## 5.2. Sobre a IEBA — sobre.html

Apresentar:

- História.
- Identidade institucional.
- Missão.
- Visão.
- Valores.
- Liderança.
- Informações institucionais.

Não inventar dados históricos, nomes, cargos ou informações religiosas. Utilizar conteúdos provisórios claramente identificados até receber os dados oficiais.

## 5.3. Eventos — eventos.html

Criar uma área para divulgar eventos da igreja.

Cada evento deverá permitir:

- Título.
- Descrição.
- Imagem de apresentação.
- Data de início.
- Data de término.
- Horário.
- Local.
- Ministério organizador.
- Estado.
- Data de publicação.
- Informação adicional.

### Carrossel de eventos

Apresentar as 20 publicações mais recentes e aprovadas.

Regras:
- Ordenação pela data de publicação.
- Mostrar até 20 publicações.
- Utilizar carrossel responsivo.
- Permitir navegação manual.
- Adaptar a quantidade de cartões ao ecrã.
- Permitir abrir a página completa do evento.

Não confundir data de publicação com data de realização.

Eventos futuros, realizados, cancelados e arquivados deverão ter estados distintos.

## 5.4. Atividades — atividades.html

Apresentar atividades gerais da igreja.

Permitir:
- Descrição.
- Imagens.
- Vídeos.
- Datas.
- Ministério relacionado.
- Ligação ao evento correspondente.

## 5.5. Páginas dos ministérios

Criar páginas independentes:

- jovens.html
- mulheres.html
- meninas.html
- sal-da-terra.html
- criancas.html
- missoes.html

Cada página deverá apresentar:

- Nome do ministério.
- Apresentação.
- Objetivos.
- Descrição das atividades.
- Programação.
- Responsáveis.
- Eventos relacionados.
- Fotografias.
- Vídeos.
- Histórico de atividades.

Cada ministério deverá possuir conteúdos independentes.

### Organização Sal da Terra

O Sal da Terra é uma organização de adolescentes e jovens dos 7 aos 27 anos.

Esta definição deve ser respeitada em todos os conteúdos institucionais.

Não presumir que todos os participantes possuem a mesma função ou responsabilidade.

## 5.6. Ministério de Oração

Criar uma área institucional para apresentar o Ministério de Oração e as suas atividades.

Incluir:
- Apresentação.
- Objetivos.
- Atividades.
- Informações de contacto autorizadas.
- Ligação ao formulário de pedidos de oração.

Os pedidos recebidos deverão ser encaminhados para a área privada do Ministério de Oração.

## 5.7. Projetos Sociais — projetos-sociais.html

Criar uma página independente para apresentar os projetos sociais da IEBA.

Cada projeto deverá permitir:

- Nome.
- Descrição.
- Objetivos.
- Beneficiários.
- Fotografias.
- Vídeos.
- Localização.
- Data de início.
- Data de conclusão, quando aplicável.
- Estado: planeado, em curso ou concluído.
- Necessidades de apoio.
- Ligação para doações, quando aplicável.

O administrador geral será responsável pela publicação.

## 5.8. Mídia — midia.html

Criar uma galeria multimédia da igreja.

Permitir:

- Álbuns fotográficos.
- Fotografias individuais.
- Vídeos.
- Vídeos do YouTube.
- Incorporação de vídeos externos através de iframe autorizado.
- Organização por eventos.
- Organização por ministérios.
- Pesquisa e filtros.
- Visualização ampliada das fotografias.

Cada álbum deverá possuir:
- Nome do evento.
- Data de realização.
- Descrição.
- Ministério relacionado.
- Fotografias.
- Vídeos.

A mídia deverá estar associada, sempre que possível, a um evento realizado.

## 5.9. Pedidos de oração — pedidos-oracao.html

Criar formulário público com:

- Nome (opcional).
- Email ou telefone (opcional).
- Pedido de oração.
- Opção de tratamento confidencial.
- Consentimento relativo ao tratamento dos dados.

O pedido deverá ser enviado para a área privada do Ministério de Oração.

### Regras obrigatórias

- Somente o administrador geral e o Ministério de Oração poderão consultar os pedidos.
- Outros ministérios não terão acesso.
- Os visitantes não poderão consultar pedidos submetidos por outras pessoas.
- Os pedidos nunca serão publicados automaticamente.
- Não permitir indexação pública dos pedidos.
- Aplicar regras específicas de retenção e eliminação.
- Registar acessos e operações administrativas relevantes.
- Não apresentar o conteúdo sensível nos logs técnicos.

Estados:
- Recebido.
- Em acompanhamento.
- Concluído.
- Arquivado.

## 5.10. Contactos — contactos.html

Criar formulário com:

- Nome.
- Email.
- Telefone (opcional).
- Assunto.
- Mensagem.
- Consentimento de privacidade.

Disponibilizar:
- Informações oficiais da igreja.
- Endereço, quando fornecido.
- Telefone.
- Email.
- Redes sociais.
- Mapa, quando a localização oficial for fornecida.

As mensagens deverão ser encaminhadas para a administração.

## 5.11. Doações — doacoes.html

Disponibilizar duas modalidades.

### Modalidade A — Doações tradicionais

Apresentar:
- Dados bancários oficiais.
- Meios de pagamento móvel.
- Instruções de transferência.
- Finalidades das contribuições.
- Instruções para confirmação.

Todos os dados deverão ser fornecidos e confirmados pela igreja.

### Modalidade B — Doações online

Preparar integração com prestador de pagamentos confiável.

Funcionalidades:
- Escolha do valor.
- Identificação da finalidade.
- Escolha do projeto ou campanha.
- Encaminhamento para pagamento seguro.
- Confirmação através de mecanismo confiável.
- Registo da contribuição.
- Histórico administrativo.

Não armazenar dados completos de cartões bancários.

Não considerar uma doação concluída apenas porque o utilizador regressou à página de sucesso.

A confirmação deverá ser feita através de webhook ou mecanismo de confirmação autenticado do prestador.

A integração dependerá da disponibilidade de um prestador adequado à Guiné-Bissau e dos meios financeiros oficiais da igreja.

Não inventar chaves, contas bancárias ou credenciais de pagamento.

# 6. HORÁRIOS FIXOS DOS CULTOS

Criar uma secção própria para apresentar os horários regulares.

Cada culto deverá possuir:

- Nome.
- Dia da semana.
- Hora de início.
- Hora de término.
- Local.
- Descrição.
- Estado ativo/inativo.

O administrador poderá:
- Cadastrar.
- Editar.
- Desativar.
- Eliminar.
- Alterar horários.

Os horários devem ser atualizados dinamicamente na página inicial e na página de programação.

Utilizar o fuso horário correto da igreja, definido na configuração institucional.

# 7. PAINEL ADMINISTRATIVO

Criar um painel administrativo protegido.

Estrutura sugerida:

admin/
- login.html
- dashboard.html
- eventos.html
- cultos.html
- ministerios.html
- atividades.html
- midia.html
- projetos-sociais.html
- pedidos-oracao.html
- contactos.html
- doacoes.html
- utilizadores.html
- auditoria.html
- configuracoes.html

## 7.1. Perfis de utilizadores

Existirão dois níveis principais:

### Administrador geral

Possui controlo total:

- Gerir todos os ministérios.
- Criar utilizadores.
- Associar responsáveis aos ministérios.
- Gerir eventos.
- Aprovar publicações.
- Gerir cultos.
- Gerir mídia.
- Gerir projetos sociais.
- Gerir pedidos de oração.
- Consultar mensagens.
- Gerir informações de doações.
- Selecionar eventos em destaque.
- Consultar auditoria.
- Alterar configurações.

### Responsável de ministério

Poderá:
- Cadastrar eventos do seu ministério.
- Cadastrar atividades.
- Adicionar fotografias.
- Adicionar vídeos.
- Associar mídia a eventos.
- Editar conteúdos do seu ministério.
- Consultar o estado das suas publicações.

Não poderá:
- Publicar diretamente no site.
- Aprovar as próprias publicações.
- Gerir outros ministérios.
- Criar administradores.
- Alterar privilégios.
- Consultar pedidos de oração, salvo se também possuir autorização específica como membro do Ministério de Oração.
- Consultar dados financeiros confidenciais.
- Alterar as configurações globais.
## ÁREA DE IGREJAS FILIAIS E CAMPOS MISSIONÁRIOS

### 1. Objetivo

O website da Igreja Evangélica de Bairro de Ajuda (IEBA) deverá possuir uma área específica dedicada às suas igrejas filiais e campos missionários.

O objetivo é divulgar o trabalho realizado em cada campo, apresentar as atividades desenvolvidas, partilhar fotografias e vídeos, comunicar necessidades, apresentar projetos missionários e manter a igreja e os visitantes informados sobre o crescimento e as atividades de cada localidade.

### 2. Campos missionários e igrejas filiais

Criar uma página independente para cada um dos seguintes campos:

1. Tchangue.
2. Sahara.
3. Rucuto.
4. Ilhas.

Cada página deverá funcionar como uma secção própria dentro do website institucional da IEBA, mantendo a identidade visual geral do site.

### 3. Estrutura de cada página

Cada campo deverá possuir os seguintes elementos:

**A. Apresentação**
- Nome do campo missionário ou igreja filial.
- Fotografia principal ou imagem de capa.
- Apresentação e descrição do campo.
- História e desenvolvimento do trabalho missionário, quando essas informações forem fornecidas.
- Localização, apenas quando oficialmente confirmada.
- Responsável local, quando autorizado a divulgar.
- Data de início do trabalho missionário, quando conhecida.

**B. Notícias e atualizações**
- Publicações sobre acontecimentos recentes.
- Atualizações do trabalho missionário.
- Relatórios de atividades.
- Informações sobre visitas, cultos especiais e encontros.
- Comunicados importantes.
- Data de publicação e identificação do campo correspondente.

**C. Fotografias e galerias**
- Publicação de fotografias das atividades.
- Criação de álbuns por evento, atividade ou período.
- Legendas e descrições das fotografias.
- Data e identificação da atividade.
- Visualização em galeria e ampliação das imagens.
- Possibilidade de partilhar publicações.

**D. Vídeos**
- Publicação de vídeos das atividades missionárias.
- Vídeos de cultos, conferências, encontros e ações evangelísticas.
- Integração com YouTube ou outras plataformas autorizadas.
- Descrição e data de cada vídeo.

**E. Missões e evangelização**
- Divulgação das atividades evangelísticas.
- Relatórios de visitas missionárias.
- Ações de evangelização e discipulado.
- Atividades de formação cristã.
- Novas iniciativas e expansão do trabalho missionário.
- Testemunhos e experiências, mediante autorização das pessoas envolvidas.

**F. Projetos e necessidades**
- Projetos em desenvolvimento.
- Projetos concluídos.
- Necessidades de infraestrutura e materiais.
- Necessidades de apoio missionário.
- Campanhas de solidariedade e apoio.
- Possibilidade de associar projetos a campanhas de doação aprovadas pela administração geral.

**G. Programação e atividades**
- Horários de cultos, quando oficialmente disponibilizados.
- Programação de encontros.
- Eventos especiais.
- Atividades para crianças, jovens, mulheres e outros grupos, quando existentes.
- Calendário de atividades do campo.

### 4. Gestão de conteúdos

O painel administrativo deverá permitir gerir cada campo missionário individualmente.

O administrador geral poderá:
- Criar, editar, publicar, arquivar e eliminar páginas dos campos.
- Gerir fotografias, vídeos, notícias e atualizações.
- Aprovar ou rejeitar publicações.
- Associar atividades, eventos e projetos ao campo correspondente.
- Escolher publicações em destaque.
- Consultar o histórico de publicações de cada campo.

Poderão existir responsáveis autorizados para cada campo, com acesso limitado exclusivamente ao respetivo campo.

Esses responsáveis poderão:
- Submeter notícias e atualizações.
- Cadastrar atividades missionárias.
- Enviar fotografias e vídeos.
- Submeter relatórios e informações sobre projetos.
- Consultar o estado das suas submissões.

Os responsáveis não poderão publicar diretamente no site, aprovar os próprios conteúdos, gerir outros campos ou alterar permissões.

**Regra obrigatória:** toda publicação deverá passar pela revisão e aprovação do administrador geral antes de ficar visível publicamente.

### 5. Organização e navegação

Adicionar ao menu principal uma opção denominada **Igrejas Filiais e Campos Missionários**.

Ao selecionar essa opção, apresentar uma página geral com quatro cartões ou blocos de acesso:

- Tchangue.
- Sahara.
- Rucuto.
- Ilhas.

Cada cartão deverá apresentar uma fotografia representativa, nome do campo, breve descrição e ligação para a respetiva página.

Na página geral também poderá existir uma área de atualizações recentes, reunindo publicações dos quatro campos, identificadas claramente pela sua origem.

Cada campo deverá manter a sua própria galeria, notícias, projetos e histórico de atividades.

### 6. Modelo de dados

Criar uma coleção Firestore denominada `missionFields`, com documentos individuais para cada campo.

Criar também as seguintes coleções ou estruturas relacionadas:

- `missionFieldUpdates`: notícias e atualizações.
- `missionFieldActivities`: atividades missionárias.
- `missionFieldMedia`: fotografias, vídeos e álbuns.
- `missionFieldProjects`: projetos e necessidades.
- `missionFieldReports`: relatórios missionários.
- `missionFieldSchedules`: programação e horários.

Cada conteúdo deverá possuir, conforme aplicável:
- Identificador único.
- Identificador do campo missionário.
- Título.
- Descrição.
- Imagens ou vídeos.
- Autor ou responsável pela submissão.
- Data de criação.
- Data de atualização.
- Estado de aprovação.
- Identificação do administrador que aprovou.
- Data de publicação.

### 7. Segurança e privacidade

- Cada responsável deverá ter acesso somente ao campo que lhe foi atribuído.
- As permissões deverão ser verificadas no Firebase Authentication, Custom Claims e Firestore Security Rules ou através de backend confiável.
- Não confiar exclusivamente na ocultação de páginas ou botões no frontend.
- Proteger uploads de imagens e vídeos.
- Não permitir publicação de conteúdos não aprovados.
- Obter autorização antes de publicar fotografias, vídeos, testemunhos ou informações pessoais identificáveis.
- Proteger especialmente imagens e dados de menores de idade, exigindo autorização adequada dos responsáveis legais.
- Não publicar informações confidenciais, dados pessoais ou necessidades individuais sem autorização.
- Os pedidos de oração continuarão sujeitos às regras específicas de confidencialidade já estabelecidas para o Ministério de Oração.

### 8. Apresentação e experiência do utilizador

- Design responsivo para computadores, tablets e telemóveis.
- Galerias com navegação simples.
- Fotografias otimizadas para carregamento rápido.
- Paginação ou carregamento progressivo das publicações.
- Filtros por campo, data, atividade e categoria.
- Identificação visual clara do campo de origem de cada publicação.
- Integração com a página de mídia geral da IEBA, sem perder a separação das galerias de cada campo.

### 9. Critérios de aceitação

A funcionalidade será considerada concluída quando:

1. Existirem quatro páginas independentes: Tchangue, Sahara, Rucuto e Ilhas.
2. Cada campo puder ter notícias, atualizações, fotografias, vídeos, atividades, projetos e relatórios próprios.
3. O administrador geral conseguir gerir todos os campos.
4. Os responsáveis autorizados conseguirem submeter conteúdos apenas para o seu campo.
5. Nenhum responsável conseguir publicar diretamente sem aprovação.
6. As publicações forem apresentadas corretamente na página do respetivo campo.
7. A página geral conseguir reunir atualizações recentes dos quatro campos.
8. As permissões e a privacidade estiverem protegidas por regras de segurança reais.
9. O sistema funcionar em dispositivos móveis e computadores.

**Instrução à IA de desenvolvimento:** implementar esta área como parte integrante do website institucional da IEBA, reutilizando a arquitetura, o sistema de autenticação, o painel administrativo, o fluxo de aprovação, a gestão de mídia e as medidas de segurança já definidos no Template Mestre. Não criar um sistema independente nem duplicar funcionalidades existentes.

# 8. SISTEMA DE APROVAÇÃO DE CONTEÚDOS

Esta é uma regra fundamental.

Somente o administrador geral poderá publicar conteúdos oficialmente no site.

Fluxo:

1. O responsável cadastra o conteúdo.
2. O conteúdo é guardado com estado PENDENTE.
3. O administrador recebe uma indicação de nova submissão.
4. O administrador analisa o conteúdo.
5. Pode aprovar, rejeitar ou solicitar alterações.
6. Após aprovação, o conteúdo poderá ser publicado.
7. O conteúdo aprovado aparece na respetiva página pública.

Estados:
- Rascunho.
- Pendente.
- Aprovado.
- Publicado.
- Rejeitado.
- Arquivado.

A publicação deve ser uma operação separada da criação e edição.

Um responsável não poderá modificar diretamente os campos de aprovação, publicação ou destaque.

O controlo deverá ser garantido nas regras do Firebase, não apenas no frontend.

# 9. SISTEMA DE NOTIFICAÇÕES

Criar notificações administrativas para:

- Novas submissões de eventos.
- Novas atividades.
- Novas fotografias e vídeos.
- Pedidos de oração recebidos.
- Novas mensagens de contacto.
- Alterações relevantes.
- Necessidade de aprovação.

As notificações deverão respeitar as permissões.

O Ministério de Oração deverá receber apenas notificações dos pedidos de oração.

Os responsáveis dos ministérios não deverão receber informações confidenciais de outros departamentos.

# 10. CIBERSEGURANÇA — REQUISITO OBRIGATÓRIO

Implementar segurança desde a primeira fase do desenvolvimento.

Não afirmar que o sistema está completamente protegido ou imune a ataques.

Aplicar defesa em profundidade.

## 10.1. Proteção de infraestrutura

Considerar:
- DDoS.
- DoS.
- Bots maliciosos.
- Scanning e reconhecimento.
- DNS spoofing.
- Interceção de tráfego.
- Exploração de vulnerabilidades.
- Abuso de recursos.

Medidas:
- Cloudflare.
- HTTPS obrigatório.
- HSTS.
- WAF, conforme disponibilidade.
- Rate limiting.
- Regras de tráfego.
- DNSSEC, quando suportado.
- Não expor serviços administrativos desnecessários.

Importante: Cloudflare Pages não coloca automaticamente os endpoints do Firebase atrás do WAF. Proteger também os serviços Firebase com as respetivas regras e mecanismos de segurança.

## 10.2. Proteção de autenticação

Implementar:
- MFA obrigatório para o administrador.
- MFA recomendado para responsáveis.
- Proteção contra força bruta.
- Rate limiting.
- Proteção contra credential stuffing.
- Proteção contra password spraying.
- Recuperação segura de palavras-passe.
- Sessões e revogação de acessos.
- Alertas de atividades suspeitas.
- Verificação de credenciais comprometidas, quando disponível.

Não implementar bloqueio permanente de contas baseado apenas em falhas de login, pois isso pode permitir ataques de negação de serviço contra utilizadores legítimos.

## 10.3. Proteção das aplicações

Prevenir:
- XSS.
- CSRF, quando aplicável.
- NoSQL Injection.
- SQL Injection em futuras integrações.
- IDOR.
- Broken Access Control.
- Privilege Escalation.
- Clickjacking.
- Open Redirect.
- Path Traversal.
- SSRF.
- RCE.
- Mass Assignment.
- Manipulação de parâmetros.
- Roubo de sessões.

Aplicar:
- Content Security Policy.
- Security Headers.
- Validação de dados.
- Codificação de saída.
- Autorização por recurso.
- Princípio do menor privilégio.
- Validação no backend ou nas regras confiáveis.
- Bibliotecas atualizadas e verificadas.

## 10.4. Firebase Security

Implementar:

- Firebase Authentication.
- Firebase Security Rules.
- Firebase App Check.
- Custom Claims para papéis e permissões.
- Regras de isolamento entre ministérios.
- Separação entre dados públicos e privados.
- Auditoria de ações relevantes.

Por padrão, negar acessos não autorizados.

Não utilizar regras públicas de leitura e escrita para toda a base de dados.

Não colocar chaves privadas, service account ou segredos no JavaScript público.

As configurações públicas do Firebase não devem ser confundidas com segredos: a proteção real depende da autenticação, App Check e regras de autorização.

## 10.5. Segurança dos ficheiros

Aplicar:
- Lista permitida de formatos.
- Verificação MIME e assinatura real do ficheiro.
- Limites de tamanho.
- Nomes aleatórios.
- Bloqueio de executáveis.
- Sanitização ou rejeição de SVG não confiável.
- Proteção contra upload malicioso.
- URLs assinados para operações privilegiadas.
- Controlo de permissões.

Nunca executar ficheiros enviados por utilizadores.

## 10.6. Proteção de iframes

Permitir apenas domínios autorizados.

Não permitir HTML ou JavaScript arbitrário enviado pelos responsáveis.

Validar URLs de vídeos e incorporar apenas plataformas autorizadas.

## 10.7. Privacidade

Aplicar:
- Minimização dos dados recolhidos.
- Consentimento quando necessário.
- Proteção de pedidos de oração.
- Controlo de acesso.
- Retenção limitada.
- Eliminação segura.
- Política de privacidade.
- Registo de operações sem exposição de informações sensíveis.

## 10.8. Backups e recuperação

Implementar:
- Backups periódicos do Firestore.
- Cópias independentes.
- Proteção dos backups.
- Testes de restauração.
- Plano de recuperação.
- Registo de incidentes.

Não assumir que o plano gratuito garante backups automáticos.

# 11. ARQUITETURA E ESTRUTURA DOS FICHEIROS

Organizar o projeto de maneira modular.

Estrutura inicial sugerida:

IEBA/
│
├── index.html
├── sobre.html
├── eventos.html
├── atividades.html
├── jovens.html
├── mulheres.html
├── meninas.html
├── sal-da-terra.html
├── criancas.html
├── missoes.html
├── ministerio-oracao.html
├── projetos-sociais.html
├── midia.html
├── pedidos-oracao.html
├── contactos.html
├── doacoes.html
│
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── eventos.html
│   ├── cultos.html
│   ├── ministerios.html
│   ├── atividades.html
│   ├── midia.html
│   ├── projetos-sociais.html
│   ├── pedidos-oracao.html
│   ├── contactos.html
│   ├── doacoes.html
│   ├── utilizadores.html
│   ├── auditoria.html
│   └── configuracoes.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   ├── components.css
│   └── admin.css
│
├── js/
│   ├── firebase.js
│   ├── auth.js
│   ├── permissions.js
│   ├── navigation.js
│   ├── events.js
│   ├── services.js
│   ├── ministries.js
│   ├── media.js
│   ├── prayer.js
│   ├── contact.js
│   ├── donations.js
│   ├── projects.js
│   ├── notifications.js
│   └── admin.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── logo/
│   └── fonts/
│
├── firebase/
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── configuration/
│
├── tests/
│
├── .gitignore
├── README.md
└── SECURITY.md

Ajustar a estrutura conforme a necessidade, mantendo separação clara entre frontend, serviços, segurança e administração.

# 12. MODELO DE DADOS

Projetar o Firestore com coleções bem organizadas.

Coleções sugeridas:

- users
- ministries
- events
- activities
- services
- mediaAlbums
- mediaItems
- projects
- prayerRequests
- contactMessages
- donations
- notifications
- auditLogs
- siteSettings

Definir:
- IDs únicos.
- Datas de criação e atualização.
- Criador do conteúdo.
- Ministério associado.
- Estado de publicação.
- Responsável pela aprovação.
- Data de aprovação.
- Data de publicação.
- Regras de leitura e escrita.

Os pedidos de oração, mensagens de contacto e informações de doações deverão ter separação e permissões próprias.

Não guardar informação sensível em coleções públicas.

# 13. DESIGN E EXPERIÊNCIA DO UTILIZADOR

Criar uma identidade visual cristã moderna.

Diretrizes:
- Design limpo.
- Navegação intuitiva.
- Tipografia legível.
- Cores harmoniosas.
- Boa utilização de espaços.
- Fotografias de qualidade.
- Botões claramente identificáveis.
- Layout responsivo.
- Acessibilidade.
- Boa experiência em telemóveis.

O design deverá ser profissional, sem excesso de efeitos ou animações.

Não inventar o logótipo oficial da IEBA.

Criar uma identidade provisória apenas se necessário e identificar claramente como provisória.

Utilizar imagens provisórias apenas enquanto não forem fornecidas fotografias oficiais.

# 14. RESPONSIVIDADE E ACESSIBILIDADE

Garantir compatibilidade com:
- Computadores.
- Tablets.
- Smartphones Android.
- iPhones.

Aplicar:
- HTML semântico.
- Navegação por teclado.
- Contraste adequado.
- Texto alternativo para imagens.
- Formulários acessíveis.
- Mensagens de erro compreensíveis.
- Redução de animações quando solicitada pelo sistema.

# 15. DESEMPENHO E SEO

Implementar:
- Imagens otimizadas.
- Lazy loading.
- CSS e JavaScript organizados.
- Carregamento eficiente.
- Metadados SEO.
- Sitemap.
- Robots.txt.
- URLs claras.
- Open Graph.
- Dados estruturados apropriados.
- Cache adequado.

Não indexar páginas administrativas, pedidos de oração ou informações privadas.

# 16. TESTES OBRIGATÓRIOS

Antes da entrega, testar:

## Funcionalidade
- Todas as páginas.
- Todos os menus.
- Carrossel de eventos.
- Eventos em destaque.
- Formulários.
- Horários dos cultos.
- Galeria de mídia.
- Upload de fotografias.
- Vídeos incorporados.
- Pedidos de oração.
- Contactos.
- Doações.
- Projetos sociais.
- Painel administrativo.

## Permissões
- Responsável não acede a outros ministérios.
- Responsável não publica diretamente.
- Responsável não aprova conteúdos.
- Responsável não cria administradores.
- Outros ministérios não consultam pedidos de oração.
- Apenas administrador e Ministério de Oração consultam pedidos.
- Visitantes não acedem a dados privados.

## Segurança
- Força bruta.
- XSS.
- CSRF, quando aplicável.
- NoSQL Injection.
- IDOR.
- Escalada de privilégios.
- Manipulação de parâmetros.
- Upload malicioso.
- Tentativas de acesso não autorizado.
- Exposição de credenciais.
- Regras Firestore.
- App Check.
- CSP e Security Headers.

## Recuperação
- Backup.
- Restauração.
- Revogação de sessões.
- Recuperação de conta.
- Resposta a incidentes.

Os testes de carga e de resistência a DDoS deverão ser controlados, autorizados e executados apenas em infraestrutura própria ou de teste.

# 17. FASES DE IMPLEMENTAÇÃO

Desenvolver por etapas.

### Fase 1 — Planeamento
- Analisar os requisitos.
- Confirmar arquitetura.
- Definir estrutura dos ficheiros.
- Desenhar modelo de dados.
- Definir permissões.
- Identificar riscos técnicos e custos.

### Fase 2 — Interface pública
- Criar páginas.
- Criar menu.
- Criar identidade visual.
- Implementar responsividade.
- Criar componentes comuns.

### Fase 3 — Firebase
- Configurar projeto.
- Configurar Authentication.
- Configurar Firestore.
- Implementar Security Rules.
- Implementar App Check.
- Configurar índices.

### Fase 4 — Administração
- Criar login.
- Criar dashboard.
- Criar gestão de utilizadores.
- Criar gestão de ministérios.
- Criar gestão de eventos.
- Implementar aprovação.

### Fase 5 — Conteúdos
- Cultos.
- Atividades.
- Mídia.
- Projetos sociais.
- Pedidos de oração.
- Contactos.
- Doações.

### Fase 6 — Segurança
- Implementar controlos.
- Rever regras.
- Testar permissões.
- Corrigir vulnerabilidades.
- Configurar proteção Cloudflare.

### Fase 7 — Testes
- Testes funcionais.
- Testes de segurança.
- Testes de responsividade.
- Testes de desempenho.
- Testes de recuperação.

### Fase 8 — Publicação
- Configurar Cloudflare Pages.
- Associar GitHub.
- Configurar domínio, se existir.
- Publicar.
- Validar HTTPS.
- Fazer verificação final.

# 18. DOCUMENTAÇÃO OBRIGATÓRIA

Entregar:

1. README.md.
2. ARCHITECTURE.md.
3. SECURITY.md.
4. FIREBASE_SETUP.md.
5. DEPLOYMENT.md.
6. DATABASE_SCHEMA.md.
7. ADMIN_GUIDE.md.
8. TESTING.md.
9. BACKUP_AND_RECOVERY.md.

Documentar a instalação, configuração, variáveis de ambiente, publicação e manutenção.

Nunca incluir credenciais reais nos documentos ou no repositório.

# 19. REGRAS DE TRABALHO PARA A IA

1. Antes de programar, analisar integralmente esta especificação.
2. Não começar por criar páginas isoladas sem definir a arquitetura.
3. Identificar dependências externas e possíveis custos.
4. Não inventar informações da igreja.
5. Não inventar dados bancários ou de pagamento.
6. Não utilizar credenciais fictícias como se fossem reais.
7. Não deixar funcionalidades essenciais como simples botões decorativos.
8. Não utilizar dados simulados em produção.
9. Não ignorar erros de segurança.
10. Não desativar regras de proteção para facilitar testes.
11. Não implementar permissões apenas no frontend.
12. Não publicar conteúdos sem aprovação do administrador.
13. Não expor pedidos de oração.
14. Não permitir que responsáveis acedam a outros ministérios.
15. Não introduzir serviços pagos sem autorização.
16. Não afirmar que um teste passou sem o executar.
17. Não afirmar que uma funcionalidade está concluída sem a testar.
18. Manter código limpo, modular e documentado.
19. Criar testes automatizados sempre que possível.
20. Preservar as decisões aprovadas durante todo o desenvolvimento.

Quando existir uma informação institucional em falta, utilizar um campo configurável ou solicitar a informação. Não inventar.

# 20. CRITÉRIOS DE ACEITAÇÃO FINAL

O projeto só poderá ser considerado concluído quando:

- Todas as páginas públicas estiverem funcionais.
- O site estiver responsivo.
- O painel administrativo estiver funcional.
- Os dois perfis de utilizador estiverem implementados.
- Os responsáveis estiverem isolados por ministério.
- O administrador controlar todas as publicações.
- O carrossel apresentar até 20 publicações recentes.
- Os destaques forem escolhidos pelo administrador.
- Os horários forem administráveis.
- A mídia aceitar fotografias e vídeos.
- Os pedidos de oração forem confidenciais.
- O formulário de contacto funcionar.
- As duas modalidades de doações estiverem preparadas e as integrações disponíveis testadas.
- Os projetos sociais puderem ser administrados.
- As regras do Firebase estiverem verificadas.
- Os controlos de segurança estiverem implementados.
- Os backups e a recuperação estiverem documentados.
- A publicação estiver concluída.
- A documentação estiver entregue.

# 21. PRIMEIRA INSTRUÇÃO PARA COMEÇAR

Não comeces imediatamente a escrever todo o código.

Primeiro:

1. Analisa esta especificação.
2. Apresenta a arquitetura técnica final.
3. Apresenta a estrutura completa dos ficheiros.
4. Apresenta o modelo de dados do Firestore.
5. Apresenta a matriz de permissões.
6. Apresenta o plano de segurança.
7. Identifica os serviços gratuitos, limites e eventuais custos.
8. Identifica os dados institucionais que ainda precisam de ser fornecidos.
9. Divide o desenvolvimento em tarefas verificáveis.

Depois de apresentar esse planeamento, começa a implementação faseada, sem alterar os requisitos aprovados.

**OBJETIVO FINAL: ENTREGAR UM WEBSITE INSTITUCIONAL REAL, FUNCIONAL, SEGURO, RESPONSIVO, PROFISSIONAL E ECONÓMICO PARA A IGREJA EVANGÉLICA DE BAIRRO DE AJUDA (IEBA).**