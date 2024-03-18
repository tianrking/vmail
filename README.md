## VMAIL.DEV

[中文文档](/README_zh.md)

Temporary email service build with email worker.

- Receiving emails (email worker)
- Display email (remix)
- Mail Storage (sqlite)

> Worker receives email -> saves to database -> client queries email

### Screenshot

demo: https://vmail.dev

![](https://vmail.dev/preview.png)

## Self-hosted 

### Requirements

- [Cloudflare](https://dash.cloudflare.com/) account (Email service)
- Domain name hosted on Cloudflare
- [turso](https://turso.tech) sqlite (a free plan available for personal use)

### Steps

1.**Register a [turso](https://turso.tech) account, create a database, and create an emails table**

After registration, you will be prompted to create a database. I named it `vmail` here,

![](https://img.inke.app/file/3773b481c78c9087140b1.png)

Then, Create a table named `emails`. Select your database, you will see the "Edit Tables" button, click and enter.

![](https://img.inke.app/file/d49086f9b450edd5a2cef.png)

> ⚠️ Note: **There is a plus button in the upper left corner, and I tried to click it without any prompts or effects, so I used the cli provided by turso to initialize the table.**

Cli documents: https://docs.turso.tech/cli/introduction

For Linux (or mac/windows):

```bash
# Install (Remember to restart the terminal after installation)
curl -sSfL https://get.tur.so/install.sh | bash

# Authenticate
turso auth login

# Connect to your Turso database
turso db shell <database-name>

# Copy sql script to run on the terminal (packages/database/drizzle/0000_sturdy_arclight.sql)
CREATE TABLE `emails` (
 `id` text PRIMARY KEY NOT NULL,
 `message_from` text NOT NULL,
 `message_to` text NOT NULL,
 `headers` text NOT NULL,
 `from` text NOT NULL,
 `sender` text,
 `reply_to` text,
 `delivered_to` text,
 `return_path` text,
 `to` text,
 `cc` text,
 `bcc` text,
 `subject` text,
 `message_id` text NOT NULL,
 `in_reply_to` text,
 `references` text,
 `date` text,
 `html` text,
 `text` text,
 `created_at` integer NOT NULL,
 `updated_at` integer NOT NULL
);
```

2.**Deploy email workers**

```bash
git clone https://github.com/yesmore/vmail

cd vmail

# Install dependencies
pnpm install
```

Fill in the necessary environment variables in `vmail/apps/email-worker/wrangler.toml` file.

- TURSO_DB_AUTH_TOKEN (turso table info from step 1，click `Generate Token`)
- TURSO_DB_URL (e.g. libsql://db-name.turso.io)

> If you don't do this step, you can add environment variables in the worker settings of Cloudflare

Then run cmds:

```bash
cd apps/email-worker
pnpm run deploy
```

3.**Configure email routing rules**

Set `Catch-all` action to Send to Worker

![](https://img.inke.app/file/fa39163411cd35fad0a7f.png)

4.**Deploy Remix app on Vercel or fly.io**

Ensure that the following environment variables (`.env.example`) are prepared and filled in during deployment:

- COOKIES_SECRET (The encryption secret of the cookie, a random string is sufficient)
- TURNSTILE_KEY (Obtained from Cloudflare for website verification)
- TURNSTILE_SECRET
- TURSO_DB_RO_AUTH_TOKEN (Obtain database credentials from turso )
- TURSO_DB_URL

After successful deployment, add DNS records to the corresponding platform in Cloudflare, and you can have fun playing.

Done!

## License

GNU General Public License v3.0

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yesmore/vmail&type=Date)](https://star-history.com/#yesmore/vmail&Date)

Inspired by smail.pw & email.ml