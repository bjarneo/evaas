# Email Validator As A Service [EVaaS]

This is based on the RFC 5322 Official Standard. This service is made for fun based on this tweet using the perl RFC5322 email regex: https://twitter.com/mSykeCodes/status/1788446683921285238

## Usage

```bash
# Using CURL
curl -X POST -H "Content-Type: application/json" -d '{"email":"what@what.com"}' https://evaas.dothash.workers.dev
{"message":"RFC 5322 - Valid email address","status":1}

# Using HTTPie
http -b https://evaas.dothash.workers.dev email=what@wat.comm
{
    "message": "RFC 5322 - Valid email address",
    "status": 1
}
```

## Development

```
npm install
npm run dev
```

## Deployment to Cloudflare Workers

```
npm run deploy
```

## Run the test.http file

```
httpyac test/local.http
```
