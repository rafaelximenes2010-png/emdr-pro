# EMDR PRO · Karina Ximenes, Psicóloga

Aplicativo (PWA) de gestão clínica e estimulação bilateral EMDR, para celular e computador.
*Pessoas • Histórias • Recomeços*

**Instalar:**
- **iPhone/iPad:** abra o endereço no Safari → Compartilhar → Adicionar à Tela de Início.
- **Android:** Chrome → menu ⋮ → Instalar app.
- **Computador:** Chrome ou Edge → ícone de instalar na barra de endereço (ou menu → Instalar EMDR PRO).

## Módulos
- **Painel** — indicadores do dia e do mês (com detalhes ao clicar), pendências, atalhos e frase em destaque.
- **Estimulação EMDR** — ponto bilateral com velocidade, amplitude, cor, tamanho, duração do set, áudio alternado e configurações salvas.
- **Agenda** — dia, semana e mês; arrastar para reagendar; bloqueios; lista de espera; prevenção de conflitos.
- **Teleconsulta** — link próprio por consulta, cronômetro, anotações, gravação e transcrição (com autorização do paciente) e janela de estimulação para compartilhar na sala de vídeo.
- **Pacientes e prontuário** — cadastro, registro clínico com histórico, evoluções, registros EMDR pelas 8 fases, relatórios psicológicos, auditoria e documentos em PDF.
- **Financeiro** — cobranças automáticas, recibos, despesas, inadimplência e ocupação.
- **Relatórios** — exportação em Excel e PDF por período.
- **Anotações**, **Atualizações** e **Personalizar** (módulos visíveis, perfis e permissões, cópia de segurança, dados de demonstração).

## Dados e privacidade
- Os dados ficam **somente no aparelho** em que o app é usado (armazenamento do navegador). Nada é enviado para este repositório nem para o GitHub.
- Celular e computador **não sincronizam sozinhos**: use *Personalizar → Cópia de segurança* para levar os dados de um aparelho para o outro.
- O app vem com **dados de demonstração** fictícios, que podem ser apagados em um clique.
- Para atender pacientes reais, ainda é necessária a versão com servidor seguro (login individual com dois fatores, criptografia, backup automático e auditoria no servidor) e a validação de LGPD e das normas do CFP.

## Publicar uma nova versão
1. Substitua o `index.html`.
2. Em `sw.js`, aumente o número de `CACHE` (ex.: `emdrpro-v2`), para os aparelhos baixarem a versão nova.
3. Envie para o ramo `main`. O workflow *Publicar app no GitHub Pages* atualiza o ramo `gh-pages` automaticamente.
