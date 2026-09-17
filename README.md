# Demiana Proposal

A private photo montage that becomes a royal envelope and reveals a proposal letter.

## Run locally

```powershell
npm install
npm run dev
```

Copy the six source photos into `public/images/` using the names in `src/content.ts`. Add a licensed track at `public/audio/our-song.mp3` if music is desired. The experience remains usable when audio is missing.

## Email setup

The response endpoint is `api/send-response.ts` and expects these server-side variables:

```env
RESEND_API_KEY=
EMAIL_FROM=verified-sender@example.com
EMAIL_TO=y.r.kamel@outlook.com
```

Never put provider credentials in client code. Configure the same values in Vercel environment variables before deploying.
