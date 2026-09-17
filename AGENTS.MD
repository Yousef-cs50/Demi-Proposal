# Proposal Letter SPA - Project Brief

## 1. Project Summary

Build a single-page proposal experience for Demiana. The page should feel like opening a personal royal love letter, not like using a generic web form.

The experience has one core purpose:

1. Begin with a personal photo introduction featuring the couple's memories and gentle background music.
2. Transition into a beautiful sealed letter in a romantic, royal setting.
3. Let Demiana open the letter through a clear interaction.
4. Reveal a personal proposal message.
5. Let her choose between two response buttons.
6. Reveal a second personal letter based on her selected response.

The experience should be intimate, polished, easy to understand, and usable on a phone first.

## 2. Product Requirements

### Required user flow

1. The initial view shows a curated photo introduction using selected images from `IMG/`.
2. The introduction has a short, personal welcome and a clear `Begin` action.
3. Pressing `Begin` starts the background music when the browser permits it and moves through the photo introduction.
4. The photo introduction transitions into a centered sealed royal letter or envelope.
5. The letter view includes a short invitation such as "A letter for you" and one obvious open action.
6. Pressing the letter or its open control reveals the proposal with a smooth, graceful transition.
7. The revealed letter contains the final proposal copy, which should be easy to edit without changing the component structure.
8. Two response buttons are shown after or alongside the message.
9. Pressing `Yes, my love` opens a follow-up letter saying: "What are you waiting for? Call him."
10. Pressing `I need more time` opens a follow-up letter saying: "He will understand. Just communicate with him and tell him how you feel."
11. The follow-up letter should appear with a gentle fade-in and remain readable on mobile and desktop.

### Photo and music introduction

- Treat the introduction as a short memory montage, not an image gallery or carousel with many controls.
- Use all six images from `IMG/` in a curated one-by-one sequence.
- Keep each image visible long enough to appreciate, with gentle crossfades or a restrained film-strip movement.
- Keep the first screen understandable even before music begins.
- Start audio only after the user presses `Begin`, since browsers commonly block audible autoplay.
- Include a visible mute/unmute control and a pause/resume control, with accessible labels and state announcements.
- Keep music at a low default volume and never let it overpower the proposal content.
- Preserve the user's mute choice while moving from the montage to the letter.
- If audio cannot load, the photo introduction and the rest of the experience must still work normally.
- Do not use copyrighted music without permission. Prefer music supplied by the project owner or a properly licensed track.
- Place the audio file in a dedicated public asset location such as `public/audio/`; do not embed a large audio file directly in a component.
- The montage must have one clear `Begin` action. After it is pressed, the six images advance automatically and transition into the letter without extra `Continue` or `Skip` buttons.

### Response buttons

Use configurable labels and messages rather than hard-coding them deep inside the UI. The initial values can be:

- Positive response: `Yes, my love`
- Other response: `I need more time`

Each button must reveal a distinct follow-up letter. The labels and follow-up messages should remain easy to customize.

## 3. Visual Direction

### Mood

The page should feel like a treasured royal letter: warm, personal, elegant, slightly theatrical, and sincere. It should be romantic without becoming cluttered or childish.

### Composition

- Use the couple's photos as the first-viewport focal point, then make the royal letter the first focal point after the introduction.
- Make the photo introduction feel like a private memory opening: spacious, cinematic, and restrained.
- Keep the interaction centered and obvious on mobile and desktop.
- Let the next part of the revealed letter remain visible without requiring awkward scrolling.
- Use layered paper, wax seal, ribbon, or subtle ornament details only when they support the letter metaphor.
- Avoid dashboard layouts, generic cards, stock marketing sections, and unnecessary navigation.

### Color and typography

- Use a purple-led royal palette inspired by her favorite color: deep violet or plum for the surrounding atmosphere, warm ivory for the letter, lavender or dusty rose for soft accents, and muted gold for small ornamental details.
- Keep text/background contrast accessible; decorative gold and light lavender must not be used for essential body text.
- Pair an expressive display serif for the letter title with a highly readable serif or sans-serif for body copy.
- Use a locally hosted or approved web font with a reliable fallback.
- Avoid generic neon purple, excessive gradients, and an overly dark full-screen treatment; the purple should feel personal, royal, and warm.

### Motion

