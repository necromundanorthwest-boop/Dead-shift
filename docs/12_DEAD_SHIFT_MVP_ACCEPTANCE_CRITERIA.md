# MVP acceptance criteria

Automated gates: exact role count for 4/5/6; readiness/host checks; private tokens and room isolation; no remote actor/role/body-cause leakage; collision and normalized movement; stale-input expiry; duplicate-action handling; task location/sequence/time validation; commissioning; fake-work opacity; attack range/role/cooldown; sabotage exclusivity and counter-repair; exposure/recovery/death; meeting timer freeze; strict-majority voting; allegiance-confirmed ejection; dead-worker restrictions; physical extraction; timeout losses; reconnect/void; solo training loop; live four-client HTTP/SSE exchange and origin rejection.

Manual release gates still outstanding:

1. Render the UI at 320, 390, 768 and 1280 px and inspect clipping, contrast and canvas labels.
2. Use keyboard and real touch input through an entire training shift.
3. Run four simultaneous browser sessions across at least two machines on the public Render endpoint.
4. Run a full hostile match with sabotage, inspection, a meeting, ejection or evacuation, disconnect and reconnect.
5. Inspect network traffic for hidden-state leaks during blackout and death.
6. Measure group play duration and role balance for 4/5/6 workers.
7. Verify live health, recent logs, HTTPS SSE continuity and cold-start behavior.

The supported browser-preview tool was unavailable in this environment. No browser screenshots or successful manual passes are claimed. Automated success is a source-level alpha gate, not production certification.
