# Failure modes

| Problem | Countermeasure | Residual risk |
|---|---|---|
| Passive Infiltrator | Integrity budget and deterministic neglected-air fault | Efficient crews may win quickly |
| Excessive kills | Initial and recurring 65–90s cooldown | Six-player balance unmeasured |
| Permanent grouping | Distributed consoles and commissioning | Grouping may remain optimal; test it |
| Complete separation | Local signals, inspection and meetings | Players may miss evidence |
| Task busywork | Six-second shared interaction | Repetition may become monotonous |
| Sabotage spam | Shared cooldown and no hostile stacking | Natural air fault can overlap Blackout |
| Unavoidable random death | No random lethality; visible exposure and exits | New users may miss hazard labels |
| Meeting spam | One emergency per worker, 35s cooldown | Reports can still extend wall-clock duration |
| Disconnection | Two-minute recovery; void after grace | Griefing disconnects can void losses |
| Dead-player information | Stationary local view; no text/votes | External voice leaks remain social |
| Cheating with modified client | Server validation and filtered snapshots | External collusion cannot be solved |
| Server restart | Clear ephemeral-state model | Active matches are lost |
| Render proxy behavior | Same-origin SSE and small snapshots | Live buffering/latency untested |

Single-thread arrival order resolves attack/report races. Meetings freeze sabotage and evacuation. Natural fatalities process before lift closure. Role-confirmed ejection ends the match after the resolution screen. A reconnect during evacuation resumes the original worker and physical position. No automatic teleport to safety occurs.