- Add a short page-load reveal for the photo introduction.
- Use gentle photo crossfades or a restrained montage transition before the letter appears.
- Animate the letter opening with a deliberate paper/flap movement.
- Reveal the proposal copy with a subtle stagger after the letter opens.
- Animate audio controls only enough to communicate their state; never make controls hard to find.
- Respect `prefers-reduced-motion` by replacing motion with simple state changes.
- Never make animation the only way to understand the current stage or that the letter is open.

### Existing assets

The `IMG/` folder contains six JPEG images. Inspect them before implementation and choose only the images that support the personal story and remain visually clear. Do not force every image into the page. Optimize large images and provide meaningful alt text when an image conveys information. Add the selected music as a separate licensed asset under `public/audio/` and document its source.

## 4. Content Guidelines

- Keep the proposal message sincere, specific, and written for Demiana.
- Store editable copy in one obvious configuration/content area.
- Store the selected photo order, image captions, music source, and music filename in one obvious configuration/content area.
- Do not invent personal memories, promises, or relationship details that were not provided.
- Use the recipient's name consistently once the final copy is supplied.
- Keep the initial screen concise; the emotional message belongs inside the opened letter.
- Button text should be affectionate and unambiguous.
- Confirmation and error states should sound human, not like raw technical alerts.

Suggested content placeholders:

```ts
const proposalContent = {
	intro: "A letter for you",
	title: "My dearest Demiana",
	body: "[Final personal proposal message goes here.]",
	positiveLabel: "Yes, my love",
	laterLabel: "I need a little time",
};
```

## 5. Technical Stack and Architecture

### Frontend

- React with TypeScript.
- Vite for local development and production builds.
- Plain CSS or CSS modules for the visual system; keep styles close to the components and avoid adding a heavy UI kit.
- Use semantic HTML and native buttons for all interactions.
- Keep the page responsive from small mobile screens through desktop widths.
- Use the browser audio API through a small dedicated audio controller or hook; do not scatter playback logic across visual components.
- Keep the photo montage, audio controls, royal letter, and response actions as separate responsibilities.

### Email delivery

- Use a small server-side/serverless endpoint for email delivery.
- Use a transactional email provider such as Resend, with the provider API key stored only in server-side environment variables.
- The browser must never contain the email provider API key, SMTP password, or other secret.
- The endpoint should accept only the allowed response values, construct the email server-side, and send it to `y.r.kamel@outlook.com`.
- Configure the sender from a verified domain or provider-approved address.
- Add basic rate limiting or an equivalent abuse guard before deployment.
- Do not include unnecessary personal data in logs.

### Suggested project shape

```text
src/
	components/
		MemoryIntro.tsx
		MusicControls.tsx
		RoyalLetter.tsx
		ResponseButtons.tsx
	content/
		proposalContent.ts
		memoryContent.ts
	styles/
		globals.css
	App.tsx
	main.tsx
api/
	send-response.ts
public/
	images/
	audio/
```

The exact folder names may change to fit the chosen deployment platform, but responsibilities should remain separated:

- Presentation components control the memory introduction, letter, and response states.
- Content configuration controls editable proposal copy.
- The audio controller controls playback, mute state, volume, and fallback behavior.
- The API endpoint controls validation and email delivery.
- Styling controls the visual system and responsive behavior.

## 6. Interaction and State Rules

The page should have these clear states:

- `intro`: the photo introduction is visible and audio has not been started.
- `intro-playing`: the montage is visible and music is playing or attempting to play.
- `intro-muted`: the montage continues while music is muted.
- `sealed`: the letter is closed and the open action is available.
- `opening`: the letter animation is running and controls are temporarily disabled.
- `open`: the message and response buttons are available.
- `sending`: the selected response is being submitted and both buttons are disabled.
- `sent`: a confirmation is visible and duplicate submissions are disabled.
- `error`: a concise retry state is visible.

Additional rules:

- Use buttons, not clickable `div` elements.
- Make keyboard focus visible.
- Support Enter and Space activation through native button behavior.
- Require a user gesture before starting audible playback.
- Keep the music control available after the letter appears.
- Do not prevent the user from reaching the letter if the audio file fails or is blocked.
- Do not navigate away from the page after a response.
- Do not silently fail if JavaScript or the email request is unavailable.
- If a response has already been submitted in the current session, show the confirmation state instead of sending it again.

## 7. Email Contract

