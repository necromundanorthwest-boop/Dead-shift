# DEAD SHIFT — standalone Render alpha 0.1.0

A 4–6 player private-room social-deduction game from Necromunda Northwest. One Infiltrator uses a failing industrial station as cover. Survivors restore four systems and physically reach the evacuation lift. Includes a solo training shift, original procedural pixel art, keyboard/touch controls, meetings and text chat, reconnect tokens, and server-filtered local visibility.

## Run locally

Requires Node 22 or newer. No runtime dependencies, build tooling, database, or accounts.

```sh
npm ci
npm test
npm start
```

Open http://localhost:3000. Select Training Shift to explore alone. Multiplayer requires 4–6 browser sessions: create a room, share its six-character code, mark everyone ready, then start as host. Separate browser profiles are preferable when testing hidden roles. Session tokens are scoped to the browser tab and survive reloads.

## Render deployment

Deploy as **one Node Web Service**, not a Static Site. Same-origin frontend and authoritative Node backend live in this repository.

| Setting | Value |
|---|---|
| Build command | `npm ci` |
| Start command | `npm start` |
| Runtime | Node 22+ |
| Health check | `/healthz` |
| Bind | `0.0.0.0:$PORT` |
| Instances | Exactly one |
| Database / persistent disk | None |
| Secrets | None |

`render.yaml` supplies these settings. Alternatively use the included Dockerfile. The Node route is the simplest because there are no native dependencies.

1. Create a GitHub repository for DEAD SHIFT.
2. Upload **the contents of this folder at repository root**, including `package.json`, `package-lock.json`, `render.yaml`, `server/`, and `public/`.
3. Connect that repository to Render and create a Web Service using the settings above, or import its Blueprint.
4. After it is live, verify `/healthz`, create a training shift, and test a full four-browser multiplayer match over HTTPS.

Source repository: https://github.com/necromundanorthwest-boop/Dead-shift. Render deployment uses the main branch.

## Operations

Room state is intentionally ephemeral. A restart or redeploy ends active shifts; reconnect tokens cannot restore state after server restart. Do not scale horizontally without replacing room storage and routing. A brief disconnect retains the slot for two minutes. Longer absence voids the match rather than granting a competitive victory. Hosts transfer to a connected player.

The HTTP service sends recipient-specific SSE snapshots at 10 Hz and accepts sequenced actions by POST. Bearer tokens are request headers, never URL query parameters. Commands are queued on the client; the server ignores replayed sequence numbers. The server enforces movement, collision, line of sight, task timing/proximity, cooldowns, roles, ballots, and victory. No hidden remote player positions or foreign roles are sent during active play.

## Verification and scope

Run `npm run check` and `npm test`. Automated tests exercise rules, information boundaries, and four actual HTTP/SSE clients. Browser rendering, real-device touch behavior, human social balance, and live Render transport still require playtesting. This is an alpha, not a contest-ready certification.

Seven console themes use one shared four-contact sequence mechanic; they are not seven independently designed minigames. Decorative machinery is nonblocking; room walls constrain movement. No sound is required: local event captions provide the information. Eliminated workers observe only their final local area and have no in-game communication.

The pixel presentation uses Underhive Duel's dark iron, bone, amber and cyan palette, with original worker silhouettes and station art. No third-party illustrations or rules pages are bundled. The attached Wheels of Fury racing supplement is outside this social-deduction game's rules scope.

See `docs/` for the 13 design documents, decisions, rules, acceptance criteria, and verification report.
