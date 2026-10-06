# Verification report — 2026-10-06

Build: DEAD SHIFT 0.1.0. Runtime tested: Node 24.19.0; declared support Node 22+ using only built-in Node APIs.

- `npm run check`: PASS (engine, HTTP service, browser module syntax).
- `npm test`: PASS, 22 tests, zero failures.
- HTTP integration: four independently authenticated clients create/join a room, stream personalized snapshots, ready, start, receive exactly one hostile role, and reconnect preserving identity.
- Health endpoint, homepage response, security headers, cross-origin rejection, invalid token rejection and late-join rejection: PASS.
- Game rules and privacy tests: PASS; see test names and acceptance document.
- Browser-rendered layout, real touch input, human multiplayer balance: NOT RUN.
- Live Render deployment and HTTPS streaming: NOT RUN; source repository unavailable.
- Render CLI Blueprint validation: NOT RUN; CLI not installed. Configuration supplied for review and import.

No deployment URL or successful browser inspection is implied by this report. Use the manual gates in document 12 before describing this as production-ready.
