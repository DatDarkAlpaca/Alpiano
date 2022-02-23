// Audio Context:
window.AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

// Oscilators:
const oscilators = {};

// Convert MIDI to Frequency:
function midiToFrequency(note) {
    const A = 440;
    return (A / 32) * (2 ** ((note - 9) / 12));
}

function midiToKey(note) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    noteSymbol = notes[note % 12];
    noteOctave = Math.floor(note / 12) - 1;

    return `${noteSymbol}${noteOctave}`;
}

function symbolToFrequency(note) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    let noteSymbol;
    if(note.length === 2) {
        noteSymbol = note[0];
    } else {
        noteSymbol = note[0] + note[1];
    }

    const noteNumber = notes.indexOf(noteSymbol);
    const noteOctave = parseInt(note[note.length - 1]) + 1;

    return midiToFrequency(noteOctave * 12 + noteNumber);
}

// Checking the MIDI device.
if(navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

// Request Callbacks:
function success(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices);

    const inputs = midiAccess.inputs;

    // On Keyboard press:
    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput);
    });
}

function failure() {
    console.log('Could not connect to the MIDI device.');
}

// Update Callback:
function updateDevices(event) {
    console.log(`Name: ${event.port.name} | State: ${event.port.state}, Type: ${event.port.type}`);
}

// Handle:
function handleInput(input) {
    const command  = input.data[0];
    const note     = input.data[1];
    const velocity = input.data[2];

    switch(command)
    {
        case 144:
            if(velocity > 0) {
                onNotePressed(note, velocity);
            }
            else {
                onNoteReleased(note); // Off.
            }
            break;

        case 128:
            onNoteReleased(note); // Released.
            break;
    }
}

// Key Events:
function playNoteSymbol(note) {
    if(!ctx) {
        return;
    }

    // Sound:
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = symbolToFrequency(note);

    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.33; // general volume

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.gain = oscGain;

    oscilators[note.toString()] = osc;

    osc.start();
}

function onNotePressed(note, velocity) {
    ctx.resume();

    if(!ctx) {
        return;
    }

    // Sound:
    const osc = ctx.createOscillator();

    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.33; // general volume

    const convertedGain = (1 / 127) * velocity;
    const velocityGain = ctx.createGain();
    velocityGain.gain.value = convertedGain;

    osc.type = 'sine';
    osc.frequency.value = midiToFrequency(note);

    osc.connect(oscGain);
    oscGain.connect(velocityGain);
    velocityGain.connect(ctx.destination);

    osc.gain = oscGain;

    oscilators[note.toString()] = osc;

    osc.start();

    // Display:
    app.displayNote(midiToKey(note));
}

function onNoteReleased(note) {
    const osc = oscilators[note.toString()];

    if(!ctx || !osc) {
        return;
    }

    const oscGain = osc.gain;

    oscGain.gain.setValueAtTime(oscGain.gain.value, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    setTimeout(() => {
        osc.stop();
        osc.disconnect();
    }, 50);

    app.hideNote(midiToKey(note));
    
    delete oscilators[note.toString()];
}