# Canvas Key Hold Plug-In
This custom jsPsych plugin shows a canvas stimulus for a set amount of time, and records multiple key presses.
## Input and Output
**Inputs**<br>
`prompt`: the prompt to display along with the canvas<br>
`valid_keys`: the keys to record input from<br>
`pre_timeout`: how long to wait from trial start to start recording key presses<br>
`post_timeout`: how long to wait before ending the trial<br>
`canvas_func`: the function for the canvas element<br>
**Outputs**<br>
`key_presses`: a dictionary keyed by key each which has a list of pairs of keydown and keyup times.<br>
## File Structure
```
project
├─ index.html
├─ scripts
│  ├─ index.js
│  ├─ canvas.js
│  └─ keyhold_plugin.js
└─ README.md
```