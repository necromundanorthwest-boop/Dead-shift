# Authoritative implementation decisions

The user's direct request to execute as a standalone Render site supersedes the attached design-only stop gate. The design documents describe the implemented alpha, including explicit reductions.

| Decision | Rationale | Alternative rejected | Consequence |
|---|---|---|---|
| One Node authority | Small private ephemeral rooms | Split frontend and authority | One Render instance; no database |
| SSE + POST | Built-in Node capabilities; easy recipient filtering | External WebSocket dependency | 10Hz snapshots and queued commands |
| One hostile for 4–6 | Learnable role structure | Specialist catalogue | Two roles only |
| Immediate death | Keep social loop understandable | Downed/revive/finish hierarchy | Bodies, no rescue workflow |
| Symptoms without attribution | Preserve cause-versus-culprit uncertainty | Exact killer/timestamp forensics | Inspection is suggestive evidence |
| Radius plus wall visibility | Protect local observation | Omniscient map | Server filters actors and bodies |
| Public confirmed ejection | Accessible first-match feedback | Hidden ejected allegiance | Correct ejection wins |
| Strict majority | Avoid low-vote accidental ejection | Plurality | Missing ballots count as abstentions |
| Two-Survivor extraction | Clear physical goal | Hostile boarding veto | Hostile at lift does not nullify quorum |
| Fixed integrity clock | Legible time pressure | Multiple deterioration subsystems | 720 active seconds |
| Deterministic faults | Avoid arbitrary blame-generating deaths | Random lethal rolls | Neglect/sabotage causes exposure |
| Shared task mechanic | Deliver stable alpha interaction | Seven different minigame engines | Seven themed templates, one mechanic |
| Stationary dead observer | Limit information advantage | Roaming ghosts | Limited eliminated-player experience |
| Training mode | Inspect alone without fake humans | Bots presented as social opponents | No hostile; single escapee |
| Original procedural pixel art | Match Underhive Duel palette; self-contained | Copied assets / mass raster library | Canvas environment and worker patterns |

Locked for this build: rules in document 02, information model, topology and server authority. Risks requiring playtesting: duration, grouping strategy, repair repetition, cooldown balance, latency, mobile readability and eliminated waiting time. No unresolved stakeholder choice blocks local use. Actual hosting is blocked by the missing source repository, not by an unresolved game rule. Recommended next step is publish this alpha from a new DEAD SHIFT repository and run the manual acceptance gates with four humans.
