# Rules 0.1.0

The server owns all rules. Each match has 4–6 players and exactly one uniformly selected Infiltrator. All must be connected and ready; only the host starts. Roles remain private for an eight-second briefing.

Movement is continuous at 105 units/second with normalized diagonals. Walls block movement and sight. Normal vision is 205 units; Blackout reduces it to 92. Interactions require 42 units; attacks require 30 and line of sight. Inputs expire after 500 ms without renewal.

Power, Relay, Ventilation and Lift each require N successful cycles for N players. Each cycle has four ordered contacts, at least 0.65 seconds between contacts and six seconds total. An incorrect contact resets the sequence without damage. One real worker can occupy a console at a time. A successful critical cycle imposes 28 seconds of commissioning before the next cycle. Work cancels on meeting or after 40 seconds. Infiltrators can perform real work or fake a six-second interaction. Observation shows only WORKING.

Each worker receives two system work orders. Completing each once adds 12 seconds to integrity, capped at 720. Filter Stock adds 25 seconds once, Purge Pumps clears Air Failure once, and Signal Repeater broadcasts a completion announcement once. Support consoles require one cycle and are optional.

Integrity starts at 720 active seconds. World, hazard, cooldown and evacuation clocks pause in discussion, voting and resolution. At 150 active seconds, incomplete Ventilation causes one 60-second natural air failure if no air failure is active. There are no random lethal incidents.

Air Failure lasts 90 seconds when sabotaged. Sump, Ventilation and Cargo cause six exposure points/second. Blackout lasts 50 seconds and energizes the marked Generator rectangle (76,140,50,48), causing ten exposure points/second. Leaving all hazards removes 12 exposure points/second. 100 exposure kills immediately. The Infiltrator is equally vulnerable. Power and Ventilation counter-repairs clear their corresponding sabotage even when fully repaired; counter-repairs do not add critical progress.

Attack cooldown is 90/75/65 seconds for 4/5/6 players and applies from match start. Sabotage begins with a 30-second delay, then a 65-second cooldown; faults cannot stack through hostile action. Maintenance hatches link Generator (230,170) and Evacuation (862,650), require 35-unit proximity, and have a 40-second cooldown after an initial ten-second delay. Usage creates a local metal-clatter caption.

Deaths are immediate; no revive/finish mechanic. Inspection exposes respiratory distress or severe trauma. Reports require a visible, unreported body within 42 units. Emergency alarms require proximity to Concourse (480,352), are limited to one per worker, and are disabled during evacuation. Reports remain available during evacuation. Meetings have a shared 35-active-second cooldown after resolution; reported bodies become unavailable.

Discussion lasts 45 seconds; voting lasts up to 20 seconds and ends early when all eligible ballots arrive; resolution lasts eight seconds. Living workers may vote once for a living worker or abstain. A candidate must receive more than half of eligible votes. Ties, missing ballots and insufficient majorities yield no ejection. Individual ballots and ejected allegiance are revealed. Eliminated workers cannot vote, communicate, work or move.

All four completed critical systems trigger a 75-second lift arrival plus 15-second boarding window. At closure, at least two living Survivors must be within x=736–864, y=576–672. The Infiltrator may stand there but does not count and does not veto a successful escape. Fewer than two living Survivors is an immediate loss. Eliminating the Infiltrator is an immediate Survivor victory, or occurs after an ejection's resolution screen.

Events are serialized in request arrival order. A report accepted first prevents a subsequent attack during the meeting. An attack accepted first removes the victim's ability to report. Hazard fatalities are processed before evacuation closure. Integrity expiration precedes escape evaluation in the same tick. Reconnect restores the same worker for two minutes; longer absence voids the shift. A disconnected eligible voter remains eligible, with a missing ballot treated as abstention.

Training uses no Infiltrator, one cycle per critical system, no commissioning delay, a 900-second initial clock and one required escapee. It is not a simulated social match.
