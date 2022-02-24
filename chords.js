const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Todo: fix bound errors then fix on python code:
function convertFlats(to_convert) {
    const converted = [];
    to_convert.forEach((note) => {
        if (note.length > 1 && note.toLowerCase().endsWith('b')) {
            const pos = notes.indexOf(note[0]);
            converted.push(notes[pos - 2] + '#');   
        } else {
            converted.push(note);
        }
    });

    return converted;
}

// Todo: fetch shouldn't be called everytime. Make it external.
async function guessChord(given_notes) {
    chords = await fetch('chords.json').then(response => response.json());

    reduced_chords = Object.fromEntries(Object.entries(chords).filter((a, _) => {
        return a[1].length == given_notes.length;
    }));

    given_notes = convertFlats(given_notes);

    let chord_found;
    for(let possible_inversion = 0; possible_inversion < given_notes.length; ++possible_inversion) {
        const root = given_notes[possible_inversion];
        const pos = notes.indexOf(root.toUpperCase());

        let reordered = notes.slice(pos, notes.length).concat(notes.slice(0, pos));
        reordered = reordered.concat(reordered);

        Object.entries(reduced_chords).forEach(([chord_type, intervals]) => {
            let current_interval = 0;
            let similarity = 0;
            
            given_notes.slice(possible_inversion, given_notes.length + 1).concat(given_notes.slice(0, possible_inversion)).forEach((note) => {
                let relative_pos = reordered.indexOf(note.toUpperCase());
                
                if (intervals[current_interval] >= 12){
                    relative_pos += 12;
                }

                if (intervals[current_interval] == relative_pos) {
                    current_interval += 1;
                    similarity += 1;
                }
                if (similarity == given_notes.length) {
                    console.log(root + chord_type, similarity, intervals, given_notes);
                    chord_found = root + chord_type;

                    if (possible_inversion > 0) {
                        let pos_root = reordered.indexOf(root.toUpperCase());
                        let pos_inverted = reordered.indexOf(given_notes[0].toUpperCase());

                        if (pos_inverted - pos_root == 7) {
                            console.log("2nd inversion");
                        } else if (pos_inverted - pos_root == 4) {
                            console.log("1st inversion");
                        }
                        console.log(`${root}/${given_notes[0]} ${chord_type}`);
                    }
                        
                    else {
                        return;
                    }
                }                    
            });
        });   
    };

    return chord_found;
}

function convertChordName(chord) {
    console.log(chord)

    chord = chord.replace('minor_seventh_flat_five', 'ø');
    chord = chord.replace('minor_major_seventh', 'mM7');
    chord = chord.replace('major_seventh', "maj7");
    chord = chord.replace('minor_seventh', "m7");
	chord = chord.replace('minor_sixth', 'm6');
    chord = chord.replace('sixth_nine', '6/9');

    chord = chord.replace('minor_ninth', 'm9');
    chord = chord.replace('major_ninth', 'maj9');
    chord = chord.replace('eleventh', '11');
    chord = chord.replace('minor_eleventh', 'm11');
    chord = chord.replace('thirteenth', '13');
    chord = chord.replace('minor_thirteenth', 'm13');
    chord = chord.replace('major_thirteenth', 'maj13');
    chord = chord.replace('add9', 'add9');
    chord = chord.replace('add2', 'add2');
    chord = chord.replace('seven_minus_five', '7-5');
    chord = chord.replace('seven_plus_five', '7+5');
    chord = chord.replace('minor_ninth', 'm9');
    chord = chord.replace('major_sixth', '6');
    chord = chord.replace('seventh', '7');
    chord = chord.replace('ninth', '9');
    chord = chord.replace('fifth', '5');
    chord = chord.replace('minor', 'm');
    chord = chord.replace('major', '');

    chord = chord.replace('aug', '+');
    chord = chord.replace('aug7', '+7');

    chord = chord.replace('dim7', '°7');
    chord = chord.replace('dim', '°');
    
    return chord;
}
