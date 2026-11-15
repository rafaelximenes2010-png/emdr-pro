/* =====================================================================
   ZOEVITA · Central de Privacidade, Segurança e Ética
   Fonte única dos textos usados no aplicativo e no site.
   Estado: MINUTA para revisão jurídica. Os trechos [A PREENCHER: …] e
   [REVISÃO JURÍDICA: …] dependem de dados institucionais ou de parecer.
   Ao mudar um texto, suba a "version" do documento e registre em "changes".
   ===================================================================== */
(function (root) {
  const ORG = {
    nome: "ZOEVITA",
    email: "atendimento@zoevita.net.br",
    site: "https://zoevita.net.br",
    app: "https://app.zoevita.net.br",
    responsavel: "[A PREENCHER: nome ou razão social do responsável pela plataforma ZOEVITA]",
    documento: "[A PREENCHER: CNPJ ou CPF do responsável]",
    endereco: "[A PREENCHER: endereço para correspondência]",
    encarregado: "[A PREENCHER: nome do encarregado pelo tratamento de dados (DPO)]",
    psicologa: "Dra. Karina Ximenes",
    crp: "[A PREENCHER: número do CRP da psicóloga responsável]"
  };
  const CFP = {
    pagina: "https://site.cfp.org.br/publicacao/codigo-de-etica-profissional-dao-psicologao/",
    pdf: "https://site.cfp.org.br/wp-content/uploads/2022/06/WEB_29535_Codigo_de_etica_da_profissao_14.04-1.pdf",
    legislacao: "https://site.cfp.org.br/legislacao/codigo-de-etica/",
    resolucao: "Resolução CFP nº 010, de 21 de julho de 2005",
    conferido: "15/11/2026"
  };
  const V = "1.0", D = "15/11/2026", MIN = "Minuta para revisão jurídica";

  const docs = [
  { id: "privacidade", slug: "privacidade", title: "Política de Privacidade e Proteção de Dados", short: "Privacidade", version: V, date: D, status: MIN,
    intro: "Esta Política explica, em linguagem direta, quais dados pessoais a ZOEVITA trata, para quê, com qual base legal, com quem são compartilhados, por quanto tempo são guardados e como você exerce seus direitos, conforme a Lei nº 13.709/2018 (LGPD).",
    sections: [
      { h: "1. Quem somos e quem responde pelos dados", p: [
        `A ZOEVITA é uma plataforma de gestão clínica para psicólogas e psicólogos (agenda, prontuário eletrônico, estimulação bilateral, teleconsulta e financeiro). Responsável pela plataforma: ${ORG.responsavel}, ${ORG.documento}, ${ORG.endereco}.`,
        `Encarregado pelo tratamento de dados: ${ORG.encarregado}. Contato: ${ORG.email}.`,
        "Os papéis variam conforme a operação. A psicóloga ou o psicólogo que atende é o CONTROLADOR dos dados de seus pacientes: é quem decide o que registrar, por quê e por quanto tempo. A ZOEVITA atua como OPERADORA quando trata esses dados em nome do profissional (por exemplo, no servidor de notificações). A ZOEVITA é CONTROLADORA dos dados das contas profissionais, do site e do Canal de Privacidade.",
        "[REVISÃO JURÍDICA: confirmar a qualificação de controlador e operador em cada operação e formalizar o contrato de operação de dados com cada profissional.]"
      ]},
      { h: "2. Onde os dados ficam hoje", p: [
        "Na versão atual, os dados clínicos e cadastrais ficam guardados no próprio aparelho do profissional (memória local do navegador ou do aplicativo). A ZOEVITA não mantém cópia central do prontuário e não tem acesso ao conteúdo clínico.",
        "Isso significa que a guarda, a cópia de segurança e a proteção física do aparelho são responsabilidade do profissional. A plataforma oferece bloqueio por PIN, bloqueio por inatividade e cópia de segurança protegida por senha para apoiar essa guarda."
      ]},
      { h: "3. Dados que tratamos", ul: [
        "Profissional: nome, registro no CRP, especialidade, contatos, preferências de uso, aceites dos termos e registros de atividade no aparelho.",
        "Paciente (cadastro): nome e nome social, data de nascimento, telefone, e-mail, contato de emergência e, quando houver, responsável legal.",
        "Paciente (dados pessoais sensíveis de saúde): registros clínicos, evoluções, registros de EMDR, relatórios e documentos psicológicos, consentimentos assinados.",
        "Agenda e financeiro: datas, horários, modalidade, valores, forma de pagamento e recibos.",
        "Teleconsulta: dados técnicos de conexão (endereço IP, identificadores temporários de sala) e, somente com autorização específica do paciente, gravação de áudio e vídeo e transcrição.",
        "Notificações: endereço técnico de entrega do aparelho, horários das sessões e códigos de sala, sem nome do paciente e sem conteúdo clínico.",
        "Canal de Privacidade: nome, e-mail, tipo de solicitação e mensagem enviada."
      ]},
      { h: "4. Finalidades e bases legais", table: { head: ["Finalidade", "Base legal (LGPD)"], rows: [
        ["Registro documental e prontuário do atendimento psicológico", "Art. 11, II, \"a\" (obrigação legal ou regulatória: normas do CFP sobre registro documental) e art. 11, II, \"f\" (tutela da saúde, em procedimento realizado por profissional de saúde)"],
        ["Cadastro do paciente e agendamento", "Art. 7º, V (execução de contrato ou procedimentos preliminares) e, quanto a dados de saúde, art. 11, II, \"f\""],
        ["Emissão de recibos e controle financeiro", "Art. 7º, II (obrigação legal, inclusive fiscal) e art. 7º, V"],
        ["Teleconsulta (conexão de vídeo e estimulação bilateral à distância)", "Art. 11, II, \"f\" e art. 7º, V"],
        ["Gravação ou transcrição de sessão", "Art. 11, I (consentimento específico e destacado do paciente, revogável). Desligadas por padrão."],
        ["Registro de atividades e segurança do sistema", "Art. 7º, II e art. 46 (dever de segurança); art. 11, II, \"a\""],
        ["Notificações ao profissional", "Art. 7º, V (execução do contrato de uso), ativadas por escolha do profissional e desligáveis a qualquer momento"],
        ["Atendimento a solicitações de titulares", "Art. 7º, II (cumprimento do art. 18 da LGPD)"]
      ]}, p: ["O aceite dos Termos de Uso não é tratado como consentimento para dados sensíveis. Cada base legal acima é aplicada à sua finalidade. [REVISÃO JURÍDICA: validar o enquadramento de cada finalidade.]"] },
      { h: "5. Compartilhamento com fornecedores", p: ["A ZOEVITA não vende dados, não os usa para publicidade e não usa prontuários para treinar inteligência artificial ou para análises secundárias. Fornecedores técnicos envolvidos:"], ul: [
        "GitHub (Microsoft), Estados Unidos: hospedagem do código do aplicativo e do site. Recebe dados técnicos de acesso (IP, navegador).",
        "Cloudflare, rede global: servidor de notificações. Recebe endereço de entrega, horários e códigos de sala, sem nomes nem dados clínicos.",
        "Serviços de notificação do sistema (Apple, Google ou Mozilla, conforme o aparelho): entregam o aviso ao aparelho.",
        "PeerJS (servidores públicos de sinalização e retransmissão): estabelecem a conexão da teleconsulta. O vídeo trafega criptografado de ponta a ponta entre os aparelhos (DTLS-SRTP).",
        "Reconhecimento de fala do navegador (Google no Chrome, Apple no Safari): usado apenas se a transcrição for ativada com autorização do paciente; o áudio é processado pelo fornecedor do navegador."
      ]},
      { h: "6. Transferência internacional", p: ["Alguns fornecedores acima processam dados fora do Brasil. [REVISÃO JURÍDICA: indicar a hipótese do art. 33 da LGPD aplicável a cada fornecedor (por exemplo, cláusulas-padrão contratuais da ANPD) e avaliar alternativas nacionais para a transcrição.]"] },
      { h: "7. Guarda e eliminação", ul: [
        "Documentos psicológicos e o material que os fundamenta: no mínimo 5 (cinco) anos, conforme as normas do CFP (Resolução CFP nº 06/2019, art. 15), podendo ser ampliado por lei ou decisão judicial.",
        "Dados financeiros: pelo prazo exigido pela legislação fiscal. [REVISÃO JURÍDICA: confirmar prazo.]",
        "Lembretes no servidor de notificações: apagados até 25 minutos após o envio. Inscrição do aparelho: até ser desativada.",
        "Registros do Canal de Privacidade: pelo prazo necessário para comprovar o atendimento. [A PREENCHER: prazo.]",
        "Após os prazos, os dados são eliminados de forma segura ou anonimizados, salvo obrigação legal de guarda."
      ]},
      { h: "8. Seus direitos", p: ["Você pode pedir confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação (quando cabível), portabilidade, informação sobre compartilhamento e revogação de consentimento, nos termos do art. 18 da LGPD. Veja a página Direitos dos Titulares e use o Canal de Privacidade. Pedidos sobre prontuário são encaminhados ao profissional responsável pelo atendimento, que é o controlador."] },
      { h: "9. Segurança", p: ["Adotamos as medidas descritas na Política de Segurança da Informação. Nenhum sistema é imune a falhas; por isso mantemos registro de atividades e um procedimento de resposta a incidentes."] },
      { h: "10. Atualizações desta Política", p: ["Mudanças relevantes geram nova versão, com data, e são comunicadas no aplicativo. O histórico de versões fica disponível na Central de Privacidade."] }
    ]},

  { id: "seguranca", slug: "seguranca", title: "Política de Segurança da Informação", short: "Segurança", version: V, date: D, status: MIN,
    intro: "Esta Política descreve as medidas técnicas e operacionais de segurança da ZOEVITA. Os itens indicam se o controle está em funcionamento ou ainda planejado. A ZOEVITA não declara ser 100% segura nem possui certificação de segurança.",
    sections: [
      { h: "1. Princípios", ul: ["Mínimo acesso necessário: cada perfil vê apenas o que precisa.", "Sigilo clínico acima de conveniência técnica.", "Rastreabilidade das ações sensíveis.", "Transparência sobre o que ainda não está implementado."] },
      { h: "2. Controles técnicos em funcionamento", ul: [
        "Comunicação criptografada: aplicativo e site servidos apenas por HTTPS (TLS); teleconsulta com criptografia ponta a ponta (DTLS-SRTP).",
        "Permissões por função: Psicóloga (acesso clínico), Recepção (agenda e cadastro, sem prontuário) e Administrador (configurações, sem acesso ao conteúdo clínico).",
        "Bloqueio do aplicativo por PIN e bloqueio automático por inatividade, com código de recuperação.",
        "PIN exigido para assumir o perfil Psicóloga quando o bloqueio está ativo.",
        "Registro de atividades: abertura de prontuário, alterações, exportações em PDF e Excel, impressões, cópias de segurança, gravações, consentimentos e tentativas de acesso negadas.",
        "Cópia de segurança protegida por senha (criptografia AES-256-GCM com chave derivada por PBKDF2).",
        "Notificações sem dados clínicos e sem nome do paciente na tela bloqueada, salvo escolha do profissional.",
        "Gravação de sessão desligada por padrão e condicionada à autorização registrada do paciente.",
        "Bibliotecas de terceiros empacotadas com o aplicativo, com versão fixa."
      ]},
      { h: "3. Controles planejados (ainda não implementados)", ul: [
        "Contas individuais com senha forte e autenticação multifator (MFA) para profissionais. Hoje os perfis são locais ao aparelho.",
        "Criptografia dos dados armazenados no aparelho com chave do usuário (hoje a proteção é o bloqueio do aplicativo e do próprio aparelho).",
        "Servidor central com isolamento por profissional e por vínculo com o paciente.",
        "Backups automáticos criptografados fora do aparelho e testes periódicos de restauração.",
        "Monitoramento de atividades suspeitas e alertas.",
        "Rotina formal de atualização de dependências e gestão de vulnerabilidades, com revisão a cada versão.",
        "Revisão periódica de permissões em contas reais."
      ]},
      { h: "4. Segurança operacional", ul: [
        "Senhas e PIN: não compartilhar; PIN com no mínimo 6 dígitos; trocar ao suspeitar de exposição.",
        "Aparelho: manter bloqueio de tela, sistema atualizado e criptografia do aparelho ligada.",
        "Cópias de segurança: sempre com senha, guardadas em local protegido; nunca enviar por e-mail ou mensagem.",
        "Acesso administrativo técnico: administradores técnicos não têm acesso rotineiro ao conteúdo clínico. Acesso excepcional exigirá justificativa escrita, autorização do profissional responsável e registro. [Hoje não existe acesso técnico ao conteúdo clínico, pois ele fica no aparelho.]",
        "Continuidade: em caso de perda do aparelho, restaurar a última cópia de segurança em outro aparelho."
      ]},
      { h: "5. Incidentes e vazamentos", ol: [
        "Quem identificar suspeita de incidente comunica imediatamente pelo Canal de Privacidade (tipo \"Comunicação de incidente\").",
        "Contenção: bloquear o aplicativo, trocar PIN e senhas, desativar notificações e revogar acessos do aparelho afetado.",
        "Avaliação: quais dados, quantos titulares, risco provável.",
        "Comunicação à ANPD e aos titulares quando houver risco ou dano relevante, no prazo regulamentar. [REVISÃO JURÍDICA: confirmar prazos e conteúdo conforme o regulamento da ANPD vigente.]",
        "Registro do incidente, das decisões e das melhorias adotadas."
      ]},
      { h: "6. Revisão", p: ["Esta Política é revista a cada nova versão relevante da plataforma ou, no mínimo, uma vez por ano."] }
    ]},

  { id: "termos", slug: "termos", title: "Termos de Uso da Plataforma", short: "Termos de Uso", version: V, date: D, status: MIN,
    intro: "Estes Termos regulam o uso do aplicativo e do site ZOEVITA por profissionais da Psicologia e suas equipes.",
    sections: [
      { h: "1. Aceite", p: ["O uso do aplicativo depende do aceite destes Termos, registrado com data, hora, versão e perfil. O aceite destes Termos não substitui consentimentos específicos exigidos por lei, como a autorização do paciente para gravação de sessão."] },
      { h: "2. O que a plataforma oferece", p: ["Ferramentas de apoio à prática clínica: agenda, prontuário eletrônico, estimulação bilateral visual e auditiva, teleconsulta, documentos em PDF, relatórios e controle financeiro. A plataforma é uma ferramenta; não presta serviço psicológico, não faz diagnóstico e não substitui o julgamento profissional."] },
      { h: "3. Responsabilidade profissional", p: ["A psicóloga ou o psicólogo é responsável pela utilização ética e tecnicamente adequada dos recursos, pelo conteúdo dos registros e documentos, pela indicação da estimulação bilateral, pela adequação da teleconsulta a cada caso e pelo cumprimento do Código de Ética Profissional e das resoluções do CFP, inclusive a Resolução CFP nº 09/2024 sobre o exercício mediado por tecnologias digitais."] },
      { h: "4. Sem chancela do CFP", p: ["A ZOEVITA não possui homologação, certificação ou aprovação do Conselho Federal de Psicologia nem dos Conselhos Regionais."] },
      { h: "5. Deveres de quem usa", ul: ["Manter o aparelho protegido e o PIN em sigilo.", "Usar perfis de acesso conforme a função de cada pessoa da equipe.", "Fazer cópias de segurança regulares, protegidas por senha.", "Não inserir dados de pacientes em campos que não sejam destinados a isso.", "Não usar a plataforma para fins ilícitos ou contrários à ética profissional."] },
      { h: "6. Disponibilidade e versões", p: ["A plataforma está em fase de protótipo e pode mudar. Novas versões são comunicadas na Central de Atualizações. Alterações relevantes destes Termos exigem novo aceite."] },
      { h: "7. Limitação de responsabilidade", p: ["[REVISÃO JURÍDICA: redigir cláusula de limitação de responsabilidade compatível com o Código de Defesa do Consumidor e com a natureza do serviço.]"] },
      { h: "8. Lei e foro", p: ["Aplica-se a legislação brasileira. Foro: [A PREENCHER: comarca]."] }
    ]},

  { id: "sigilo", slug: "sigilo", title: "Sigilo Profissional e Confidencialidade", short: "Sigilo", version: V, date: D, status: MIN,
    intro: "O sigilo é dever ético da psicóloga e do psicólogo. A ZOEVITA foi desenhada para apoiar esse dever.",
    sections: [
      { h: "1. Como a plataforma protege o sigilo", ul: [
        "Cada profissional acessa somente os prontuários do próprio aparelho e de seus pacientes.",
        "A Recepção vê agenda e cadastro, mas não vê prontuário. O Administrador configura o sistema, mas não vê conteúdo clínico.",
        "Toda abertura de prontuário, alteração, exportação e impressão fica registrada.",
        "O paciente, pelo link da teleconsulta, vê somente a própria sala. Não há área em que um paciente veja dados de outro.",
        "Notificações nunca trazem conteúdo clínico, e o nome do paciente só aparece se o profissional escolher.",
        "Prontuários não são usados para publicidade, treinamento de inteligência artificial ou análises secundárias.",
        "Sessões não são gravadas por padrão. Gravação e transcrição exigem autorização específica do paciente, registrada a cada sessão."
      ]},
      { h: "2. Exportações", p: ["PDFs, planilhas e cópias de segurança contêm dados sensíveis. As cópias de segurança são protegidas por senha. Exportações de prontuário são registradas. Guarde os arquivos em local protegido e evite enviá-los por e-mail ou aplicativos de mensagem."] },
      { h: "3. Quebra de sigilo", p: ["As hipóteses de quebra de sigilo são as previstas no Código de Ética Profissional (art. 10) e decididas pelo profissional, com restrição às informações estritamente necessárias. A plataforma não toma decisões sobre sigilo."] },
      { h: "4. Guarda e descarte", p: ["Os documentos e registros devem ser guardados pelo prazo mínimo das normas do CFP (Resolução CFP nº 06/2019, art. 15: 5 anos) e descartados com segurança depois disso, salvo obrigação legal de guarda maior."] }
    ]},

  { id: "direitos", slug: "direitos-lgpd", title: "Direitos dos Titulares de Dados (LGPD)", short: "Seus direitos", version: V, date: D, status: MIN,
    intro: "Toda pessoa cujos dados são tratados na ZOEVITA tem os direitos do art. 18 da LGPD.",
    sections: [
      { h: "1. Quais são os direitos", ul: ["Confirmação de que seus dados são tratados.", "Acesso aos dados.", "Correção de dados incompletos, inexatos ou desatualizados.", "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade.", "Portabilidade, conforme regulamentação da ANPD.", "Eliminação de dados tratados com base no consentimento, quando cabível.", "Informação sobre com quem os dados são compartilhados.", "Informação sobre a possibilidade de não consentir e suas consequências.", "Revogação do consentimento.", "Revisão de decisões automatizadas (a ZOEVITA não toma decisões automatizadas sobre pacientes)."] },
      { h: "2. Limites legais", p: ["A eliminação nem sempre é possível: registros de prontuário e documentos psicológicos devem ser guardados pelo prazo das normas do CFP, e dados financeiros pelo prazo fiscal. Nesses casos, explicamos o motivo na resposta."] },
      { h: "3. Como pedir", ol: ["Use o Canal de Privacidade e escolha o tipo de pedido.", "Você recebe um número de protocolo.", "Podemos pedir confirmação de identidade antes de entregar dados.", "Pedidos sobre prontuário são encaminhados ao profissional que fez o atendimento, que é o controlador desses dados.", "Resposta em prazo razoável e, para confirmação e acesso em formato simplificado, imediatamente; em formato completo, em até 15 dias (LGPD, art. 19)."] },
      { h: "4. Reclamação", p: ["Se não ficar satisfeito, você pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD), em gov.br/anpd."] }
    ]},

  { id: "cookies", slug: "cookies", title: "Política de Cookies e Armazenamento Local", short: "Cookies", version: V, date: D, status: MIN,
    intro: "Explica o que fica gravado no seu navegador ao usar a ZOEVITA.",
    sections: [
      { h: "1. O que usamos", ul: [
        "Armazenamento local do navegador (estritamente necessário): guarda os dados do aplicativo no próprio aparelho, as preferências e o estado do bloqueio. Sem ele o aplicativo não funciona.",
        "Cache do aplicativo (service worker): permite abrir o aplicativo sem internet e mais rápido.",
        "Caixa de notificações local: guarda os avisos recebidos neste aparelho."
      ]},
      { h: "2. O que não usamos", p: ["A ZOEVITA não usa cookies de publicidade, rastreamento entre sites nem ferramentas de análise de comportamento. Por isso não exibimos banner de consentimento de cookies. Se isso mudar, pediremos sua escolha antes."] },
      { h: "3. Como apagar", p: ["Você pode apagar os dados do site nas configurações do navegador. Atenção: isso apaga também os dados clínicos guardados no aparelho. Faça uma cópia de segurança antes."] }
    ]},

  { id: "consentimentos", slug: "consentimentos", title: "Consentimentos e Autorizações", short: "Consentimentos", version: V, date: D, status: MIN,
    intro: "Quando um tratamento depende de consentimento, ele é pedido de forma específica, registrado e pode ser revogado.",
    sections: [
      { h: "1. Aceites do profissional", ul: ["Termos de Uso: aceite registrado com data, hora, versão e perfil.", "Política de Privacidade: registro de ciência (não é consentimento).", "Novo aceite é pedido quando uma versão relevante é publicada."] },
      { h: "2. Consentimentos do paciente", ul: ["Atendimento psicológico (TCLE), EMDR e contrato terapêutico: registrados no cadastro do paciente, com data.", "Gravação e transcrição de teleconsulta: autorização específica, pedida a cada sessão, registrada no histórico; o paciente pode recusar ou interromper.", "Aviso de privacidade ao paciente (LGPD): registrado no cadastro."] },
      { h: "3. Escolhas do profissional neste aparelho", ul: ["Notificações na tela bloqueada: ativar ou desativar a qualquer momento.", "Nome do paciente nas notificações: desligado por padrão; pode ser ligado e desligado."] },
      { h: "4. Revogação", p: ["A revogação vale dali em diante e não afeta o que foi feito antes com base no consentimento. Revogações também ficam registradas."] }
    ]},

  { id: "canal", slug: "contato", title: "Canal de Privacidade e Segurança", short: "Contato", version: V, date: D, status: MIN,
    intro: `Use este canal para pedidos sobre seus dados, dúvidas de privacidade e comunicação de incidentes. E-mail oficial: ${ORG.email}.`,
    sections: [
      { h: "Como funciona", ul: ["Cada solicitação recebe um número de protocolo.", "Não envie dados clínicos, diagnósticos ou relatos de atendimento por este canal. Eles não são necessários para atender o pedido.", "Podemos pedir confirmação de identidade antes de entregar dados.", "Pedidos sobre prontuário são encaminhados ao profissional responsável."] }
    ]}
  ];

  const ethics = {
    title: "Ética Profissional na Psicologia",
    resolucao: CFP.resolucao,
    fonte: "Conselho Federal de Psicologia (CFP)",
    conferido: CFP.conferido,
    links: CFP,
    aviso: "O resumo abaixo é educativo e não substitui o texto oficial do Código de Ética. Em caso de dúvida, vale sempre o documento publicado pelo CFP.",
    principios: [
      "Promoção do respeito e da dignidade, da liberdade, da igualdade e da integridade do ser humano, apoiada nos valores da Declaração Universal dos Direitos Humanos.",
      "Atuação voltada à promoção da saúde e da qualidade de vida das pessoas e coletividades, contribuindo para eliminar negligência, discriminação, exploração, violência, crueldade e opressão.",
      "Atuação com responsabilidade social, analisando crítica e historicamente a realidade política, econômica, social e cultural.",
      "Atuação com responsabilidade, por meio do contínuo aprimoramento profissional, contribuindo para o desenvolvimento da Psicologia como campo científico e profissional.",
      "Contribuição para promover a universalização do acesso da população às informações, ao conhecimento da ciência psicológica e aos serviços e padrões éticos da profissão.",
      "Zelo para que o exercício profissional seja efetuado com dignidade, rejeitando situações em que a Psicologia esteja sendo aviltada.",
      "Consideração das relações de poder nos contextos em que atua e dos impactos dessas relações sobre as suas atividades profissionais, posicionando-se de forma crítica."
    ],
    sigilo: [
      "O Código de Ética estabelece o dever de respeitar o sigilo profissional para proteger a intimidade das pessoas, grupos ou organizações a que se tenha acesso no exercício profissional.",
      "A quebra de sigilo só é admitida nas situações previstas no próprio Código, decidida pelo profissional com base na busca do menor prejuízo, e restrita às informações estritamente necessárias.",
      "Documentos e registros devem ser guardados com cuidado e pelo prazo das resoluções do CFP sobre registro documental e documentos psicológicos."
    ],
    normas: [
      ["Resolução CFP nº 010/2005", "Código de Ética Profissional do Psicólogo"],
      ["Resolução CFP nº 09/2024", "Exercício da Psicologia mediado por Tecnologias Digitais da Informação e da Comunicação (revogou as Resoluções CFP nº 11/2018 e nº 04/2020)"],
      ["Resolução CFP nº 06/2019", "Elaboração, guarda e destino dos documentos psicológicos (guarda mínima de 5 anos, art. 15)"],
      ["Resolução CFP nº 01/2009", "Registro documental decorrente da prestação de serviços psicológicos"]
    ],
    responsabilidade: "A ZOEVITA é uma ferramenta de apoio. A psicóloga ou o psicólogo é responsável pela utilização ética e tecnicamente adequada dos recursos. A ZOEVITA não possui homologação, chancela ou aprovação do CFP."
  };

  const changes = [
    { v: "1.0", date: D, text: "Primeira versão (minuta) da Central de Privacidade, Segurança e Ética: 9 documentos, aceite registrado, canal com protocolo." }
  ];

  root.ZV_LEGAL = { ORG, CFP, docs, ethics, changes, version: V, date: D, status: MIN };
})(typeof window !== "undefined" ? window : globalThis);
