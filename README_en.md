![cover](https://img.inke.app/file/beb0212f96c6cd37eaeb8.jpg)

# VMAIL.DEV

English | [中文文档](/README.md)

Temporary email service build with email worker.

## Features and Principles

- Privacy-friendly, no registration required, out-of-the-box
- Better UI design, more concise
- 100% open source, quick deployment, no server required

Principles： 

- Receiving emails (email worker)
- Display email (remix)
- Mail Storage (sqlite)

> Worker receives email -> saves to database -> client queries email

### Screenshot demo

Here: https://vmail.dev

![](https://vmail.dev/preview.png)

## Self-hosted Tutorial

### Requirements

- [Cloudflare](https://dash.cloudflare.com/) account (Email service)
- Domain name hosted on Cloudflare
- [turso](https://turso.tech) sqlite (a free plan available for personal use)
- [Vercel](https://vercel.com) or [fly.io](https://fly.io) to deploy Remix app

### Steps

**1.Register a [turso](https://turso.tech) account, create a database, and create an emails table**

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

**2.Deploy email workers**

```bash
git clone https://github.com/yesmore/vmail

cd vmail

# Install dependencies
pnpm install
```

Fill in the necessary environment variables in `vmail/apps/email-worker/wrangler.toml` file.

- TURSO_DB_AUTH_TOKEN (turso table info from step 1，click `Generate Token`)
- TURSO_DB_URL (e.g. libsql://db-name.turso.io)
- EMAIL_DOMAIN (e.g. vmail.dev)

> If you don't do this step, you can add environment variables in the worker settings of Cloudflare

Then run cmds:

```bash
cd apps/email-worker

# Node environment required, and your need to install wrangler cli and login first, see https://developers.cloudflare.com/workers/wrangler/install-and-update
pnpm run deploy
```

**3.Configure email routing rules**

Set `Catch-all` action to Send to Worker

![](https://img.inke.app/file/fa39163411cd35fad0a7f.png)

**4.Deploy Remix app on Vercel or fly.io**

Ensure that the following environment variables (`.env.example`) are prepared and filled in during deployment:

| Variable               | Description                                                        | example                                |
| ---------------------- | ------------------------------------------------------------------ | -------------------------------------- |
| COOKIES_SECRET         | The encryption secret of the cookie, a random string is sufficient | `s3cr3t`                               |
| TURNSTILE_KEY          | Obtained from Cloudflare for website verification                  | `1234567890`                           |
| TURNSTILE_SECRET       | Obtained from Cloudflare for website verification                  | `s3cr3t`                               |
| TURSO_DB_RO_AUTH_TOKEN | Obtain database credentials from turso                             | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` |
| TURSO_DB_URL           | Obtain database credentials from turso                             | `libsql://db-name.turso.io`            |
| EMAIL_DOMAIN           | email domain                                                       | `vmail.dev`                            |
| EXPIRY_TIME            | optional, default `86400`                                          | `86400`                                |

**For Vercel:**

Then push the code to your Github repository and create a new project in Vercel. Choose `New project`, then import the corresponding Github repository, fill in the environment variables, select the `Remix` framework, and click `Deploy`. Wait for the deployment to complete.

Vercel Project Settings (General):

![](https://img.inke.app/file/573f842ccbefdf8daf319.png)
![](https://img.inke.app/file/36c1566d8c27735bb097d.png)

**For fly.io:** 

```bash
cd vmail/apps/remix 
fly launch
```

**5.Add DNS records (A record) to the corresponding platform in Cloudflare**

e.g. vercel：

![](https://img.inke.app/file/245b71636cd16afcf93c7.png)

![](https://img.inke.app/file/e10af19334fd6a13b7d2e.png)

Done!

## Local development

copy `apps/remix/.env.example` to `apps/remix/.env` and fill in the necessary environment variables.

```bash
cd path-to/vmail/ # root directory
pnpm install

# run on localhost:3000
pnpm run remix:dev
```

## Community Group

- 扫码或加微信 `yesmore_cc` 拉讨论群 (备注 vmail)
- Discord: https://discord.gg/d68kWCBDEs

<table>
  <tr>
    <td>
      <img src="https://img.inke.app/file/4bc1cb6681c3e5ff75150.jpg"/>
    </td>
    <td>
      <img src="https://img.inke.app/file/711501f1ee488b3423aff.jpg"/>
    </td>
  </tr>
</table>

## License

GNU General Public License v3.0

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yesmore/vmail&type=Date)](https://star-history.com/#yesmore/vmail&Date)

Inspired by smail.pw & email.ml