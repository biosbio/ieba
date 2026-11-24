module.exports = {
  site: {
    name: 'Igreja Evangélica de Bairro D\'Ajuda',
    shortName: 'IEBA',
    tagline: 'Uma comunidade de fé, esperança e serviço em Bissau',
    description: 'Site institucional da Igreja Evangélica de Bairro D\'Ajuda (IEBA), situada no Bairro de Ajuda, em Bissau, Guiné-Bissau.',
    address: 'Bairro de Ajuda, atrás da Escola Attadamun',
    city: 'Bissau',
    country: 'Guiné-Bissau',
    phone: '956 074 130',
    phoneLink: 'tel:+245956074130',
    email: 'A confirmar pela igreja',
    timezone: 'Africa/Bissau (GMT+0)',
    facebook: 'https://www.facebook.com/p/Igreja-Evang%C3%A9lica-de-Bairro-DAjuda-100080607875689/',
    facebookYouth: 'https://www.facebook.com/profile.php?id=100067777688226',
    facebookSal: 'https://www.facebook.com/stguinebissau',
    emailYouth: 'juevandajuda-@hotmail.com',
    emailSal: 'stguinebissau@hotmail.com',
    contactAgriculture: 'Joaquim Correia'
  },

  sources: [
    'Página oficial da Igreja Evangélica de Bairro D\'Ajuda no Facebook (1,8 mil seguidores) — endereço, telefone e programação de atividades.',
    'Página oficial da Juventude Evangélica de Bairro de Ajuda no Facebook (679 seguidores) — identidade e contacto da juventude.',
    'Página da Organização Missionária Sal da Terra Guiné-Bissau no Facebook (160 seguidores) — identidade, lema e contacto.'
  ],

  services: [
    { day: 'Domingo', time: '09h – 10h', name: 'Escola Dominical', ministry: 'Crianças', description: 'Ensino bíblico para crianças e famílias.', active: true },
    { day: 'Domingo', time: '09h30 – 10h', name: 'Discipulados', ministry: 'Discipulado', description: 'Acompanhamento e formação na fé.', active: true },
    { day: 'Domingo', time: '10h – 10h30', name: 'Orações', ministry: 'Ministério de Oração', description: 'Momento comunitário de oração.', active: true },
    { day: 'Domingo', time: '10h30 – 12h30', name: 'Culto Geral / Culto de Irmandade', ministry: 'IEBA', description: 'Culto principal da congregação.', active: true },
    { day: 'Domingo', time: '16h30 – 18h', name: 'Juventude', ministry: 'Juventude', description: 'Encontro da Juventude Evangélica.', active: true },
    { day: 'Domingo', time: '19h – 21h', name: 'Estudo Bíblico', ministry: 'IEBA', description: 'Estudo aprofundado da Palavra de Deus.', active: true },
    { day: 'Quarta-feira', time: '18h – 20h', name: 'Ensaio da Equipa de Louvor', ministry: 'Louvor', description: 'Preparação musical para os cultos.', active: true },
    { day: 'Sexta-feira', time: '17h – 20h', name: 'Culto das Senhoras (Culto de mindjeris)', ministry: 'Mulheres', description: 'Encontro das mulheres da igreja.', active: true },
    { day: 'Sábado', time: '16h – 17h', name: 'Sal da Terra', ministry: 'Sal da Terra', description: 'Encontro da organização de adolescentes e jovens (7 aos 27 anos).', active: true },
    { day: 'Sábado', time: '18h – 20h', name: 'Ensaio da Equipa de Louvor', ministry: 'Louvor', description: 'Preparação musical para os cultos.', active: true }
  ],

  ministries: [
    {
      slug: 'jovens', name: 'Juventude Evangélica', short: 'Juventude',
      tagline: 'Jovens que amam a Deus e servem a comunidade',
      color: '#0b3d5c', icon: 'users',
      email: 'juevandajuda-@hotmail.com', facebook: 'facebook.com/profile.php?id=100067777688226',
      description: 'A Juventude Evangélica de Bairro de Ajuda é o ministério que reúne os jovens da IEBA. É a página oficial da Juventude da Igreja Evangélica de Bairro de Ajuda, Guiné-Bissau, com 679 seguidores na sua página oficial. O ministério promove encontros, discipulado, louvor e ações de serviço, formando líderes comprometidos com a fé e com a transformação da sua comunidade.',
      objectives: ['Promover o crescimento espiritual dos jovens', 'Formar líderes servidores', 'Incentivar o envolvimento nas atividades da igreja', 'Ser uma presença positiva na comunidade'],
      activities: ['Encontro semanal de juventude (domingo, 16h30 – 18h)', 'Estudo bíblico e discipulado', 'Louvor e adoração', 'Ações solidárias e evangelização'],
      schedule: ['Domingo — 16h30 às 18h: Encontro da Juventude', 'Domingo — 19h às 21h: Estudo Bíblico (em conjunto com a igreja)'],
      note: 'Novos líderes são continuamente formados e encorajados a servir.'
    },
    {
      slug: 'mulheres', name: 'Ministério das Mulheres', short: 'Mulheres',
      tagline: 'Mulheres de fé que se apoiam e servem',
      color: '#8e4b6e', icon: 'heart',
      description: 'O Ministério das Mulheres da IEBA reúne as irmãs da congregação para culto, oração, formação e companheirismo. Conhecido também como "Culto das Senhoras" ou "Culto de mindjeris", é um espaço de acolhimento, encorajamento e crescimento espiritual para as mulheres da igreja e das famílias da comunidade.',
      objectives: ['Fortalecer a vida espiritual das mulheres', 'Promover a união e o apoio mútuo', 'Desenvolver ações de cuidado às famílias', 'Incentivar a participação no serviço da igreja'],
      activities: ['Culto das Senhoras (sexta-feira, 17h – 20h)', 'Oração e intercessão', 'Formação bíblica', 'Visitas e apoio às famílias'],
      schedule: ['Sexta-feira — 17h às 20h: Culto das Senhoras'],
      note: 'As atividades são abertas a todas as mulheres interessadas.'
    },
    {
      slug: 'meninas', name: 'Ministério das Meninas', short: 'Meninas',
      tagline: 'Crescer com Deus, uma geração de cada vez',
      color: '#b5658a', icon: 'sparkles',
      description: 'O Ministério das Meninas acompanha as crianças e adolescentes do sexo feminino da IEBA, oferecendo um espaço seguro de formação bíblica, brincadeiras, amizade e descoberta dos dons que Deus deu a cada uma. Trabalha em coordenação com a Escola Dominical e com as famílias.',
      objectives: ['Ensinar a Palavra de Deus às meninas', 'Promover amizades saudáveis', 'Descobrir e desenvolver talentos', 'Apoiar as famílias na formação das filhas'],
      activities: ['Escola Dominical', 'Atividades lúdicas e criativas', 'Ensino bíblico adaptado à idade', 'Encontros e passeios (quando autorizados)'],
      schedule: ['Domingo — 09h às 10h: Escola Dominical'],
      note: 'Conteúdo provisório — confirmar responsáveis e programação específica.'
    },
    {
      slug: 'sal-da-terra', name: 'Sal da Terra', short: 'Sal da Terra',
      tagline: 'Adolescentes e jovens dos 7 aos 27 anos',
      color: '#c8912f', icon: 'salt',
      description: 'A Organização Missionária Sal da Terra Guiné-Bissau é uma organização de adolescentes e jovens dos 7 aos 27 anos, ligada à IEBA. Tem como lema as palavras de Jesus em Mateus 5:13: "Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar?". O grupo reúne-se ao sábado e desenvolve atividades de formação cristã, evangelização e serviço missionário.',
      objectives: ['Formar adolescentes e jovens na fé cristã', 'Viver o chamado para ser "sal da terra"', 'Participar em ações de evangelização', 'Servir a igreja e a comunidade'],
      activities: ['Encontro semanal (sábado, 16h – 17h)', 'Estudo bíblico e formação', 'Ações missionárias e evangelização', 'Louvor e adoração'],
      schedule: ['Sábado — 16h às 17h: Encontro do Sal da Terra'],
      note: 'Contacto: stguinebissau@hotmail.com • Página: facebook.com/stguinebissau. A definição "7 aos 27 anos" deve ser respeitada em todos os conteúdos. Não presumir que todos os participantes têm a mesma função.',
      verse: 'Mateus 5:13 — Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar?'
    },
    {
      slug: 'criancas', name: 'Ministério das Crianças', short: 'Crianças',
      tagline: 'Acolher e ensinar as crianças no amor de Deus',
      color: '#3f8a73', icon: 'smile',
      description: 'O Ministério das Crianças da IEBA cuida da formação espiritual das crianças, principalmente através da Escola Dominical. O objetivo é que cada criança conheça o amor de Deus, aprenda a Bíblia e cresça num ambiente seguro, alegre e acolhedor, em parceria com os pais e responsáveis.',
      objectives: ['Ensinar a Bíblia de forma adequada à idade', 'Proporcionar um ambiente seguro e acolhedor', 'Apoiar os pais na formação dos filhos', 'Incentivar a oração e o louvor desde cedo'],
      activities: ['Escola Dominical (domingo, 09h – 10h)', 'Cânticos e atividades lúdicas', 'Ensino bíblico ilustrado', 'Atividades especiais em datas comemorativas'],
      schedule: ['Domingo — 09h às 10h: Escola Dominical'],
      note: 'A proteção de menores é prioritária: imagens e dados só são publicados com autorização dos responsáveis legais.'
    },
    {
      slug: 'missoes', name: 'Ministério de Missões', short: 'Missões',
      tagline: 'Levando o evangelho a cada localidade',
      color: '#1f6f78', icon: 'globe',
      description: 'O Ministério de Missões coordena o trabalho evangelístico e o acompanhamento das igrejas filiais e campos missionários da IEBA: Tchangue, Sahara, Rucuto e Ilhas. Promove visitas missionárias, discipulado, formação de líderes locais e projetos de apoio às comunidades.',
      objectives: ['Coordenar os campos missionários e igrejas filiais', 'Promover a evangelização e o discipulado', 'Formar e acompanhar líderes locais', 'Integrar ações sociais e missionárias'],
      activities: ['Visitas missionárias aos campos', 'Cultos e encontros de evangelização', 'Formação cristã', 'Acompanhamento de projetos e necessidades'],
      schedule: ['Programação definida conforme cada campo missionário'],
      note: 'Ver a área "Igrejas Filiais e Campos Missionários" para detalhes de Tchangue, Sahara, Rucuto e Ilhas.'
    },
    {
      slug: 'ministerio-oracao', name: 'Ministério de Oração', short: 'Oração',
      tagline: 'Oração é o fundamento de tudo',
      color: '#4b5d9c', icon: 'pray',
      description: 'O Ministério de Oração da IEBA dedica-se à intercessão pela igreja, pelas famílias, pela cidade e pelo país. Recebe e acompanha os pedidos de oração enviados através do formulário público, garantindo confidencialidade e tratamento cuidadoso de cada pedido.',
      objectives: ['Promover a oração comunitária', 'Interceder pelas necessidades da igreja e da comunidade', 'Acompanhar os pedidos recebidos com confidencialidade', 'Incentivar a vida de oração de cada membro'],
      activities: ['Momento de orações no culto de domingo (10h – 10h30)', 'Intercessão e acompanhamento de pedidos', 'Encontros de oração (quando agendados)'],
      schedule: ['Domingo — 10h às 10h30: Orações (durante o culto)'],
      note: 'Os pedidos de oração são confidenciais: só o administrador geral e o Ministério de Oração podem consultá-los.',
      link: 'pedidos-oracao.html'
    }
  ],

  events: [
    { id: 'culto-evangelizacao', title: 'Culto Especial de Evangelização', short: 'DEZ 12', date: '12 de dezembro de 2026', time: '15h – 17h', location: 'Sede da IEBA — Bairro de Ajuda', ministry: 'IEBA', status: 'A realizar', published: '01/11/2026', featured: true, order: 1, description: 'Culto especial de evangelização com testemunhos, louvor e pregação, aberto a toda a comunidade do Bairro de Ajuda.' },
    { id: 'visita-tchangue', title: 'Visita Missionária a Tchangue', short: 'JAN 10', date: '10 de janeiro de 2027', time: '08h – 18h', location: 'Campo missionário de Tchangue', ministry: 'Missões', status: 'A realizar', published: '05/11/2026', featured: true, order: 2, description: 'Visita da equipa missionária ao campo de Tchangue, com culto, formação e acompanhamento da comunidade local.' },
    { id: 'formacao-lideres', title: 'Encontro de Formação de Líderes', short: 'JAN 24', date: '24 de janeiro de 2027', time: '09h – 13h', location: 'Sede da IEBA', ministry: 'IEBA', status: 'A realizar', published: '10/11/2026', featured: true, order: 3, description: 'Formação para responsáveis de ministérios e líderes dos campos missionários, com ensino bíblico e planeamento.' },
    { id: 'campanha-campos', title: 'Campanha de Apoio aos Campos Missionários', short: 'FEV 07', date: '07 de fevereiro de 2027', time: '10h – 12h', location: 'Sede da IEBA', ministry: 'Missões', status: 'A realizar', published: '12/11/2026', featured: true, order: 4, description: 'Campanha de solidariedade para apoio logístico e materiais aos campos de Tchangue, Sahara, Rucuto e Ilhas.' },
    { id: 'festa-criancas', title: 'Festa das Crianças', short: 'DEZ 18', date: '18 de dezembro de 2026', time: '14h – 16h', location: 'Sede da IEBA', ministry: 'Crianças', status: 'A realizar', published: '15/10/2026', featured: false, order: 0, description: 'Momento de comunhão, cânticos e atividades para as crianças da igreja, com autorização dos responsáveis.' },
    { id: 'aniversario-st-2026', title: 'Aniversário do Sal da Terra', short: 'SET 17', date: '17 de setembro de 2026', time: '16h – 17h', location: 'Sede da IEBA', ministry: 'Sal da Terra', status: 'Realizado', published: '01/09/2026', featured: false, order: 0, description: 'Celebração do aniversário da Organização Missionária Sal da Terra Guiné-Bissau.' },
    { id: 'acao-gracas', title: 'Culto de Ação de Graças', short: 'NOV 29', date: '29 de novembro de 2026', time: '10h30 – 12h30', location: 'Sede da IEBA', ministry: 'IEBA', status: 'Realizado', published: '02/11/2026', featured: false, order: 0, description: 'Culto de ação de graças pelas atividades do ano e testemunhos da congregação.' },
    { id: 'agropecuaria-turma', title: 'Turma de Agropecuária', short: 'AGO 15', date: '15 de agosto de 2026', time: '09h – 12h', location: 'Sede da IEBA', ministry: 'Responsabilidade social', status: 'Realizado', published: '20/07/2026', featured: false, order: 0, description: 'Primeira turma de agropecuária, criação de animais domésticos e conservação de alimentos sem frigorífico.' },
    { id: 'juventude-2019', title: 'Novos Líderes da Juventude', short: 'OUT 11', date: '11 de outubro de 2019', time: '16h30 – 18h', location: 'Bairro de Ajuda, 1. Fase', ministry: 'Juventude', status: 'Arquivado', published: '11/10/2019', featured: false, order: 0, description: 'Encontro de formação e apresentação de novos líderes da Juventude Evangélica do Bairro D\'Ajuda.' },
    { id: 'culto-especial-cancelado', title: 'Culto Especial (cancelado)', short: 'JUL 05', date: '05 de julho de 2026', time: '15h – 17h', location: 'Sede da IEBA', ministry: 'IEBA', status: 'Cancelado', published: '20/06/2026', featured: false, order: 0, description: 'Culto especial que foi cancelado. Mantido no histórico para registo administrativo.' }
  ],

  missionFields: [
    { slug: 'tchangue', name: 'Tchangue', tagline: 'Campo missionário', color: '#1f6f78', description: 'Campo missionário da IEBA em Tchangue. As atividades incluem cultos, evangelização, formação cristã e acompanhamento da comunidade local. Esta página apresenta notícias, fotografias, vídeos e necessidades do campo.', status: 'Ativo' },
    { slug: 'sahara', name: 'Sahara', tagline: 'Igreja filial', color: '#2f7d5b', description: 'Igreja filial da IEBA em Sahara. A congregação desenvolve cultos regulares, trabalhos de evangelização e ações de apoio à comunidade, com acompanhamento do Ministério de Missões.', status: 'Ativo' },
    { slug: 'rucuto', name: 'Rucuto', tagline: 'Campo missionário', color: '#a66a2c', description: 'Campo missionário da IEBA em Rucuto. O trabalho missionário foca-se no anúncio do evangelho, no discipulado e na formação de líderes locais, adaptados à realidade da comunidade.', status: 'Ativo' },
    { slug: 'ilhas', name: 'Ilhas', tagline: 'Campo missionário', color: '#2a6f9e', description: 'Campo missionário da IEBA nas Ilhas. As atividades missionárias incluem visitas, cultos e ações evangelísticas, com atenção especial às necessidades logísticas e de formação da comunidade.', status: 'Ativo' }
  ],

  projects: [
    { name: 'Escola Dominical e formação bíblica', status: 'Em curso', beneficiaries: 'Crianças e famílias', description: 'Fortalecer o ensino bíblico das crianças e a formação de novos crentes, com materiais e acompanhamento adequados.', needs: 'Materiais didáticos, Bíblias e formação de professores.' },
    { name: 'Apoio à equipa de louvor', status: 'Em curso', beneficiaries: 'Equipa de louvor e congregação', description: 'Preparação musical e formação da equipa de louvor para os cultos dominicais e encontros ministeriais.', needs: 'Instrumentos, equipamento de som e formação musical.' },
    { name: 'Agricultura e segurança alimentar', status: 'Planeado', beneficiaries: 'Famílias da comunidade', description: 'Aulas de agropecuária, criação de animais domésticos e conservação de alimentos sem frigorífico.', needs: 'Formadores, sementes e equipamento básico. Contacto: Joaquim Correia.' },
    { name: 'Apoio aos campos missionários', status: 'Em curso', beneficiaries: 'Tchangue, Sahara, Rucuto e Ilhas', description: 'Acompanhamento das igrejas filiais e campos missionários, com visitas, formação e apoio logístico.', needs: 'Meios de transporte, materiais de evangelização e apoio financeiro.' },
    { name: 'Reforma e manutenção do templo', status: 'Planeado', beneficiaries: 'Congregação e comunidade', description: 'Melhoria das condições do espaço de culto para acolher mais confortavelmente a congregação e as atividades.', needs: 'Materiais de construção e mão de obra especializada.' }
  ],

  ministryDetails: {
    jovens: {
      history: 'A Juventude Evangélica de Bairro de Ajuda nasceu do desejo de reunir os jovens da congregação num espaço próprio de fé, amizade e serviço. A página oficial, com 679 seguidores, tem partilhado ao longo dos anos a formação de novos líderes e os encontros da juventude.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Fundamentos da fé', actions: 'Estudo bíblico, discipulado e momento de oração pelos estudos e famílias.' },
        { period: '2.º Trimestre', theme: 'Evangelização e serviço', actions: 'Ações evangelísticas no Bairro de Ajuda e apoio aos campos missionários.' },
        { period: '3.º Trimestre', theme: 'Liderança e dons', actions: 'Formação de líderes, ensaios e participação dos jovens nos cultos.' },
        { period: '4.º Trimestre', theme: 'Comunhão e balanço', actions: 'Encontros de comunhão, avaliação das atividades e planeamento do ano seguinte.' }
      ],
      upcoming: [
        { name: 'Encontro semanal da Juventude', when: 'Domingo, 16h30 – 18h', note: 'Na sede da IEBA.' },
        { name: 'Noite de louvor e oração', when: 'Data a confirmar', note: 'A anunciar após aprovação.' },
        { name: 'Visita aos campos missionários', when: 'A agendar', note: 'Em conjunto com o Ministério de Missões.' }
      ],
      past: [
        { when: '2019', name: 'Formação de novos líderes', note: 'Novos líderes incansáveis da Juventude Evangélica do Bairro D\'Ajuda.' },
        { when: '2022', name: 'Encontros e formação', note: 'Participação nas atividades gerais da igreja.' },
        { when: '2024', name: 'Ações de serviço na comunidade', note: 'Apoio e visitas no Bairro de Ajuda.' }
      ],
      gallery: ['Encontro da Juventude', 'Louvor e adoração', 'Formação bíblica', 'Novos líderes', 'Comunhão', 'Ação solidária']
    },
    mulheres: {
      history: 'O Culto das Senhoras, também chamado Culto de mindjeris, é um dos encontros mais antigos da IEBA. Reúne as mulheres da igreja e das famílias da comunidade para oração, formação bíblica e apoio mútuo.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Mulheres de oração', actions: 'Oração pelas famílias e pelas necessidades da igreja.' },
        { period: '2.º Trimestre', theme: 'Formação bíblica', actions: 'Estudos sobre o papel da mulher na família e na igreja.' },
        { period: '3.º Trimestre', theme: 'Serviço e solidariedade', actions: 'Visitas, apoio a mães e ações de ajuda material.' },
        { period: '4.º Trimestre', theme: 'Ação de graças', actions: 'Culto especial de encerramento e partilha de testemunhos.' }
      ],
      upcoming: [
        { name: 'Culto das Senhoras', when: 'Sexta-feira, 17h – 20h', note: 'Encontro semanal na sede da IEBA.' },
        { name: 'Oração pelas famílias', when: 'A confirmar', note: 'Momento extraordinário de intercessão.' },
        { name: 'Formação e testemunhos', when: 'A agendar', note: 'Submetido à aprovação da administração.' }
      ],
      past: [
        { when: '2022', name: 'Culto de mindjeris', note: 'Encontros regulares de louvor e oração.' },
        { when: '2023', name: 'Apoio às famílias', note: 'Visitas e partilha com as famílias da comunidade.' },
        { when: '2025', name: 'Aniversário do ministério', note: 'Momento de ação de graças e comunhão.' }
      ],
      gallery: ['Culto das Senhoras', 'Oração em grupo', 'Formação bíblica', 'Visitas às famílias', 'Louvor', 'Partilha de testemunhos']
    },
    meninas: {
      history: 'O Ministério das Meninas acompanha as crianças e adolescentes do sexo feminino da IEBA, em coordenação com a Escola Dominical e com as famílias. O objetivo é formar uma geração que conhece o amor de Deus desde cedo.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Conhecer a Bíblia', actions: 'Histórias bíblicas e memorização de versículos.' },
        { period: '2.º Trimestre', theme: 'Amizade e cuidado', actions: 'Atividades em grupo e apoio entre as meninas.' },
        { period: '3.º Trimestre', theme: 'Descobrir talentos', actions: 'Artes, cânticos e participação nas atividades da igreja.' },
        { period: '4.º Trimestre', theme: 'Festa de encerramento', actions: 'Apresentação do que foi aprendido, com autorização dos pais.' }
      ],
      upcoming: [
        { name: 'Escola Dominical', when: 'Domingo, 09h – 10h', note: 'Na sede da IEBA.' },
        { name: 'Atividade criativa', when: 'Data a confirmar', note: 'Sujeita a autorização dos responsáveis.' },
        { name: 'Encontro das meninas', when: 'A agendar', note: 'A anunciar após aprovação.' }
      ],
      past: [
        { when: '2023', name: 'Escola Dominical', note: 'Participação regular das crianças.' },
        { when: '2024', name: 'Atividades lúdicas', note: 'Jogos e ensino bíblico ilustrado.' },
        { when: '2025', name: 'Dia da criança', note: 'Momento de comunhão e presentes.' }
      ],
      gallery: ['Escola Dominical', 'Cânticos', 'Atividades criativas', 'Ensino bíblico', 'Amizade', 'Festa das crianças']
    },
    'sal-da-terra': {
      history: 'A Organização Missionária Sal da Terra Guiné-Bissau reúne adolescentes e jovens dos 7 aos 27 anos. O lema vem de Mateus 5:13 e motivou encontros semanais, ações de evangelização e a formação de jovens para o serviço missionário.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Sal da terra', actions: 'Estudo do Sermão do Monte e identidade da organização.' },
        { period: '2.º Trimestre', theme: 'Evangelização', actions: 'Visitas, testemunhos e ações nas comunidades.' },
        { period: '3.º Trimestre', theme: 'Formação missionária', actions: 'Discipulado e preparação de novos responsáveis.' },
        { period: '4.º Trimestre', theme: 'Aniversário e envio', actions: 'Celebração do aniversário e renovação do compromisso.' }
      ],
      upcoming: [
        { name: 'Encontro semanal do Sal da Terra', when: 'Sábado, 16h – 17h', note: 'Na sede da IEBA.' },
        { name: 'Ação evangelística', when: 'A confirmar', note: 'A anunciar após aprovação.' },
        { name: 'Aniversário da organização', when: '17 de setembro', note: 'Data tradicional de celebração.' }
      ],
      past: [
        { when: '2020', name: 'Aniversário do Sal da Terra', note: 'Parabéns ST, por mais um ano de existência.' },
        { when: '2023', name: 'Ações evangelísticas', note: 'Visitas e formação cristã.' },
        { when: '2025', name: 'Encontro de jovens', note: 'Comunhão e ensino bíblico.' }
      ],
      gallery: ['Encontro do Sal da Terra', 'Mateus 5:13', 'Evangelização', 'Formação cristã', 'Louvor', 'Aniversário']
    },
    criancas: {
      history: 'O Ministério das Crianças cresceu à volta da Escola Dominical da IEBA. As famílias confiam os seus filhos para um tempo de ensino bíblico, cânticos e brincadeiras, num ambiente seguro e acolhedor.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Deus cria e cuida', actions: 'Histórias da criação e oração de ação de graças.' },
        { period: '2.º Trimestre', theme: 'Amigos de Jesus', actions: 'Ensinos sobre o amor e o perdão.' },
        { period: '3.º Trimestre', theme: 'Oração e louvor', actions: 'Cânticos e orações simples conduzidas pelas crianças.' },
        { period: '4.º Trimestre', theme: 'Celebração', actions: 'Apresentação das lições aprendidas com as famílias.' }
      ],
      upcoming: [
        { name: 'Escola Dominical', when: 'Domingo, 09h – 10h', note: 'Todas as semanas.' },
        { name: 'Atividade especial', when: 'A confirmar', note: 'Com autorização dos responsáveis legais.' },
        { name: 'Partilha com as famílias', when: 'A agendar', note: 'Apresentação dos cânticos e lições.' }
      ],
      past: [
        { when: '2023', name: 'Escola Dominical', note: 'Ensino bíblico regular.' },
        { when: '2024', name: 'Cânticos e dramatizações', note: 'Participação das crianças.' },
        { when: '2025', name: 'Festa das crianças', note: 'Comunhão com as famílias.' }
      ],
      gallery: ['Escola Dominical', 'Cânticos', 'Dramatizações', 'Ensino bíblico', 'Crianças a orar', 'Festa']
    },
    missoes: {
      history: 'O Ministério de Missões coordena o acompanhamento das igrejas filiais e campos missionários da IEBA — Tchangue, Sahara, Rucuto e Ilhas. O trabalho inclui visitas, evangelização, formação de líderes locais e apoio logístico.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Planeamento missionário', actions: 'Avaliação dos campos e definição de prioridades.' },
        { period: '2.º Trimestre', theme: 'Visitas missionárias', actions: 'Deslocações a Tchangue, Sahara, Rucuto e Ilhas.' },
        { period: '3.º Trimestre', theme: 'Formação de líderes', actions: 'Encontros de formação cristã e discipulado.' },
        { period: '4.º Trimestre', theme: 'Apoio e balanço', actions: 'Campanhas de solidariedade e relatório anual.' }
      ],
      upcoming: [
        { name: 'Visita a Tchangue', when: 'A agendar', note: 'A confirmar com a administração.' },
        { name: 'Encontro em Sahara', when: 'A agendar', note: 'Culto e formação.' },
        { name: 'Campanha de apoio aos campos', when: 'A confirmar', note: 'Sujeita a aprovação.' }
      ],
      past: [
        { when: '2022', name: 'Visitas missionárias', note: 'Acompanhamento das igrejas filiais.' },
        { when: '2024', name: 'Ações evangelísticas', note: 'Evangelização e discipulado.' },
        { when: '2025', name: 'Relatório dos campos', note: 'Balanço das atividades e necessidades.' }
      ],
      gallery: ['Campo de Tchangue', 'Sahara', 'Rucuto', 'Ilhas', 'Visita missionária', 'Evangelização']
    },
    'ministerio-oracao': {
      history: 'O Ministério de Oração acompanha a IEBA desde os seus primeiros encontros, intercedendo pela congregação, pelas famílias e pela cidade. Recebe os pedidos enviados pelo formulário público, com regras rigorosas de confidencialidade.',
      annualPlan: [
        { period: '1.º Trimestre', theme: 'Oração pela igreja', actions: 'Intercessão pelos cultos, ministérios e liderança.' },
        { period: '2.º Trimestre', theme: 'Oração pelas famílias', actions: 'Acompanhamento confidencial dos pedidos recebidos.' },
        { period: '3.º Trimestre', theme: 'Oração pela cidade', actions: 'Encontros de intercessão pela comunidade e pelo país.' },
        { period: '4.º Trimestre', theme: 'Ação de graças', actions: 'Culto de louvor e testemunhos de respostas à oração.' }
      ],
      upcoming: [
        { name: 'Orações no culto de domingo', when: 'Domingo, 10h – 10h30', note: 'Momento regular de intercessão.' },
        { name: 'Encontro de oração', when: 'A confirmar', note: 'A anunciar após aprovação.' },
        { name: 'Acompanhamento de pedidos', when: 'Contínuo', note: 'Confidencial e restrito ao ministério.' }
      ],
      past: [
        { when: '2022', name: 'Momentos de intercessão', note: 'Oração nos cultos gerais.' },
        { when: '2024', name: 'Acompanhamento de pedidos', note: 'Atendimento confidencial.' },
        { when: '2025', name: 'Culto de ação de graças', note: 'Testemunhos de respostas à oração.' }
      ],
      gallery: ['Oração comunitária', 'Intercessão', 'Culto de domingo', 'Encontro de oração', 'Ação de graças', 'Comunhão']
    }
  },

  directionPlan: {
    title: 'Plano da Direção da IEBA',
    intro: 'O plano da direção define as prioridades, os objetivos e a forma de acompanhamento da Igreja Evangélica de Bairro D\'Ajuda. É a parte do Plano Geral reservada à coordenação, à governação e à aprovação das ações propostas pelos ministérios.',
    priorities: [
      { title: 'Fidelidade à Palavra de Deus', text: 'Manter o ensino bíblico como centro de todos os cultos, estudos e formação, com materiais adequados e responsáveis preparados.' },
      { title: 'Fortalecimento da congregação', text: 'Acompanhar as famílias, incentivar a comunhão e garantir que cada membro encontre um lugar de serviço na igreja.' },
      { title: 'Expansão missionária', text: 'Apoiar Tchangue, Sahara, Rucuto e Ilhas com visitas regulares, formação de líderes e projetos aprovados.' },
      { title: 'Boa governação e transparência', text: 'Aprovar publicações, gerir recursos com responsabilidade e manter registos e auditoria em dia.' }
    ],
    goals: [
      'Reunir e aprovar os planos anuais de todos os ministérios.',
      'Acompanhar mensalmente o andamento das atividades e corrigir desvios.',
      'Garantir a formação contínua dos responsáveis de ministério e dos campos missionários.',
      'Prestar contas à congregação sobre as atividades e a utilização dos recursos.'
    ],
    notes: [
      'Plano provisório: nomes, datas e metas específicas a confirmar pela direção da igreja.',
      'Todas as ações dependem de aprovação e não podem ser publicadas sem revisão do administrador geral.'
    ]
  },

  generalProgram: {
    title: 'Programa Geral da IEBA',
    period: 'Programação anual — a confirmar pela igreja',
    intro: 'O programa geral reúne as atividades regulares e as ênfases temáticas da Igreja Evangélica de Bairro D\'Ajuda. Serve de guia para a congregação e para os ministérios, e poderá ser ajustado conforme as necessidades e confirmação da liderança.',
    blocks: [
      { period: '1.º Trimestre', theme: 'Fundamentos da fé', focus: 'Escola Dominical, discipulado e estudo bíblico. Encontros de oração pelas famílias e início das atividades dos ministérios.' },
      { period: '2.º Trimestre', theme: 'Evangelização e missões', focus: 'Visitas aos campos de Tchangue, Sahara, Rucuto e Ilhas; ações evangelísticas e formação de líderes locais.' },
      { period: '3.º Trimestre', theme: 'Formação e serviço', focus: 'Culto das Senhoras, Juventude e Sal da Terra; aulas de agropecuária e ações de apoio à comunidade.' },
      { period: '4.º Trimestre', theme: 'Ação de graças e planeamento', focus: 'Cultos especiais, balanço das atividades, redefinição de metas e preparação do programa do ano seguinte.' }
    ],
    notes: [
      'Calendário definitivo, datas de realização e responsáveis a confirmar pela administração geral.',
      'Todas as atividades constam do fluxo de submissão e aprovação antes de serem publicadas.',
      'O programa geral é distinto dos programas específicos de cada departamento/ministério.'
    ]
  },

  liturgies: [
    {
      name: 'Culto Geral / Culto de Irmandade',
      when: 'Domingo, 10h30 – 12h30',
      note: 'Ordem sugerida, sujeita à aprovação da liderança da igreja.',
      steps: [
        { title: 'Acolhimento e abertura', text: 'Receção dos fiéis, cântico de entrada e saudação pastoral.' },
        { title: 'Oração inicial', text: 'Invocação da presença de Deus e da orientação do Espírito Santo.' },
        { title: 'Louvor e adoração', text: 'Cânticos conduzidos pela equipa de louvor.' },
        { title: 'Leitura bíblica', text: 'Leitura das Escrituras e apresentação do tema do culto.' },
        { title: 'Pregação', text: 'Mensagem central da Palavra de Deus.' },
        { title: 'Oração da igreja', text: 'Intercessão pelas famílias, pelos ministérios e pelos campos missionários.' },
        { title: 'Celebração da Ceia do Senhor', text: 'Quando agendada pela liderança.' },
        { title: 'Doxologia e bênção final', text: 'Cântico de encerramento e bênção pastoral.' }
      ]
    },
    {
      name: 'Escola Dominical',
      when: 'Domingo, 09h – 10h',
      note: 'Liturgia adaptada às crianças, com linguagem simples e participação ativa.',
      steps: [
        { title: 'Receção das crianças', text: 'Acolhimento seguro e identificação dos responsáveis.' },
        { title: 'Cânticos e louvor', text: 'Músicas alegres e memorização de versículos.' },
        { title: 'Oração', text: 'Oração simples conduzida pelo professor.' },
        { title: 'Ensino bíblico', text: 'História bíblica adaptada à faixa etária.' },
        { title: 'Atividade de resposta', text: 'Desenho, dramatização ou conversa sobre a lição.' },
        { title: 'Despedida', text: 'Entrega às famílias e oração final.' }
      ]
    },
    {
      name: 'Culto das Senhoras',
      when: 'Sexta-feira, 17h – 20h',
      note: 'Também conhecido como Culto de mindjeris.',
      steps: [
        { title: 'Acolhimento', text: 'Receção das irmãs e momento de comunhão.' },
        { title: 'Louvor', text: 'Cânticos de adoração.' },
        { title: 'Oração', text: 'Oração pelas famílias e pelas necessidades partilhadas.' },
        { title: 'Formação bíblica', text: 'Ensinos e testemunhos.' },
        { title: 'Encerramento', text: 'Oração final e avisos.' }
      ]
    },
    {
      name: 'Encontro da Juventude',
      when: 'Domingo, 16h30 – 18h',
      note: 'Espaço de formação, comunhão e serviço dos jovens.',
      steps: [
        { title: 'Acolhimento', text: 'Receção dos jovens e conversa em grupo.' },
        { title: 'Louvor', text: 'Música e adoração conduzida pela equipa da juventude.' },
        { title: 'Oração', text: 'Oração pelos jovens, estudos e famílias.' },
        { title: 'Ensino e discussão', text: 'Estudo bíblico com participação.' },
        { title: 'Desafio de serviço', text: 'Apresentação de ações e próximos encontros.' }
      ]
    },
    {
      name: 'Encontro do Sal da Terra',
      when: 'Sábado, 16h – 17h',
      note: 'Adolescentes e jovens dos 7 aos 27 anos.',
      steps: [
        { title: 'Receção', text: 'Acolhimento dos participantes.' },
        { title: 'Louvor e oração', text: 'Cânticos e oração inicial.' },
        { title: 'Ensino bíblico', text: 'Formação cristã com base em Mateus 5:13.' },
        { title: 'Atividade prática', text: 'Discussão, jogos educativos ou ação de evangelização.' },
        { title: 'Encerramento', text: 'Oração final e avisos.' }
      ]
    }
  ],

  churchLeadership: {
    title: 'Direção da Igreja',
    intro: 'A direção da IEBA é responsável pela coordenação geral da igreja, pela aprovação de publicações, pela gestão dos recursos e pelo acompanhamento dos ministérios e dos campos missionários. Os nomes e cargos definitivos serão publicados após autorização.',
    roles: [
      { role: 'Pastor / Responsável geral', duty: 'Coordenação espiritual e administrativa da igreja; aprovação final de conteúdos e decisões.' },
      { role: 'Pastor adjunto / Vice-responsável', duty: 'Apoio à liderança, acompanhamento dos ministérios e substituição quando necessário.' },
      { role: 'Secretário(a) geral', duty: 'Registos, atas, documentação institucional e comunicação interna.' },
      { role: 'Tesoureiro(a)', duty: 'Gestão e registo das contribuições, com transparência e prestação de contas.' },
      { role: 'Responsável de Louvor', duty: 'Coordenação da equipa de louvor e dos ensaios da igreja.' },
      { role: 'Responsável de Missões', duty: 'Acompanhamento de Tchangue, Sahara, Rucuto e Ilhas.' },
      { role: 'Responsável de Comunicação', duty: 'Coordenação das redes sociais, do site e dos comunicados oficiais.' }
    ],
    council: 'O conselho da igreja reúne os responsáveis acima referidos e representa a direção nas decisões estratégicas. A composição definitiva e a periodicidade das reuniões a confirmar.',
    note: 'Conteúdo provisório: funções genéricas criadas para identificar a estrutura de direção. Substituir pelos nomes, cargos e atribuições oficiais autorizados pela igreja.'
  },

  news: [
    { id: 'programacao-semanal', title: 'Culto de Irmandade e Culto Geral', date: '14 de maio de 2022', source: 'Página oficial da IEBA', active: true, text: 'A Igreja Evangélica de Bairro D\'Ajuda partilhou a sua programação semanal de atividades, incluindo cultos, escola dominical, juventude, estudo bíblico e ensaios da equipa de louvor.' },
    { id: 'novos-lideres', title: 'Novos líderes da Juventude', date: '11 de outubro de 2019', source: 'Juventude Evangélica de Bairro de Ajuda', active: true, text: 'A Juventude Evangélica do Bairro D\'Ajuda destacou "novos líderes incansáveis" em incentivo ao serviço e à formação de novos responsáveis.' },
    { id: 'aniversario-sal', title: 'Aniversário do Sal da Terra', date: '17 de setembro de 2020', source: 'Organização Missionária Sal da Terra GB', active: true, text: 'A Organização Missionária Sal da Terra Guiné-Bissau celebrou mais um ano de existência com uma mensagem de parabéns e renovação do compromisso.' },
    { id: 'culto-dominical', title: 'Convite ao culto dominical', date: 'Comunicado IEBA', source: 'Comunicado da igreja', active: true, text: 'Todos são convidados para o culto geral de domingo, às 10h30, na sede da IEBA no Bairro de Ajuda. Crianças, jovens e adultos têm espaço neste momento de comunhão.' },
    { id: 'escola-dominical-noticia', title: 'Inscrições para a Escola Dominical', date: 'Comunicado IEBA', source: 'Comunicado da igreja', active: true, text: 'Estão abertas as inscrições para a Escola Dominical, que decorre aos domingos das 09h às 10h. Os responsáveis convidam as famílias a trazerem as crianças.' },
    { id: 'missoes-visita', title: 'Visita aos campos missionários', date: 'Comunicado IEBA', source: 'Ministério de Missões', active: true, text: 'O Ministério de Missões prepara uma nova visita a Tchangue, Sahara, Rucuto e Ilhas. Mais informações serão partilhadas após aprovação da administração.' },
    { id: 'culto-senhoras-noticia', title: 'Encontro das Senhoras', date: 'Comunicado IEBA', source: 'Ministério das Mulheres', active: true, text: 'O Culto das Senhoras decorre todas as sextas-feiras, das 17h às 20h, com louvor, oração e formação bíblica. A participação está aberta a todas as mulheres.' },
    { id: 'agropecuaria-noticia', title: 'Aulas de agropecuária', date: 'Comunicado IEBA', source: 'Responsabilidade social', active: true, text: 'A IEBA prepara aulas de agropecuária, criação de animais domésticos e conservação de alimentos sem frigorífico. Informações com Joaquim Correia.' },
    { id: 'pedidos-oracao-noticia', title: 'Pedidos de oração', date: 'Comunicado IEBA', source: 'Ministério de Oração', active: true, text: 'O Ministério de Oração continua a receber pedidos através do formulário do site. Todos os pedidos são tratados com confidencialidade.' }
  ]
};
