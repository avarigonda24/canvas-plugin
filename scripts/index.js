import { func, sleep } from './canvas.js'
const jsPsych = initJsPsych();
var timeline = [];
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Sample Trial!</h1>
    <p>Click any key to continue</p>
    `
}
var exittrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>The trial is finished.</h1>
    `
}

var keyhold = {
    type: keyHold,
    prompt: "Click the F and J keys when ball appears.",
    valid_keys: ['f', 'j'],
    pre_timeout: 3000,
    post_timeout: 10000,
    canvas_func: func
}

timeline.push(welcome)
timeline.push(keyhold)
timeline.push(exittrial)

jsPsych.run(timeline);