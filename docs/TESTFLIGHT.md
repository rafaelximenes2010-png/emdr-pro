# EMDR PRO no TestFlight (iPhone, iPad e Mac)

O GitHub já está preparado para compilar, assinar e enviar o app ao TestFlight a cada atualização.
Falta só ligar a conta da Apple. Tudo abaixo é feito uma única vez.

## 1. Conta de desenvolvedor da Apple
- Assine o **Apple Developer Program** (US$ 99/ano) pelo app *Apple Developer* no iPhone ou em developer.apple.com/programs/enroll.
- Recomendado: em nome do **consultório (CNPJ)**, com número D-U-N-S. Apps de saúde enviados por pessoa física podem ser recusados (diretriz 5.1.1).
- Anote o **Team ID** (developer.apple.com › Account › Membership details), com 10 letras e números.

## 2. Criar o app no App Store Connect
appstoreconnect.apple.com › Apps › **+ › Novo app**
- Plataforma: **iOS**
- Nome: **EMDR PRO** (se estiver em uso: *EMDR PRO · Karina Ximenes*)
- Idioma principal: **Português (Brasil)**
- ID do pacote (Bundle ID): **com.karinaximenes.emdrpro** (se não aparecer na lista, crie em developer.apple.com › Identifiers com esse mesmo ID)
- SKU: **emdrpro**

## 3. Chave de API
App Store Connect › **Usuários e acesso › Integrações › App Store Connect API › Chaves da equipe › +**
- Nome: *GitHub EMDR PRO* · Acesso: **Admin** (necessário para a assinatura automática)
- Anote o **Issuer ID** (no topo da página) e o **Key ID**.
- Baixe o arquivo **AuthKey_XXXX.p8** (só é possível baixar uma vez; guarde em local seguro).

## 4. Segredos no GitHub
github.com/rafaelximenes2010-png/emdr-pro › **Settings › Secrets and variables › Actions › New repository secret**

| Nome | Valor |
|---|---|
| `APPLE_TEAM_ID` | Team ID (passo 1) |
| `ASC_ISSUER_ID` | Issuer ID (passo 3) |
| `ASC_KEY_ID` | Key ID (passo 3) |
| `ASC_KEY_P8` | conteúdo inteiro do arquivo .p8, de `-----BEGIN PRIVATE KEY-----` até `-----END PRIVATE KEY-----` |

Os segredos ficam criptografados e não aparecem para ninguém, nem no repositório público.

## 5. Primeiro envio
- GitHub › **Actions › Enviar para o TestFlight › Run workflow** (ou qualquer atualização no `main`).
- Em 10 a 30 minutos a compilação aparece em App Store Connect › **TestFlight**.
- Na primeira vez, responda à pergunta de criptografia (já respondida no app: não usa criptografia própria).

## 6. Instalar no iPhone, iPad e Mac
- App Store Connect › TestFlight › **Teste interno › +** › adicione o e-mail do ID Apple da Dra. Karina (e o seu).
- Ela instala o app **TestFlight** da App Store, aceita o convite e toca em **Instalar**.
- **Mac com chip Apple (M1 ou mais novo):** o mesmo convite instala pelo TestFlight do Mac. Na ficha do app, deixe ativado *Disponibilidade em Macs com Apple silicon*.

## 7. Publicar na App Store (depois dos testes)
Política de privacidade (link público), capturas de tela, descrição, categoria (Medicina) e envio para revisão.
