type Choice = 'yes' | 'time'
type Body = { response?: unknown; proposalId?: unknown }

export default async function handler(request: { method?: string; body?: string | Body }, response: { status: (code: number) => { json: (body: unknown) => void } }) {
  if (request.method !== 'POST') return response.status(405).json({ ok: false, error: 'Method not allowed' })
  let body: Body
  try { body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body ?? {} } catch { return response.status(400).json({ ok: false, error: 'Invalid request' }) }
  if (body.proposalId !== 'demiana-proposal' || !['yes', 'time'].includes(body.response as string)) return response.status(400).json({ ok: false, error: 'Invalid request' })

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO ?? 'y.r.kamel@outlook.com'
  if (!apiKey || !from) return response.status(500).json({ ok: false, error: 'Email service unavailable' })

  const choice = body.response as Choice
  const selected = choice === 'yes' ? 'Yes, my love' : 'I need more time'
  const email = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: `Demiana proposal response: ${selected}`, text: `Proposal: demiana-proposal\nResponse: ${selected}\nTimestamp: ${new Date().toISOString()}` }),
  })
  if (!email.ok) return response.status(502).json({ ok: false, error: 'Email service unavailable' })
  return response.status(200).json({ ok: true })
}
