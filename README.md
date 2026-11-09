# NectarNotes 🐝🎵

NectarNotes é uma plataforma de música temática inspirada em colmeias e abelhas, permitindo explorar músicas, criar playlists, curtir faixas ("Adicionar à Colmeia"), personalizar um Pet virtual e gerenciar o perfil do usuário com persistência em **Banco de Dados SQLite**.

## Funcionalidades

- **Autenticação (Login e Cadastro)**: Registro e autenticação de usuários salvos no banco SQLite (`users`).
- **Exploração de Músicas**: Catálogo dividido em *Em Alta*, *Recomendados* e *Ouvidas Recentemente* (`songs`).
- **Player e Curtidas ("Colmeia")**: Reprodução de áudio e marcação de músicas favoritas persistidas em `liked_songs`.
- **Playlists Salvas**: Visualização e criação de novas playlists (`playlists` e `playlist_songs`).
- **Pets e Acessórios**: Personalização do Pet virtual com camisas e acessórios de rosto, sistema de XP e níveis (`pets` e `pet_items`).
- **Perfil e Configurações**: Edição de nome, email, biografia, país, foto de perfil e exclusão de conta.

## Banco de Dados

- **Esquema SQL**: [`database/schema.sql`](database/schema.sql)
- **Inicialização e Seed**: [`database/db.js`](database/db.js)
- **Arquivo SQLite gerado**: `database/nectarnotes.db`

## Como Executar

1. Inicialize o banco de dados (opcional, o servidor já inicializa automaticamente):
   ```bash
   npm run init-db
   ```

2. Inicie o servidor Node.js:
   ```bash
   npm start
   ```

3. Acesse no navegador:
   ```
   http://localhost:3000
   ```
   *(Usuário de demonstração padrão: `AbelhaRainha` / Senha: `123456`)*
