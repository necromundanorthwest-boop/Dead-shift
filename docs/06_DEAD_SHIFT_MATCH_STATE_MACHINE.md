# Match state machine

```mermaid
stateDiagram-v2
 [*] --> Lobby
 Lobby --> Reveal: host / 4–6 ready
 Reveal --> Play: 8 seconds
 Play --> Discussion: alarm or report
 Discussion --> Voting: 45 seconds
 Voting --> Resolution: all ballots or 20 seconds
 Resolution --> Play: 8 seconds / prior phase
 Play --> Evacuation: four systems online
 Evacuation --> Discussion: incident report
 Resolution --> Evacuation: prior phase was evacuation
 Play --> Over: hostile eliminated / quorum lost / clock
 Evacuation --> Over: lift closes / elimination / clock
 Over --> Lobby: host rematch
```

Permanent disconnect can terminate any started phase as SHIFT VOID. Training transitions directly from Lobby to Play. World clocks pause in briefing and meetings; reconnect grace uses wall-clock time. The single event loop serializes commands. Results are immutable until the host opens a new lobby. Rematch clears hazards, bodies, progress, work orders, alarms, timers and the one-time natural fault.
