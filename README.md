# IEBA — Site institucional

Site institucional da Igreja Evangélica de Bairro D'Ajuda (IEBA), Bissau — Guiné-Bissau.

## Estrutura

```
index.html              Entrada do site
institucional/          Sobre a igreja
ministerios/            Páginas dos ministérios
eventos/                Eventos, atividades e liturgia
planeamento/            Plano geral, departamentos e direção
campos/                 Igrejas filiais e campos missionários
comunicacao/            Notícias, pedidos de oração e contactos
projetos/               Projetos sociais
midia/                  Galeria multimédia
financeiro/             Doações
admin/                  Painel administrativo (área privada)
css/ js/ assets/        Estilos, scripts e ficheiros
firebase/               Configuração, regras e índices
tools/                  Gerador e testes
assets/pdfs/            PDFs gerados
```

## Executar localmente

Abra `index.html` no navegador, ou sirva a pasta:

```powershell
python -m http.server 8080
# http://localhost:8080/
```

## Regenerar o site

O conteúdo vive em `tools/content.js` e o layout em `tools/generate.js`.

```powershell
node tools/generate.js
node tools/build-pdfs.js
node tools/test-site.js
```

## Publicar no GitHub Pages

1. No repositório `biosbio/ieba`: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Faça push para `main`. O workflow `.github/workflows/deploy-pages.yml` publica automaticamente.
3. O ficheiro `.nojekyll` impede o Jekyll de ignorar pastas especiais.

## Firebase (plano Spark)

- Projeto: `ieba-bissau`
- Autenticação por email/password: ativada
- Firestore: base `(default)` na região `eur3`
- Regras e índices: `firebase/firestore.rules` e `firebase/firestore.indexes.json` (deploy com `firebase deploy --only firestore`)
- Configuração web pública: `firebase/config.js` (valores públicos, não segredos)

### Administrador

Acesso em `admin/login.html` com a conta Firebase autorizada. O papel de administrador vem do documento `users/{uid}` no Firestore (`role: "admin"`). As credenciais são fornecidas pela administração da igreja e não devem ser publicadas neste repositório.

## Segurança

- As regras do Firestore negam acesso por omissão.
- Administradores gerem tudo; responsáveis só veem as páginas autorizadas.
- Pedidos de oração e mensagens são privados.
- O painel administrativo não é indexado (`noindex, nofollow`).

> Nota: o Firebase Spark tem quotas gratuitas. Para produção, configurar App Check, domínios autorizados e backups do Firestore.
