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

app.get('/', (c) => {
    return c.text(`${RFC5322}- ${emailRegex.source}`);
});

app.post(
    '/',
    validator('json', async (_, c) => {
        const email = (await c.req.json()).email;
        if (!validateEmail(email)) {
            return c.json(
                { message: `${RFC5322} - Invalid email address`, status: EmailStatus.INVALID },
                { status: 400 }
            );
        }
    }),
    (c) => {
        return c.json(
            { message: `${RFC5322} - Valid email address`, status: EmailStatus.VALID },
            { status: 200 }
        );
    }
);

export default app;