### Request

`POST /api/send-response`

```json
{
	"response": "yes",
	"proposalId": "demiana-proposal"
}
```

Allowed `response` values must be an explicit allowlist, for example `yes` and `later`. Reject unknown values with a `400` response.

### Success

Return a small JSON response such as:

```json
{
	"ok": true
}
```

### Failure

Return a generic user-safe error. Never expose provider credentials, stack traces, or internal provider details to the browser.

## 8. Accessibility Requirements

- Use a logical heading hierarchy.
- Give the letter, meaningful introduction images, and audio controls useful accessible names.
- Ensure all text and controls meet WCAG AA contrast targets.
- Provide visible `:focus-visible` styles.
- Make touch targets at least approximately 44px by 44px.
- Do not rely on color, animation, or imagery alone to communicate state.
- Support reduced motion.
- Announce important audio state changes such as muted, paused, or unavailable without creating repetitive screen-reader noise.
- Test at 200% browser zoom and on narrow mobile widths.

## 9. Responsive and Quality Requirements

- Design mobile-first, then enhance for larger screens.
- Prevent horizontal scrolling at every supported viewport.
- Make the photo introduction and its controls usable on narrow screens without cropping faces or important visual details.
- Keep the letter readable without excessive zooming or tiny text.
- Ensure long proposal text wraps without overlapping controls.
- Compress and size images appropriately.
- Preload only the first necessary image; lazy-load later montage images where appropriate.
- Avoid blocking the letter experience on audio buffering.
- Include loading, success, and failure states for email submission.
- Keep response submission idempotent for the current session where practical.

## 10. Security and Privacy

- Keep all email credentials on the server.
- Validate and sanitize request values on the server even if the UI already restricts them.
- Do not collect, upload, or expose the couple's images through the email endpoint.
- Do not allow arbitrary recipient addresses or arbitrary email bodies from the client.
- Avoid logging the full personal proposal or response unnecessarily.
- Use HTTPS in production.
- Add provider/domain configuration documentation without committing secrets.
- Provide a `.env.example` containing variable names only.

## 11. Testing Requirements

Before considering the project complete, verify:

- The photo introduction appears before the royal letter.
- The selected images render in the intended order without stretching faces or causing layout shifts.
- Pressing `Begin` starts music when permitted and still advances when audio is blocked.
- Mute, unmute, pause, and resume controls work with mouse, touch, and keyboard.
- The letter remains reachable if the music asset is missing or fails to load.
- The sealed letter opens on mouse, touch, keyboard Enter, and keyboard Space.
- The proposal remains readable on mobile and desktop.
- Each response button sends the correct allowed response value.
- The send button state prevents duplicate clicks while sending.
- A successful request shows the confirmation state.
- A failed request shows retry feedback and does not lose the opened letter.
- Unknown response values are rejected by the API.
- Secrets are absent from the client bundle and repository.
- Reduced-motion mode still exposes all content and actions.
- The production build completes successfully.

## 12. Definition of Done / Success Criteria

The project is successful when:

1. The experience opens with selected photos of the couple before the letter appears.
2. Demiana can start, mute, pause, or skip the photo-and-music introduction without confusion.
3. The experience remains fully usable when browser autoplay is blocked or the audio file fails.
4. Demiana immediately understands that the sealed letter can be opened after the introduction.
5. The opening interaction feels smooth and intentional on phone and desktop.
6. The proposal message is fully visible, readable, and emotionally prioritized after opening.
7. Both response buttons are obvious, distinct, and usable with keyboard or touch.
8. Clicking either button results in one correctly formatted email sent to `y.r.kamel@outlook.com`.
9. The page clearly communicates loading, success, and failure without exposing technical details.
10. The API cannot be used by the browser to redirect mail or reveal credentials.
11. The page passes the accessibility and responsive checks above.
12. The final production build runs without console errors or broken asset references.
13. The experience feels personal and finished rather than like a demo form.

## 13. Implementation Boundaries

- Do not add authentication, a database, a CMS, a dashboard, or multi-page navigation unless a later requirement needs it.
- Do not add analytics unless explicitly approved; this is a private personal experience.
- Do not expose a third response path unless the content and email behavior are defined first.
- Do not replace the letter metaphor with a generic modal or contact form.
- Keep all changes focused on the proposal experience and its secure email delivery.