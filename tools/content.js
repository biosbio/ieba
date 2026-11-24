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
    { title: 'Culto Geral Dominical', date: 'Todos os domingos', time: '10h30 – 12h30', location: 'Sede da IEBA — Bairro de Ajuda', ministry: 'IEBA', status: 'Em curso', description: 'Culto principal da congregação, com louvor, pregação e comunhão. Intercala com o culto de irmandade.' },
    { title: 'Escola Dominical', date: 'Todos os domingos', time: '09h – 10h', location: 'Sede da IEBA', ministry: 'Crianças', status: 'Em curso', description: 'Ensino bíblico para crianças e famílias.' },
    { title: 'Encontro da Juventude', date: 'Todos os domingos', time: '16h30 – 18h', location: 'Sede da IEBA', ministry: 'Juventude', status: 'Em curso', description: 'Encontro semanal da Juventude Evangélica de Bairro de Ajuda.' },
    { title: 'Culto das Senhoras', date: 'Todas as sextas-feiras', time: '17h – 20h', location: 'Sede da IEBA', ministry: 'Mulheres', status: 'Em curso', description: 'Culto e formação das mulheres da igreja (Culto de mindjeris).' },
    { title: 'Encontro do Sal da Terra', date: 'Todos os sábados', time: '16h – 17h', location: 'Sede da IEBA', ministry: 'Sal da Terra', status: 'Em curso', description: 'Encontro da organização de adolescentes e jovens dos 7 aos 27 anos.' },
    { title: 'Estudo Bíblico', date: 'Todos os domingos', time: '19h – 21h', location: 'Sede da IEBA', ministry: 'IEBA', status: 'Em curso', description: 'Estudo aprofundado da Palavra de Deus.' },
    { title: 'Ensaio da Equipa de Louvor', date: 'Quartas e sábados', time: '18h – 20h', location: 'Sede da IEBA', ministry: 'Louvor', status: 'Em curso', description: 'Preparação musical para os cultos.' },
    { title: 'Aulas de Agropecuária', date: 'Programação a confirmar', time: 'A confirmar', location: 'Sede da IEBA', ministry: 'Responsabilidade social', status: 'Planeado', description: 'Aulas de agropecuária, criação de animais domésticos e conservação de alimentos sem frigorífico. Informações com Joaquim Correia.' }
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

  news: [
    { title: 'Culto de Irmandade e Culto Geral', date: '14 de maio de 2022', source: 'Página oficial da IEBA', text: 'A Igreja Evangélica de Bairro D\'Ajuda partilhou a sua programação semanal de atividades, incluindo cultos, escola dominical, juventude, estudo bíblico e ensaios da equipa de louvor.' },
    { title: 'Novos líderes da Juventude', date: '11 de outubro de 2019', source: 'Juventude Evangélica de Bairro de Ajuda', text: 'A Juventude Evangélica do Bairro D\'Ajuda destacou "novos líderes incansáveis" em incentivo ao serviço e à formação de novos responsáveis.' },
    { title: 'Aniversário do Sal da Terra', date: '17 de setembro de 2020', source: 'Organização Missionária Sal da Terra GB', text: 'A Organização Missionária Sal da Terra Guiné-Bissau celebrou mais um ano de existência com uma mensagem de parabéns e renovação do compromisso.' }
  ]
};
