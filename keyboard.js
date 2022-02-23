const naturalKeys = ["C", "D", "E", "F", "G", "A", "B"];
const sharpKeys   = ["C", "D", "F", "G", "A"];
const flatKeys    = ["D", "E", "G", "A", "B"];

const range = ["C3", "C5"];

const whiteKeyWidth = 80;
const keyboardHeight = 400;

const app = {

    constructor() {
        this.mouse_down = false;
    },

    setupKeyboard() {
        const keyboard = document.querySelector("#keyboard");

        const allNaturalNotes = this.getAllNaturalNotes(range);
        const keyboardWidth = allNaturalNotes.length * whiteKeyWidth;

        // Main SVG:
        const SVG = this.createMainSVG(keyboardWidth, keyboardHeight);
        
        // White keys:
        let whiteKeyX = 0;
        allNaturalNotes.forEach((noteName) => {
            const whiteKeyTextGroup = utils.createSVGElement("g");
            const whiteKey = this.createKey({ className: "white-key", width: whiteKeyWidth, height: keyboardHeight, noteName: noteName });
            const text = utils.createSVGElement("text");
            
            utils.addTextContent(text, noteName);

            utils.setAttributes(whiteKeyTextGroup, { "width": whiteKeyWidth });
            utils.setAttributes(text, { 
                "x": whiteKeyX + whiteKeyWidth / 2,
                "y": 380,
                "text-anchor": "middle" 
            });
            utils.setAttributes(whiteKey, {
                "x": whiteKeyX,
                "data-note-name": noteName,
                "rx": "15",
                "ry": "15"
            });

            text.classList.add("white-key-text");

            whiteKeyTextGroup.appendChild(whiteKey);
            whiteKeyTextGroup.appendChild(text);
            SVG.appendChild(whiteKeyTextGroup);

            whiteKeyX += whiteKeyWidth;
        });

        // Black keys:
        let blackKeyX = 60;
        allNaturalNotes.forEach((naturalNote, index, array) => {
            if (index === array.length - 1) {
                return;
            }

            const blackKeyTextGroup = utils.createSVGElement("g");
            const flatNameText = utils.createSVGElement("text");
            const sharpNameText = utils.createSVGElement("text");

            const blackKey = this.createKey({className: "black-key", width: whiteKeyWidth / 2, height: keyboardHeight / 1.6, noteName: `${naturalNote[0]}#${naturalNote[1]}`});
           
            utils.setAttributes(blackKeyTextGroup, { "width": whiteKeyWidth / 2});

            for(let i = 0; i < sharpKeys.length; ++i) {
                let sharpName = sharpKeys[i];
                let flatName  = flatKeys[i];

                if(sharpName === naturalNote[0]) {
                    utils.setAttributes(blackKey, {
                        "x": blackKeyX,
                        "data-sharp-name": `${sharpName}#${naturalNote[1]}`,
                        "data-flat-name": `${flatName}b${naturalNote[1]}`,
                        "rx": "8",
                        "ry": "8"
                    });

                    utils.setAttributes(sharpNameText, {
                        "text-anchor": "middle",
                        "y": 215,
                        "x": blackKeyX + (whiteKeyWidth / 4)
                    });

                    utils.setAttributes(flatNameText, {
                        "text-anchor": "middle",
                        "y": 235,
                        "x": blackKeyX + (whiteKeyWidth / 4)
                    });

                    utils.addTextContent(sharpNameText, `${sharpName}♯`);
                    utils.addTextContent(flatNameText, `${flatName}♭`);

                    sharpNameText.classList.add("black-key-text");
                    flatNameText.classList.add("black-key-text");
                                        
                    if(sharpName === "D" || sharpName === "A") {
                        blackKeyX += whiteKeyWidth * 2;
                    } else {
                        blackKeyX += whiteKeyWidth;
                    }

                    blackKeyTextGroup.appendChild(blackKey);
                    blackKeyTextGroup.appendChild(sharpNameText);
                    blackKeyTextGroup.appendChild(flatNameText);
                }
            }

            SVG.appendChild(blackKeyTextGroup);
        });

        keyboard.appendChild(SVG);
    },

    editKeyboard(){
        const allNaturalNotes = this.getAllNaturalNotes(range);

        // Change SVG:
        const SVG = document.querySelector(".keyboard-SVG");
        const keyboardWidth = allNaturalNotes.length * whiteKeyWidth;
        SVG.setAttribute("viewBox", `0 0 ${keyboardWidth} ${keyboardHeight}`)

        // White keys:
        let whiteKeyX = 0;
        allNaturalNotes.forEach((noteName) => {
            const whiteKeyTextGroup = utils.createSVGElement("g");
            const whiteKey = this.createKey({ className: "white-key", width: whiteKeyWidth, height: keyboardHeight, noteName: noteName });
            const text = utils.createSVGElement("text");
            
            utils.addTextContent(text, noteName);

            utils.setAttributes(whiteKeyTextGroup, { "width": whiteKeyWidth });
            utils.setAttributes(text, { 
                "x": whiteKeyX + whiteKeyWidth / 2,
                "y": 380,
                "text-anchor": "middle" 
            });
            utils.setAttributes(whiteKey, {
                "x": whiteKeyX,
                "data-note-name": noteName,
                "rx": "15",
                "ry": "15"
            });

            text.classList.add("white-key-text");

            whiteKeyTextGroup.appendChild(whiteKey);
            whiteKeyTextGroup.appendChild(text);
            SVG.appendChild(whiteKeyTextGroup);

            whiteKeyX += whiteKeyWidth;
        });

        // Black keys:
        let blackKeyX = 60;
        allNaturalNotes.forEach((naturalNote, index, array) => {
            if (index === array.length - 1) {
                return;
            }

            const blackKeyTextGroup = utils.createSVGElement("g");
            const flatNameText = utils.createSVGElement("text");
            const sharpNameText = utils.createSVGElement("text");

            const blackKey = this.createKey({className: "black-key", width: whiteKeyWidth / 2, height: keyboardHeight / 1.6, noteName: `${naturalNote[0]}#${naturalNote[1]}`});
           
            utils.setAttributes(blackKeyTextGroup, { "width": whiteKeyWidth / 2});

            for(let i = 0; i < sharpKeys.length; ++i) {
                let sharpName = sharpKeys[i];
                let flatName  = flatKeys[i];

                if(sharpName === naturalNote[0]) {
                    utils.setAttributes(blackKey, {
                        "x": blackKeyX,
                        "data-sharp-name": `${sharpName}#${naturalNote[1]}`,
                        "data-flat-name": `${flatName}b${naturalNote[1]}`,
                        "rx": "8",
                        "ry": "8"
                    });

                    utils.setAttributes(sharpNameText, {
                        "text-anchor": "middle",
                        "y": 215,
                        "x": blackKeyX + (whiteKeyWidth / 4)
                    });

                    utils.setAttributes(flatNameText, {
                        "text-anchor": "middle",
                        "y": 235,
                        "x": blackKeyX + (whiteKeyWidth / 4)
                    });

                    utils.addTextContent(sharpNameText, `${sharpName}♯`);
                    utils.addTextContent(flatNameText, `${flatName}♭`);

                    sharpNameText.classList.add("black-key-text");
                    flatNameText.classList.add("black-key-text");
                                        
                    if(sharpName === "D" || sharpName === "A") {
                        blackKeyX += whiteKeyWidth * 2;
                    } else {
                        blackKeyX += whiteKeyWidth;
                    }

                    blackKeyTextGroup.appendChild(blackKey);
                    blackKeyTextGroup.appendChild(sharpNameText);
                    blackKeyTextGroup.appendChild(flatNameText);
                }
            }

            SVG.appendChild(blackKeyTextGroup);
        });
    },

    /*
    *   Todo: limiting, factor;
    */
    setupMenuKey() {
        const keys = document.querySelectorAll(".menu-key-btn");
        console.log(keys);

        keys[0].addEventListener('click', () => {   // End +
            const key = range[0];

            if (key.length === 2) {
                const keyLetter = range[1][0];
                const octave = range[1][1];
                console.log(keyLetter, octave);

                const keyPos = naturalKeys.indexOf(keyLetter);

                if (keyLetter !== 'B') {
                    range[1] = naturalKeys[keyPos + 1] + octave;
                    this.editKeyboard();
                } else {
                    range[1] = naturalKeys[0] + (parseInt(octave) + 1).toString();
                    this.editKeyboard();
                }

                const menuBtn = document.querySelector("#key-menu-end");
                menuBtn.innerHTML = range[1];
            }            
        });

        keys[1].addEventListener('click', () => {   // End +
            const key = range[0];

            if (key.length === 2) {
                const keyLetter = range[1][0];
                const octave = range[1][1];
                console.log(keyLetter, octave);

                const keyPos = naturalKeys.indexOf(keyLetter);

                if (keyLetter !== 'C') {
                    range[1] = naturalKeys[keyPos - 1] + octave;
                    this.editKeyboard();
                } else {
                    range[1] = naturalKeys[6] + (parseInt(octave) - 1).toString();
                    this.editKeyboard();
                }

                const menuBtn = document.querySelector("#key-menu-end");
                menuBtn.innerHTML = range[1];
            }            
        });

        keys[2].addEventListener('click', () => {   // Start +
            const key = range[0];

            if (key.length === 2) {
                const keyLetter = range[0][0];
                const octave = range[0][1];
                console.log(keyLetter, octave);

                const keyPos = naturalKeys.indexOf(keyLetter);

                if (keyLetter !== 'B') {
                    range[0] = naturalKeys[keyPos + 1] + octave;
                    this.editKeyboard();
                } else {
                    range[0] = naturalKeys[0] + (parseInt(octave) + 1).toString();
                    this.editKeyboard();
                }

                const menuBtn = document.querySelector("#key-menu-start");
                menuBtn.innerHTML = range[0];
            }            
        });

        keys[3].addEventListener('click', () => {   // Start -
            const key = range[0];

            if (key.length === 2) {
                const keyLetter = range[0][0];
                const octave = range[0][1];
                console.log(keyLetter, octave);

                const keyPos = naturalKeys.indexOf(keyLetter);

                if (keyLetter !== 'C') {
                    range[0] = naturalKeys[keyPos - 1] + octave;
                    this.editKeyboard();
                } else {
                    range[0] = naturalKeys[6] + (parseInt(octave) - 1).toString();
                    this.editKeyboard();
                }

                const menuBtn = document.querySelector("#key-menu-start");
                menuBtn.innerHTML = range[0];
            }            
        })
    },

    createOctave(i) {
        const octave = utils.createSVGElement("g");
        octave.classList.add("octave");
        octave.setAttribute("transform", `translate(${ i * octaveWidth }, 0)`);
        return octave;
    },

    createKey({ className, width, height, noteName }) {
        const key = utils.createSVGElement("rect");
        key.classList.add(className, "key");
    
        key.addEventListener('mousedown', () => {
            this.displayNote(noteName);
            playNoteSymbol(noteName);
            app.mouse_down = true;
        });

        key.addEventListener('mouseup', () => {
            this.hideNote(noteName);
            onNoteReleased(noteName);
            app.mouse_down = false;
        });

        key.addEventListener('mouseenter', () => {
            if(app.mouse_down === true) {
                this.displayNote(noteName);
                playNoteSymbol(noteName);
            }
        })

        key.addEventListener('mouseleave', () => {
            this.hideNote(noteName);
            onNoteReleased(noteName);
        });

        utils.setAttributes(key, {
            "width": width,
            "height": height
        });

        return key;
    },

    getAllNaturalNotes([firstKey, lastKey]) {
        const firstKeyName = firstKey[0];
        const firstKeyNumber = parseInt(firstKey[1]);

        const lastKeyName = lastKey[0];
        const lastKeyNumber = parseInt(lastKey[1]);

        const firstKeyIndex = naturalKeys.indexOf(firstKeyName);
        const lastKeyIndex = naturalKeys.indexOf(lastKeyName);

        const allNaturalKeys = [];

        for(let octaveNumber = firstKeyNumber; octaveNumber <= lastKeyNumber; ++octaveNumber) {
            if(octaveNumber === firstKeyNumber) {
                naturalKeys.slice(firstKeyIndex).forEach((noteName) => {
                    allNaturalKeys.push(noteName + octaveNumber);
                });
            } else if(octaveNumber === lastKeyNumber) {
                naturalKeys.slice(0, lastKeyIndex + 1).forEach((noteName) => {
                    allNaturalKeys.push(noteName + octaveNumber);
                });
            } else {
                naturalKeys.forEach((noteName) => {
                    allNaturalKeys.push(noteName + octaveNumber);
                });
            }
        }

        return allNaturalKeys;
    },

    createMainSVG(keyboardWidth, keyboardHeight) {
        const SVG = utils.createSVGElement("svg");

        utils.setAttributes(SVG, {
            "class": "keyboard-SVG",
            "width": "100%",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "viewBox": `0 0 ${keyboardWidth} ${keyboardHeight}`
        });

        return SVG;
    },

    displayNote(note){
        const keyboardKeys = document.querySelectorAll(".key");

        const displayText = document.querySelector(".menu-display");
        console.log(displayText);
        displayText.innerHTML = note;

        keyboardKeys.forEach(key => {
            const naturalName = key.dataset.noteName;
            const sharpName = key.dataset.sharpName;
            const flatName = key.dataset.flatName;

            if(naturalName === note || sharpName === note || flatName === note) {
                key.classList.add("show");
            }
        });
    },

    hideNote(note) {
        const keyboardKeys = document.querySelectorAll(".key");

        keyboardKeys.forEach(key => {
            const naturalName = key.dataset.noteName;
            const sharpName = key.dataset.sharpName;
            const flatName = key.dataset.flatName;

            if(naturalName === note || sharpName === note || flatName === note) {
                key.classList.remove("show");
            }
        });
    },

    displayNotes(notes) {
        const keyboardKeys = document.querySelectorAll(".key");
        utils.removeClassFromNodeCollection(keyboardKeys, "show");

        notes.forEach(noteName => {
            keyboardKeys.forEach(key => {
                const naturalName = key.dataset.noteName;
                const sharpName = key.dataset.sharpName;
                const flatName = key.dataset.flatName;

                if(naturalName === noteName || sharpName === noteName || flatName === noteName) {
                    key.classList.add("show");
                }
            });
        });
    }
}

const utils = {
    createSVGElement(el) {
        const element = document.createElementNS("http://www.w3.org/2000/svg" , el);
        return element;
    },

    setAttributes(el, attrs) {
        for(let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    },

    addTextContent(el, content) {
        el.textContent = content;
    },

    removeClassFromNodeCollection(nodeCollection, classToRemove) {
        nodeCollection.forEach(node => {
           if (node.classList.contains(classToRemove)) {
               node.classList.remove(classToRemove);
           }
        });
    }
}

app.setupKeyboard();
app.setupMenuKey();