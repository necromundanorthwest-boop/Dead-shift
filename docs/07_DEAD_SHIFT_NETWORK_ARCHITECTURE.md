# Standalone architecture

One Node process serves static HTML/CSS/modules and the authoritative in-memory room engine. No npm runtime dependencies. No database or disk. Render supplies HTTPS and PORT; the server binds 0.0.0.0. Maintain one instance.

The transport is HTTP POST for commands and fetch-based Server-Sent Events for snapshots at 10 Hz. This fulfills the realtime requirement without an external WebSocket dependency. A 100-ms simulation tick limits movement; each update is capped at 250 ms after a server stall rather than applying an abrupt large jump. Input expires after 500 ms. There is no client prediction in this alpha.

POST /api/create and /api/join establish a room and 192-bit random bearer token. GET /api/stream?room=CODE uses the token in the Authorization header. POST /api/action uses the same token and a monotonically increasing sequence; duplicate sequences do nothing. POST /api/ping every five seconds maintains liveness. Client commands are serialized to prevent action/movement reordering. GET /healthz returns the build version.

Only one stream per token is retained. Streams with excessive pending output close rather than consume unbounded memory. JSON request bodies are capped at 4096 bytes; room count is capped at 100. Connection IP buckets limit requests and room creation, but are a casual-abuse bound, not a production DDoS control. Render's proxy can aggregate remote addresses; this must be load-tested before broader public use.

Players are considered offline after 15 seconds without heartbeat, or immediately after stream closure. Slots and roles persist for two minutes, after which a started shift is void. Empty rooms are deleted; completed rooms expire after ten minutes and all rooms after one hour. A disconnected host transfers to a connected worker. Server restart loses rooms and tokens.

Origin checks, a restrictive Content Security Policy, header-only tokens, DOM text insertion, and explicit static-file allowlisting limit common browser threats. Client knowledge never authorizes actions. Security is appropriate for a small community alpha and has not undergone an independent audit.
