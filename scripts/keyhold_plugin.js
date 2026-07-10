var keyHold = (function (jspsych) {
  "use strict";

  const info = {
    name: "key-hold",
    version: "0.0.1", // When working in a Javascript environment with no build, you will need to manually put set the version information. This is used for metadata purposes and publishing.
    parameters: {
        prompt: { type: jspsych.ParameterType.STRING, default: null },
        valid_keys: { type: jspsych.ParameterType.KEYS, default: [] },
        pre_timeout: { type: jspsych.ParameterType.INT, default: 5000 },
        post_timeout: { type: jspsych.ParameterType.INT, default: 5000 },
        canvas_func: { type: jspsych.ParameterType.FUNCTION, default: null }
    },
    data: {
        key_presses: { type: jspsych.ParameterType.INT, array: true }
    }
  };

  /**
   * **{packageName}**
   *
   * {description}
   *
   * @author {apurvav}
   * @see {@link {none}}
   */
  class keyHold {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {

        let data = {};
        for (const code of trial.valid_keys) {
        data[code] = { start: [], end: [] };
        }
        let html = `<canvas id="keyhold-canvas" width="400" height="400"></canvas><br>`;

        if (trial.prompt) html += trial.prompt;

        display_element.innerHTML = html;
        setTimeout(() => {}, trial.pre_timeout);
        const start_time = performance.now();
        const keydownListener = (e) => {
        const keyCode = e.key;
        const t = performance.now() - start_time;
        if (trial.valid_keys.includes(keyCode)) {
            data[keyCode].start.push(t);
        }
        };

        const keyupListener = (e) => {
        const keyCode = e.key;
        const t = performance.now() - start_time;
        if (trial.valid_keys.includes(keyCode)) {
            data[keyCode].end.push(t);
        }
        };
        
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('keyup', keyupListener);
        trial.canvas_func("keyhold-canvas")
        setTimeout(() => {
             endTrial()
        }, trial.post_timeout);
       
        const endTrial = () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
        const paired = {};
        const end_time = performance.now() - start_time
        for (const [keyCode, value] of Object.entries(data)) {
            paired[keyCode] = pairKeypresses(value.start, value.end, end_time);
        }
        console.log(paired)
        this.jsPsych.finishTrial({ data: {key_presses: paired} });
        };
    }
  }
  keyHold.info = info;
  return keyHold;
})(jsPsychModule);

function pairKeypresses(keydowns, keyups, end_time) {
    const pairs = [];
    let kdIndex = 0;
    let lastRelease = -Infinity;

    if (keydowns[keydowns.length - 1] > keyups[keyups.length -1]){
        keyups.push(end_time)
    }

    for (const release of keyups) {

        // Skip keydowns that belong to previous presses
        while (
            kdIndex < keydowns.length &&
            keydowns[kdIndex] <= lastRelease
        ) {
            kdIndex++;
        }

        // First valid keydown before this release
        if (
            kdIndex < keydowns.length &&
            keydowns[kdIndex] < release
        ) {
            pairs.push([keydowns[kdIndex], release]);
        }

        lastRelease = release;
    }

    return pairs;
}