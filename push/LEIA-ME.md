# Notificações do EMDR PRO na tela bloqueada

O app já mostra os avisos dentro dele (sino no menu) e, com as notificações
ativadas, também enquanto está aberto ou em segundo plano. Para os avisos
chegarem **com o app fechado**, falta ligar uma vez este pequeno servidor no
Cloudflare, do mesmo jeito que foi feito para o SOLA (mas separado dele).

## Passo a passo (uns 5 minutos)
1. Entre em https://dash.cloudflare.com com a mesma conta do SOLA.
2. **Workers & Pages › Create › Create Worker**. Nome: **`emdr-push`** (exatamente assim) › **Deploy**.
3. **Edit code**: apague tudo, cole o conteúdo de `worker.js` (desta pasta) › **Deploy**.
4. **Storage & Databases › KV › Create**: nome `emdr-push`.
   Volte ao Worker › **Settings › Bindings › Add › KV namespace**:
   nome da variável **`EMDR_PUSH`**, namespace `emdr-push` › Save.
5. **Settings › Triggers › Cron Triggers › Add**: `*/5 * * * *` (a cada 5 minutos).

Pronto. O endereço fica `https://emdr-push.rafael-ximenes-2010.workers.dev`,
que o app já usa. As chaves de segurança (VAPID) são criadas sozinhas.

Depois, em cada aparelho: abra o EMDR PRO › sino › **Configurar** ›
**Ativar notificações neste aparelho** › **Enviar notificação de teste**.
No iPhone, o app precisa estar instalado na tela de início.

## O que o servidor envia
- Lembrete de sessão (5, 10, 15, 30 ou 60 minutos antes)
- Resumo da agenda do dia, no horário escolhido
- Paciente na sala de espera (quando o paciente abre o link da teleconsulta e a sala ainda não está aberta)
- Versão nova do EMDR PRO (sozinho, ao publicar)

## Privacidade
O app nunca envia nomes de pacientes nem dados clínicos ao servidor: só
horários e textos genéricos ("Sessão às 14:00 · em 15 min"). O nome do
paciente só aparece em avisos gerados no próprio aparelho, e apenas se a
opção "Mostrar o nome do paciente" estiver ligada.

## App nativo (APK Android)
No app instalado pelo APK, os lembretes são agendados no próprio celular e
aparecem na tela bloqueada mesmo sem internet, sem depender deste servidor.
