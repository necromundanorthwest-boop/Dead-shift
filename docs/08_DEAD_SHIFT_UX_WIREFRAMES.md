# UX structure

| Screen | Main region | Secondary region | Primary action |
|---|---|---|---|
| Entrance | DEAD SHIFT title, callsign | Station cutaway / six workers | Create / join / train |
| Lobby | Crew readiness manifest | Short survival guide | Ready / host start |
| Role briefing | Private allegiance | Role objective / countdown | Automatic entry |
| Active play | Local station canvas | Personnel, orders, local signals | Contextual console / inspect / report |
| Console | Contact order and four controls | Calibration timing | Select highlighted contact |
| Incident | Local corpse and context controls | Private inspection notice | Inspect or report |
| Discussion | Incident summary, countdown, messages | No voting yet | Submit text observation |
| Voting | Candidate buttons and abstain | Meeting chat | Seal one ballot |
| Resolution | Outcome and individual ballots | Allegiance if ejected | Automatic return |
| Evacuation | Lift arrival/closure clock | Physical destination instructions | Reach marked zone |
| Results | Winner, reason, all roles | Remaining statuses | Rematch / entrance |
| Mobile | Full-width canvas and system strip | Compact panels below | D-pad / Interact |

Essential status and actions live in the DOM, not solely in canvas. Room codes copy an invitation URL. Inputs and dialogs have labels; escape closes nonmandatory dialogs and cancels tasks. Required role/meeting/result dialogs cannot be dismissed to interact with a paused game. Touch movement uses pointer capture and cancels on release; keyboard input resets on blur.

The public schematic contains no live personnel positions. The field manual is available from the header. Reduced-motion mode disables decorative effects. There is no audio-only information.
