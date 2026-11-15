# ZOEVITA · Relatório de conformidade da Central de Privacidade, Segurança e Ética

Versão do aplicativo: 5.0 · Documentos: 1.0 (minuta) · Data: 15/11/2026
Regra seguida: nenhum controle foi marcado como concluído sem estar implementado e testado.

## 1. O que foi entregue

| Item do pedido | Situação | Onde |
|---|---|---|
| Central com 9 páginas | Implementado e testado | App: menu "Segurança, Privacidade e Ética" · Site: `/central/` e rodapé |
| Política de Privacidade (LGPD) | Minuta pronta para revisão jurídica | `legal/conteudo.js` (fonte única) |
| Política de Segurança da Informação | Minuta, separando o que funciona do que é planejado | idem |
| Termos de Uso | Minuta | idem |
| Código de Ética (Res. CFP 010/2005) | Implementado: botão, link oficial, visualizador do PDF, resumo educativo rotulado | App: "Ética Profissional" · Site: `/etica-profissional/` |
| Sigilo, Direitos LGPD, Cookies, Consentimentos | Minutas | App e site |
| Canal de Privacidade com protocolo | Implementado (protocolo + e-mail pronto para atendimento@zoevita.net.br) | App e site `/contato/` |
| Aceite registrado com data, hora e versão | Implementado e testado | App (por perfil) |
| Histórico de versões dos documentos | Implementado | App e site |
| Revogação de consentimentos opcionais | Implementado (notificações; nome nas notificações) | App › Consentimentos |
| Menu de configurações | Implementado | App: "Configurações" e engrenagem · Site: engrenagem no topo |

## 2. Controles técnicos implementados (testados em 15/11/2026)

- Bloqueio por PIN (6 a 12 dígitos, PBKDF2-SHA256 210 mil iterações), bloqueio automático por inatividade (2 a 30 min), bloqueio manual, espera progressiva após 5 erros, código de recuperação.
- PIN exigido para assumir o perfil Psicóloga quando o bloqueio está ativo.
- Cópia de segurança criptografada (AES-256-GCM, PBKDF2-SHA256 310 mil iterações); cópias antigas sem senha continuam restauráveis.
- Registro de atividades ampliado (até 3.000 eventos): exportações em PDF e Excel, impressões, cópias, aceites, revogações, PIN, tentativas negadas. O registro do aparelho é preservado ao restaurar uma cópia.
- Notificações sem dados clínicos; servidor nunca recebe nomes (já existente, revalidado).
- Gravação desligada por padrão, só com autorização registrada do paciente (já existente).
- Administrador sem acesso a conteúdo clínico; Recepção sem prontuário (já existente).
- Página do paciente (link da teleconsulta) sem menu, sem aceite e sem acesso a dados.

## 3. Evidências dos testes (critérios de aceitação)

| # | Critério | Resultado |
|---|---|---|
| 1 | Links institucionais | 11 páginas do site abertas, todos os links internos com HTTP 200, rodapé completo em todas |
| 2 | Permissões e isolamento | Recepção pede aceite próprio; troca para Psicóloga exige PIN; paciente não vê menu nem dados |
| 3 | Recuperação de acesso | PIN errado recusado; código de recuperação remove o PIN e pede novo |
| 4 | Logs e dados sensíveis | Notificações e servidor sem nomes; registro sem conteúdo clínico; cópia criptografada não contém nomes em claro |
| 5 | Políticas e versões | 9 documentos com versão, data, situação e histórico |
| 6 | Formulários | Canal gera protocolo, alerta sobre dado clínico e abre e-mail pronto (app e site) |
| 7 | Links do Código de Ética | Página e PDF oficiais do CFP respondem 200 e permitem visualização incorporada (conferido em 15/11/2026) |
| 8 | Acesso pelo app e pelo site | Testado em computador e celular (tela de 390 px) |
| 9 | Configurações de segurança | Tema, texto e animações; PIN; notificações; cópia protegida |
| 10 | Pendências | Listadas abaixo |

## 4. Pendências (não marcar como concluído)

### Jurídicas
- Preencher dados institucionais: responsável/razão social, CNPJ ou CPF, endereço, encarregado (DPO), CRP, foro, prazos.
- Revisar o enquadramento de controlador e operador e assinar contrato de operação com cada profissional.
- Validar bases legais por finalidade.
- Definir a hipótese de transferência internacional (GitHub, Cloudflare, PeerJS, serviços de notificação, reconhecimento de fala).
- Redigir cláusula de limitação de responsabilidade.
- Confirmar prazos de comunicação de incidentes conforme regulamento vigente da ANPD.

### Técnicas
- Contas individuais com senha e autenticação multifator (exige servidor).
- Criptografia dos dados guardados no aparelho com chave do usuário (hoje: bloqueio do app + bloqueio do aparelho).
- Servidor central com isolamento por profissional e por vínculo com o paciente.
- Backups automáticos fora do aparelho e testes periódicos de restauração.
- Monitoramento de atividade suspeita.
- Rotina de atualização de dependências e gestão de vulnerabilidades.
- Tramitação segura do Canal (hoje usa o e-mail do usuário; ideal: formulário com servidor e caixa protegida).
- Avaliar alternativa nacional/local para a transcrição (hoje processada pelo fornecedor do navegador).

### Operacionais
- Registrar o domínio zoevita.net.br e apontar `zoevita.net.br` (site) e `app.zoevita.net.br` (aplicativo). Hoje: site em `/emdr-pro/site/` e app em `/emdr-pro/` no GitHub Pages.
- Criar a caixa atendimento@zoevita.net.br.
- Definir quem responde o Canal e em quanto tempo.
- Revisão anual das políticas e das permissões.

## 5. Arquivos
- `legal/conteudo.js`: textos (fonte única do app e do site). Ao alterar, subir a versão e registrar em `changes`.
- `site/build.mjs`: gera o site (`node site/build.mjs`).
- `index.html`: Central, Ética Profissional, Configurações, PIN, cópia criptografada, auditoria.
