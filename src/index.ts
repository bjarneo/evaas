import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { validator } from 'hono/validator';

import { validateEmail, emailRegex } from './email-validator';

const app = new Hono();

const RFC5322 = 'RFC 5322';

enum EmailStatus {
    VALID = 1,
    INVALID = 2,
}

app.use('/*', cors());
app.use(logger());

app.get('/', (ctx) => {
    return ctx.html(`
      <html>
        <body>
          <h1>${RFC5322}</h1>
          <h2>Regex</h2>
          <p>${emailRegex.source}</p>
          <h3>Usage</h3>
          <pre> 
            # Using CURL
            curl -X POST -H "Content-Type: application/json" -d '{"email":"what@what.com"}' https://evaas.dothash.workers.dev
            {"message":"RFC 5322 - Valid email address","status":1}

            # Using HTTPie
            http -b https://evaas.dothash.workers.dev email=what@wat.com
            {
              "message": "RFC 5322 - Valid email address",
              "status": 1
            }
          </pre>
        </body>
      </html>
    `);
}).post(
    validator('json', async (_, ctx) => {
        const email = (await ctx.req.json()).email;
        if (!validateEmail(email)) {
            return ctx.json(
                { message: `${RFC5322} - Invalid email address`, status: EmailStatus.INVALID },
                { status: 400 }
            );
        }
    }),
    (ctx) => {
        return ctx.json(
            { message: `${RFC5322} - Valid email address`, status: EmailStatus.VALID },
            { status: 200 }
        );
    }
);

export default app;
