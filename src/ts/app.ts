import {
    tokyoNightDark,
    tokyoNightLight,
    darkBlue,
    dark,
    matrix,
    arch,
    modernInk,
    dracula,
    terminal,
    redDragon,
    theirTheme,
    jungle,
    sakura,
} from "./themes.js";

import { punctuation, english1k, english200, javascript100 } from "./language-english.js";

import {
    byId,
    $,
    lsSet,
    lsGet,
    byClassName,
    displayBlock,
    displayNone,
    isNone,
    $$,
    addClasses,
    isBlock,
    opacity_0,
    opacity_1,
    rmClasses,
    color,
    switchClass,
    html,
    hasClass,
} from "./lib/utils.js";

const second = 1000;

const settings = byId("settings")!;
const settingsItemsDisplay = byId("settings-items-display")!;
const popUps = byId("popups")!;
const darkBack = byId("dark-back")!;
const setttingsFontSizeDisplay = byId("settings-font-size-display")!;

const plusBtns = byClassName("plus-btn")!;
const backSpace = byId("back-space")!;

const notifElem = byId("notif")!;
const notifText = $(".notif-text")!;

let itemsListObject: { [key: string]: string } = {};
let itemsListKeys: string[] = [];

let languageItemsListObject: { [key: string]: string } = {};
let languageItemsListKeys: string[] = [];

let themesItemsListOjbect: { [key: string]: string } = {};
let themesItemsListKeys: string[] = [];

const typeField = byId("type-field")!;

let startTime: number;
let finishTime;
let typeTestStarted = false;
let isCapsLockOn = false;
let readyToStart = true;

let TEXT: string;
let numberOfCharacters = 0;

let POSITION = 0;
let rawCharacterCount = 0;
let numberOfErrors = 0;

let typeTime: number | string;
let wpm: number;
let rawWpm: number;
let consistency: number | string;
let accuracy: number;
let errors: number;

const docWpm = byId("wpm")!;
const docAcc = byId("acc")!;
const docRaw = byId("wpm-raw")!;
const docConsis = byId("consistency")!;
const docTime = byId("time")!;
const docError = byId("error")!;
const resultField = byId("result-field")!;
const buttonsResult = byId("buttons-result")!;
const aboutButton = byId("about-button")!;
const aboutPopup = byId("about-popup")!;
const themesButton = byId("themes-button")!;
const restartButton = byId("restart-button")!;
const repeatButton = byId("repeat-button")!;
const logo = byId("logo")!;
const typeModeBar = byId("type-mode-bar")!;
const timerTimeTypeMode = byId("timer-time-type-mode")!;
const liveRawWpmElem = byId("live-raw-wpm")!;
const liveAccuracyElem = byId("live-accuracy")!;
const gitHubButton = byId("github-button")!;

const capsLockState = byId("caps-lock-state")!;

let TYPEMODE = "word-type-mode";

let nWordsInput = 20;
let nTimeInput = 15;
let nWordsInputLocalStorage = lsGet("nWordsInput");
let nTimeInputLocalStorage = lsGet("nTimeInput");
let TYPEMODELocalStorage = lsGet("TYPEMODE");

const wordTypeModeOptions = byId("word-type-mode-options")!;
const timeTypeModeOptions = byId("time-type-mode-options")!;
const docTimeTypeMode = byId("time-type-mode")!;
const docWordTypeMode = byId("word-type-mode")!;

type LanguageNames = "english-200" | "english-1k" | "javascript-100";
type LanguageNamesLS = LanguageNames | null;
type LanguageObject = {
    [key in LanguageNames]: string[];
};

let languageLocalStorage: LanguageNamesLS = lsGet("LANGUAGE") as LanguageNamesLS;
let LANGUAGE = english200;
let LANGUAGENAME: LanguageNames = languageLocalStorage || "english-200";

const LanguagesObj: LanguageObject = {
    "english-200": english200,
    "javascript-100": javascript100,
    "english-1k": english1k,
};

LANGUAGE = LanguagesObj[LANGUAGENAME];

const languageSettingsItemsDisplay = byId("language-settings-items-display")!;
const languageButton = byId("language")!;
const languagePopup = byId("language-popup")!;

let localStorageBg = lsGet("bgC");
let localStorageFst = lsGet("fstC");
let localStorageS = lsGet("sC");
let localStorageT = lsGet("tC");
let localStorageFrth = lsGet("frthC");
let localStorageC = lsGet("cC");
let localStorageE = lsGet("eC");
let localStorageBs = lsGet("bsC");
let localStorageWs = lsGet("wsC");

let bgC = localStorageBg || tokyoNightDark["--background-color"];
let fstC = localStorageFst || tokyoNightDark["--first-color"];
let sC = localStorageS || tokyoNightDark["--second-color"];
let tC = localStorageT || tokyoNightDark["--third-color"];
let frthC = localStorageFrth || tokyoNightDark["--fourth-color"];
let cC = localStorageC || tokyoNightDark["--caret-color"];
let eC = localStorageE || tokyoNightDark["--error-color"];
let bsC = localStorageBs || tokyoNightDark["--best-score-color"];
let wsC = localStorageWs || tokyoNightDark["--worst-score-color"];

let customThemeObj = {
    "--background-color": bgC,
    "--first-color": fstC,
    "--second-color": sC,
    "--third-color": tC,
    "--fourth-color": frthC,
    "--caret-color": cC,
    "--error-color": eC,
    "--best-score-color": bsC,
    "--worst-score-color": wsC,
};

type ThemeNames =
    | "tokyo-night-dark"
    | "tokyo-night-light"
    | "dark-blue"
    | "dark"
    | "matrix"
    | "arch"
    | "modern-ink"
    | "sakura"
    | "dracula"
    | "terminal"
    | "red-dragon"
    | "their-theme"
    | "jungle"
    | "custom";
type ThemeNamesLS = ThemeNames | null;
type Theme = {
    "--background-color": string;
    "--first-color": string;
    "--second-color": string;
    "--third-color": string;
    "--fourth-color": string;
    "--caret-color": string;
    "--error-color": string;
    "--best-score-color": string;
    "--worst-score-color": string;
};
type ThemeObject = {
    [key in ThemeNames]: Theme;
};

let themeLocalStorage: ThemeNamesLS = lsGet("THEME") as ThemeNamesLS;
let THEMENAME: ThemeNames = themeLocalStorage || "tokyo-night-dark";

let THEME: Theme;

const themeObj: ThemeObject = {
    "tokyo-night-dark": tokyoNightDark,
    "tokyo-night-light": tokyoNightLight,
    "dark-blue": darkBlue,
    dark: dark,
    matrix: matrix,
    arch: arch,
    "modern-ink": modernInk,
    sakura: sakura,
    dracula: dracula,
    terminal: terminal,
    "red-dragon": redDragon,
    "their-theme": theirTheme,
    jungle: jungle,
    custom: customThemeObj,
};

THEME = themeObj[THEMENAME];

nWordsInput = Number(nWordsInputLocalStorage) || nWordsInput;
nTimeInput = Number(nTimeInputLocalStorage) || nTimeInput;
TYPEMODE = TYPEMODELocalStorage || TYPEMODE;

const themesSettingItemsDisplay = byId("themes-settings-items-display")!;
const themePopup = byId("themes-popup")!;

languageButton.innerHTML = languageLocalStorage?.replace("-", " ").toUpperCase() || "LANGUAGE";

let resultBestColorHEX = THEME["--best-score-color"];
let resultWorstColorHEX = THEME["--worst-score-color"];
const resultBestWpm = 140;
const resultWorstWpm = 30;
const resultBestWpmRaw = 140;
const resultWorstWpmRaw = 30;
const resultBestAcc = 100;
const resultWorstAcc = 50;
const resultAllCharToErrRatio = 0.04;
const resultBestConsis = 90;
const resultWorstConsis = 40;

const custom = byId("custom")!;
const customTheme = byId("custom-theme")!;

const resetCustomTheme = byId("reset-custom-theme")!;

// on-off settings
type onOffSettingsIds =
    | "space-to-next-word"
    | "current-word-highlight"
    | "next-word-highlight"
    | "smooth-caret"
    | "smooth-caret"
    | "smooth-caret"
    | "show-typed-word-on-top"
    | "smooth-caret"
    | "show-live-raw-wpm"
    | "show-live-accuracy"
    | "show-incorrect";

type OnOffSettings = {
    [key in onOffSettingsIds]: {
        state: "OFF" | "ON";
        localStorageKey: string;
        ofButton: HTMLElement;
        onClickFunction?: Function;
    };
};

const onOffSettingsElements = byClassName("onoffsettings");
// const onOffSettingsElementsByIdObject = elementsArrayToByIdObject(onOffSettingsElements);

const ofButtonsElements = byClassName("of-button");
const ofButtonsElementsByIdObject = elementsArrayToByIdObject(ofButtonsElements);

const onoffsetttings: OnOffSettings = {
    "space-to-next-word": {
        state: "ON",
        localStorageKey: "spaceToNextWordState",
        ofButton: ofButtonsElementsByIdObject["of-space-to-next-word"],
    },
    "current-word-highlight": {
        state: "OFF",
        localStorageKey: "currentWordHighlightState",
        ofButton: ofButtonsElementsByIdObject["of-current-word-highlight"],
    },
    "next-word-highlight": {
        state: "OFF",
        localStorageKey: "nextWordHighlightState",
        ofButton: ofButtonsElementsByIdObject["of-next-word-highlight"],
    },
    "smooth-caret": {
        state: "ON",
        localStorageKey: "smoothCaretState",
        ofButton: ofButtonsElementsByIdObject["of-smooth-caret"],
        onClickFunction: () => {
            addCaretStyleOnScreen();
            positionUpdate();
            updateCaretOnScreen();
        },
    },
    "show-typed-word-on-top": {
        state: "OFF",
        localStorageKey: "showTypedWordOnTopState",
        ofButton: ofButtonsElementsByIdObject["of-show-typed-word-on-top"],
    },
    "show-live-raw-wpm": {
        state: "OFF",
        localStorageKey: "showLiveRawWpmState",
        ofButton: ofButtonsElementsByIdObject["of-show-live-raw-wpm"],
        onClickFunction: () => {
            liveShowOnPage();
        },
    },
    "show-live-accuracy": {
        state: "OFF",
        localStorageKey: "showLiveAccuracyState",
        ofButton: ofButtonsElementsByIdObject["of-show-live-accuracy"],
        onClickFunction: () => {
            liveShowOnPage();
        },
    },
    "show-incorrect": {
        state: "OFF",
        localStorageKey: "showIncorrect",
        ofButton: ofButtonsElementsByIdObject["of-show-incorrect"],
    },
};

setupOnOffSettings();

let spaceToNextWordState = onoffsetttings["space-to-next-word"].state;
let currentWordHighlightState = onoffsetttings["current-word-highlight"].state;
let nextWordHighlightState = onoffsetttings["next-word-highlight"].state;
let smoothCaretState = onoffsetttings["smooth-caret"].state;
// let showTypedWordOnTopState = onoffsetttings["show-typed-word-on-top"].state;
let showLiveRawWpmState = onoffsetttings["show-live-raw-wpm"].state;
let showLiveAccuracyState = onoffsetttings["show-live-accuracy"].state;
let showIncorrectState = onoffsetttings["show-incorrect"].state;

function updateStates() {
    spaceToNextWordState = onoffsetttings["space-to-next-word"].state;
    currentWordHighlightState = onoffsetttings["current-word-highlight"].state;
    nextWordHighlightState = onoffsetttings["next-word-highlight"].state;
    smoothCaretState = onoffsetttings["smooth-caret"].state;
    // showTypedWordOnTopState = onoffsetttings["show-typed-word-on-top"].state;
    showLiveRawWpmState = onoffsetttings["show-live-raw-wpm"].state;
    showLiveAccuracyState = onoffsetttings["show-live-accuracy"].state;
    showIncorrectState = onoffsetttings["show-incorrect"].state;
}

// end of on-off settings

let ctrlPressed = false;

let puncLocalStorage = lsGet("PUNCTUATION");
let numbersLocalStorage = lsGet("NUMBERS");

let PUNCTUATION = puncLocalStorage || false;
let NUMBERS = numbersLocalStorage || false;

let caretStyleElem = byId("caret-style")!;
let switchCaretStyle = byId("switch-caret-style")!;
let caretStyleLocalStorage = lsGet("caretStyleState")!;
let caretStyleStates = ["LINE", "BLOCK", "OUTLINE-BLOCK", "UNDERLINE"];
let caretStyleState = caretStyleLocalStorage || "LINE";
switchCaretStyle!.innerHTML = caretStyleState;

settings.addEventListener("click", () => {
    if (isNone(popUps)) {
        displayBlock([popUps, darkBack]);
    } else {
        displayNone([popUps, darkBack]);
    }
});

languageButton.addEventListener("click", () => {
    if (isNone(languagePopup)) {
        displayBlock([languagePopup, darkBack]);
    }
});

aboutButton.addEventListener("click", () => {
    if (isNone(aboutPopup)) {
        displayBlock([aboutPopup, darkBack]);
    }
});

themesButton.addEventListener("click", () => {
    if (isNone(themePopup)) {
        displayBlock([themePopup, darkBack]);
    }
});

darkBack.addEventListener("click", () => {
    displayNone([languagePopup, popUps, darkBack, aboutPopup, themePopup, customTheme]);
    displayBlock(themesSettingItemsDisplay);
    settings.focus();
    settings.blur();
});

byId("font-size")!.addEventListener("click", () => {
    displayNone(settingsItemsDisplay);
    displayBlock(setttingsFontSizeDisplay);
});

Array.from(plusBtns).forEach((e) => {
    e.addEventListener("click", () => inputNumberQuantity(e.nextElementSibling as HTMLSpanElement, e.className), {
        once: true,
    });
});

function inputNumberQuantity(node: HTMLSpanElement, sign: string) {
    let num;
    let max = Number(node.dataset.max);
    let min = Number(node.dataset.min);

    node.innerHTML == "" ? (num = 0) : (num = Number(node.innerHTML));
    if (num > max) {
        node.innerHTML = max.toString();
        return;
    } else if (num < min) {
        node.innerHTML = min.toString();
        return;
    }
    if (sign === "plus-btn") {
        if (num + 1 > max) return;
        num++;
    } else {
        if (num - 1 < min) return;
        num--;
    }

    num = num.toString();
    if (num.length === 1) num = "0" + num;
    node.innerHTML = num;
}

backSpace.addEventListener("click", () => {
    if (isBlock(settingsItemsDisplay)) {
        displayNone([popUps, darkBack]);
    } else if (isNone(settingsItemsDisplay)) {
        $$(".setting-inside").forEach((e: Element) => {
            if ((e as HTMLElement).style.display === "block") {
                (e as HTMLElement).style.display = "none";
            }
        });
        settingsItemsDisplay.style.display = "block";
    }
});

// @ts-ignore
function save(node: HTMLElement) {
    let obj: { [key: string]: string } = {};
    if (node.id === "save-font-size") {
        $$(".setting-input-number-font-size").forEach((e) => {
            obj[e.id.toString()] = e.innerHTML.toString();
        });
    }

    changeSaves(obj);
}

function changeSaves(obj: { [key: string]: string }) {
    for (const key in obj) {
        if (key === "input-number-font-size") {
            typeField.style.fontSize = obj[key].toString() + "px";
        }
    }
}

// @ts-ignore
function notif(txt: string) {
    let time = 4;
    let notifInterval: ReturnType<typeof setInterval>;

    notifText.innerHTML = txt;
    notifElem.style.right = "-2px";
    notifInterval = setInterval(() => {
        time = time - 1;
        if (time <= 0) {
            notifElem.style.right = "-302px";
            clearInterval(notifInterval);
        }
    }, second);
}

settingsItemsDisplay.querySelectorAll(".setting-items").forEach((e) => {
    itemsListObject[(e.firstChild as HTMLSpanElement).innerHTML] = e.id;
    itemsListKeys.push((e.firstChild as HTMLSpanElement).innerHTML);
});

languageSettingsItemsDisplay.querySelectorAll(".setting-items").forEach((e) => {
    languageItemsListObject[(e.firstChild as HTMLSpanElement).innerHTML] = e.id;
    languageItemsListKeys.push((e.firstChild as HTMLSpanElement).innerHTML);
});

themesSettingItemsDisplay.querySelectorAll(".setting-items").forEach((e) => {
    themesItemsListOjbect[(e.firstChild as HTMLSpanElement).innerHTML] = e.id;
    themesItemsListKeys.push((e.firstChild as HTMLSpanElement).innerHTML);
});

// why am i doing this?
function tolowercase(str: string) {
    if (str === " ") return " ";
    if (str == null) return " ";
    return str.toLowerCase();
}

// @ts-ignore
function matchSearch(node: HTMLInputElement) {
    let LK: string[] = [];
    let LO: { [key: string]: string } = {};
    if (node.id === "item-search") {
        LK = itemsListKeys;
        LO = itemsListObject;
    } else if (node.id === "language-item-search") {
        LK = languageItemsListKeys;
        LO = languageItemsListObject;
    } else if (node.id === "themes-item-search") {
        LK = themesItemsListKeys;
        LO = themesItemsListOjbect;
    }
    let txt = node.value;
    let copyOfList = [];
    for (let i = 0; i < LK.length; i++) {
        copyOfList.push(LK[i]);
    }
    if (txt === "") {
        for (let i = 0; i < LK.length; i++) {
            byId(LO[copyOfList[i]])!.style.display = "block";
        }
    }
    let not = false;
    for (let i = 0; i < copyOfList.length; i++) {
        for (let j = 0; j < txt.length; j++) {
            if (tolowercase(txt[j]) !== tolowercase(copyOfList[i][j])) {
                byId(LO[copyOfList[i]])!.style.display = "none";
                copyOfList.splice(i, 1);
                not = true;
                break;
            }
        }
        if (not) {
            i--;
            not = false;
        }
    }
    for (let i = 0; i < copyOfList.length; i++) {
        byId(LO[copyOfList[i]])!.style.display = "block";
    }
}

// WHY?
function isLastChild(el: Node | HTMLElement | null) {
    return el === el?.parentNode?.children[el?.parentNode.children.length - 1];
}
function isFirstChild(el: Node | HTMLElement | null) {
    return el === el?.parentNode?.children[0];
}

function random(n: number) {
    return Math.floor(Math.random() * n);
}

function textGenerator() {
    let result: string[] = [];
    if (TYPEMODE === "word-type-mode") {
        for (let i = 0; i < nWordsInput; i++) {
            result.push(LANGUAGE[random(LANGUAGE.length)]);
        }
    } else if (TYPEMODE === "time-type-mode") {
        for (let i = 0; i < 100; i++) {
            result.push(LANGUAGE[random(LANGUAGE.length)]);
        }
    }
    if (PUNCTUATION === "ON") {
        let firstWord = result[0].split("");
        firstWord[0] = firstWord[0].toUpperCase();
        result[0] = firstWord.join("");
        result = addPunctuation(result);
    }
    if (NUMBERS === "ON") {
        result = addNumbers(result);
    }

    TEXT = result.join(" ");
    for (let i = 0; i < TEXT.length; i++) {
        numberOfCharacters++;
    }
    textToHTML(TEXT);
}
textGenerator();

function textGeneratorToHtmlTimeTypeMode() {
    let result: string[] = [];
    for (let i = 0; i < 25; i++) {
        result.push(LANGUAGE[random(LANGUAGE.length)]);
    }
    let resultString: string = " " + result.join(" ");
    TEXT += resultString;

    let firstWordTop = ($(".word") as HTMLElement).style.top;

    let x = document.createElement("div");
    x.classList.add("letter");
    x.classList.add("space");
    x.innerHTML = " ";
    if (typeField.lastElementChild?.tagName === "SPAN") {
        let last = typeField.lastChild;
        let before = last?.previousSibling;
        before?.appendChild(x);
    } else {
        typeField.lastChild?.appendChild(x);
    }

    let w = document.createElement("div");
    w.classList.add("word");
    w.style.position = "inherit";
    w.style.top = firstWordTop;
    typeField.appendChild(w);
    let word = typeField.lastChild;

    for (let i = 1; i < result.length; i++) {
        let letterElem = document.createElement("div");
        letterElem.classList.add("letter");
        letterElem.innerHTML = result[i];
        if (letterElem.innerHTML === " ") {
            letterElem.classList.add("space");
        }
        word?.appendChild(letterElem);

        if (result[i] === " ") {
            let wordElem = document.createElement("div");
            wordElem.classList.add("word");
            wordElem.style.position = "inherit";
            wordElem.style.top = firstWordTop;
            typeField.appendChild(wordElem);
            word = typeField.lastChild;
        }
    }
    moveCaretElemToEnd();
}

function moveCaretElemToEnd() {
    if (caretStyleState === "BLOCK" && smoothCaretState === "OFF") return;
    let caret = typeField.querySelector("span")!;
    typeField.appendChild(caret);
}

function textToHTML(str: string) {
    while (typeField.firstChild) {
        if (typeField.lastChild != undefined) {
            typeField.removeChild(typeField.lastChild);
        }
    }
    let w = document.createElement("div");
    w.classList.add("word");
    typeField.appendChild(w);
    w.style.position = "inherit";
    w.style.top = "0px";
    let word = typeField.lastChild;
    let l = document.createElement("div");
    addClasses(l, ["letter", "position"]);
    l.innerHTML = str[0];
    word?.appendChild(l);
    for (let i = 1; i < str.length; i++) {
        let letterElem = document.createElement("div");
        letterElem.classList.add("letter");
        letterElem.innerHTML = str[i];
        if (letterElem.innerHTML === " ") {
            letterElem.classList.add("space");
        }
        word?.appendChild(letterElem);

        if (str[i] === " ") {
            let wordElem = document.createElement("div");
            wordElem.classList.add("word");
            typeField.appendChild(wordElem);
            word = typeField.lastChild;
        }
    }
    addCaretStyleOnScreen();
}

function addPunctuation(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (Math.random() < 0.2) {
            let puncType = punctuation[random(punctuation.length)];
            if (puncType === "()" || puncType === "''" || puncType === '""') {
                arr[i] = puncType[0] + arr[i] + puncType[1];
            } else if (puncType === "-") {
                arr[i] = arr[i] + " " + puncType;
            } else {
                arr[i] = arr[i] + puncType;
            }
        }
    }
    let lastCharOfLastWord = arr[arr.length - 1][arr[arr.length - 1].length - 1];
    let addDotExeptions = [".", ",", ";", ":", "-", "!", "?"];
    if (addDotExeptions.indexOf(lastCharOfLastWord) === -1) arr[arr.length - 1] += ".";
    return arr;
}

function addNumbers(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (Math.random() < 0.1) {
            arr.splice(i, 0, Math.floor(Math.random() * 100).toString()).toString();
        }
    }
    return arr;
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Shift" ||
        event.key === "Tab" ||
        event.key === "Enter" ||
        event.key === "Alt" ||
        event.key === "F11" ||
        event.key === "CapsLock"
    ) {
        return;
    }
    if (POSITION === 0 && event.key === "Backspace") return;
    if (readyToStart === false) return;
    if (isBlock(popUps)) return;
    if (isBlock(languagePopup)) return;
    if (isBlock(aboutPopup)) return;
    if (isBlock(themePopup)) return;

    rawCharacterCount++;
    everyCharTimeBetween();

    if (event.key === "Control") {
        ctrlPressed = true;
        return;
    }
    if (event.key === "Backspace" && ctrlPressed === true) {
        return;
    }

    if (event.key === " " && spaceToNextWordState === "ON") {
        if (typeTestStarted === false && readyToStart === true) {
            onStart();
        }
        let pos = $(".position")!;
        let parentElem = pos.parentElement;
        if (isLastChild(pos.parentNode) || parentElem?.nextElementSibling?.tagName === "SPAN") {
            finished();
            return;
        } else if (isFirstChild(pos)) return;

        let nextPosition = nextWordPosition(TEXT, POSITION);
        spaceToNextWordHandler(nextPosition);
    } else if (event.key === "Backspace") {
        POSITION--;

        backSpaceHandler();
    } else if (event.key === TEXT[POSITION]) {
        if (typeTestStarted === false && readyToStart === true) {
            onStart();
        }
        POSITION++;

        correctHandler();
    } else if (event.key !== TEXT[POSITION]) {
        if (typeTestStarted === false && readyToStart === true) {
            onStart();
        }
        numberOfErrors++;
        POSITION++;

        incorrectHandler(event.key);
    }

    if (currentWordHighlightState === "ON") {
        checkWordForHighlight();
    }
    if (nextWordHighlightState === "ON") {
        checkNextWordForHighlight();
    }
});

function onStart() {
    typeTestStarted = true;
    startTime = performance.now();
    focusMode(true);
    if (TYPEMODE === "time-type-mode") {
        timerForTimeTypeMode(Number(nTimeInput));
    }

    liveShowOnPage();

    if (showLiveRawWpmState === "ON") {
        liveRawWpmStart();
    }
    if (showLiveAccuracyState === "ON") {
        liveAccuracyStart();
    }
}

document.addEventListener("keyup", (event) => {
    if (event.key === "Control") {
        ctrlPressed = false;
    }
});

document.addEventListener("keypress", (event) => {
    if (event.key === "Delete") {
        ctrlbackSpaceHandler();
        console.log("event.key = Delete");
    }
});

let t1: number;
let everyCharTimeBetweenArray: number[] = [];

function everyCharTimeBetween() {
    let t2 = performance.now();
    let deltaT = Math.round(t2 - t1);
    everyCharTimeBetweenArray.push(deltaT);
    t1 = t2;
}

function consistencyCalculator() {
    everyCharTimeBetweenArray.shift();

    let length = everyCharTimeBetweenArray.length;
    let SdSquared = 0;
    let sum = 0;
    for (let i = 0; i < length; i++) {
        sum += everyCharTimeBetweenArray[i];
    }
    let mid = sum / length;
    mid = Math.round(mid);

    for (let i = 0; i < length; i++) {
        SdSquared += Math.pow(everyCharTimeBetweenArray[i] - mid, 2);
    }
    SdSquared = SdSquared / length;
    let SD = Math.abs(Math.sqrt(SdSquared) - 40);
    let CV = SD / mid;

    consistency = 100 - CV * 100;
    if (consistency > 100 || consistency < 0) consistency = 0;
    else consistency = Math.round(consistency);

    everyCharTimeBetweenArray = [];
    t1 = 0;
    //console.log("mid:" + mid);
    //console.log("sd:" + SD);
    //console.log("consis:" + consistency);
}

function focusMode(state: boolean) {
    if (state) {
        opacity_0([aboutButton, settings, typeModeBar, languageButton, themesButton, gitHubButton]);
        buttonsResult.style.opacity = "0.5";
        logo.classList.add("focus-mode-logo");
        logo.style.color = "var(--first-color)";
    } else {
        opacity_1([buttonsResult, aboutButton, settings, typeModeBar, languageButton, themesButton, gitHubButton]);
        logo.classList.remove("focus-mode-logo");
        logo.style.color = "var(--second-color)";
    }
}

function backSpaceHandler() {
    let position = $(".position")!;

    if (isFirstChild(position)) {
        let parent = position.parentElement;

        let lastElemOfPrevParent =
            parent?.previousElementSibling?.children[parent.previousElementSibling.children.length - 1];

        rmClasses(lastElemOfPrevParent, ["incorrect", "space-incorrect", "correct"]);

        lastElemOfPrevParent?.classList.add("position");
        position.classList.remove("position");
    } else {
        let prevElem = position?.previousElementSibling;

        rmClasses(prevElem, ["incorrect", "space-incorrect", "correct"]);

        prevElem?.classList.add("position");
        position.classList.remove("position");
    }

    showIncorrectHandler("CLEAR", $(".position") as HTMLElement);

    positioningTypeFieldOnCaret();
    updateCaretOnScreen();
}

function correctHandler() {
    let position = $(".position")!;
    position.classList.add("correct");

    if (isLastChild(position)) {
        let parent = position.parentElement;
        if (isLastChild(parent) || parent?.nextElementSibling?.tagName === "SPAN") {
            finished();
        } else {
            parent?.nextElementSibling?.children[0].classList.add("position");
            position.classList.remove("position");
        }
    } else {
        position?.nextElementSibling?.classList.add("position");
        position.classList.remove("position");
    }
    positioningTypeFieldOnCaret();
    updateCaretOnScreen();
}

function incorrectHandler(incorrect: string) {
    let position = $(".position")!;
    if (position.innerHTML === " ") {
        position.classList.add("space-incorrect");
    } else {
        position.classList.add("incorrect");
    }

    if (isLastChild(position)) {
        let parent = position.parentElement;
        if (isLastChild(parent) || parent?.nextElementSibling?.tagName === "SPAN") {
            finished();
        } else {
            parent?.nextElementSibling?.children[0].classList.add("position");
            position.classList.remove("position");
        }
    } else {
        position?.nextElementSibling?.classList.add("position");
        position.classList.remove("position");
    }

    showIncorrectHandler(incorrect, position);

    positioningTypeFieldOnCaret();
    updateCaretOnScreen();
}

function showIncorrectHandler(incorrectKey: string, incorrectElem: HTMLElement) {
    if (showIncorrectState === "OFF") return;
    if (incorrectKey === "CLEAR") {
        while (incorrectElem.querySelector(".show-incorrect")) {
            incorrectElem.querySelector(".show-incorrect")?.remove();
        }
        return;
    }
    const incorrectHtml = html(`<span class="show-incorrect">${incorrectKey}</span>`);
    incorrectElem.appendChild(incorrectHtml);
}

function showIncorrectCtrlBSHandler() {
    if (showIncorrectState === "OFF") return;
    const allIncors = $$(".show-incorrect");
    allIncors.forEach((e) => {
        let parent = e.parentElement;
        let has = hasClass(parent!, ["incorrect", "space-incorrect"]);
        if (!(has[0] || has[1])) {
            e.remove();
        }
    });
}

function ctrlbackSpaceHandler() {
    let pos: HTMLElement = $(".position")!;
    let parent = pos.parentElement;

    if (isFirstChild(pos) && isFirstChild(parent)) return;
    else {
        let posToGo = ctrlBackspacePositionCal(TEXT, POSITION);
        let posDiff = POSITION - posToGo;
        let tempNode: Element = pos;
        for (let i = 0; i < posDiff; i++) {
            let parent = tempNode.parentElement!;
            if (isFirstChild(tempNode)) {
                let prevParent = parent.previousElementSibling!;
                removeCorrOrIncorrClass(tempNode);
                tempNode = prevParent.children[prevParent.children.length - 1];
            } else {
                removeCorrOrIncorrClass(tempNode);
                tempNode = tempNode.previousElementSibling!;
            }
        }
        removeCorrOrIncorrClass(tempNode);
        pos.classList.remove("position");
        tempNode.classList.add("position");
        POSITION = posToGo;
        if (currentWordHighlightState === "ON") {
            checkWordForHighlight();
        }
        if (nextWordHighlightState === "ON") {
            checkNextWordForHighlight();
        }
    }
    updateCaretOnScreen();
    showIncorrectCtrlBSHandler();
}

function removeCorrOrIncorrClass(node: HTMLElement | Element | null) {
    if (node?.classList.contains("correct")) {
        node.classList.remove("correct");
    } else if (node?.classList.contains("incorrect")) {
        node.classList.remove("incorrect");
    } else if (node?.classList.contains("space-incorrect")) {
        node.classList.remove("space-incorrect");
    }
}

function ctrlBackspacePositionCal(txt: string, currentPosition: number) {
    let i = currentPosition;
    if (txt[i - 1] === " ") i -= 2;
    else if (txt[i] === " ") i -= 1;
    while (txt[i] !== " " && i !== -1) {
        i--;
    }
    return ++i;
}

function finished() {
    finishTime = performance.now();
    focusMode(false);
    consistencyCalculator();

    typeTestStarted = false;
    readyToStart = false;

    let allIncorrects = $$(".incorrect").length;

    if (TYPEMODE === "time-type-mode") {
        const allChars = POSITION + 1;

        rawWpm = rawCharacterCount / 5 / Number(nTimeInput);
        wpm = ((allChars - allIncorrects) / 5 / Number(nTimeInput)) * 60;
        wpm = Math.round(wpm);
        rawWpm = Math.round(rawWpm * 60);
        accuracy = ((allChars - numberOfErrors) / allChars) * 100;
        accuracy = Math.floor(accuracy);

        errors = numberOfErrors;

        typeTime = Number(nTimeInput).toString() + "s";
        result();
        return;
    }
    typeTime = finishTime - startTime;
    typeTime /= second;

    rawWpm = rawCharacterCount / 5 / typeTime;
    wpm = ((numberOfCharacters - allIncorrects) / 5 / typeTime) * 60;
    wpm = Math.round(wpm);
    rawWpm = Math.round(rawWpm * 60);

    accuracy = ((numberOfCharacters - numberOfErrors) / numberOfCharacters) * 100;
    accuracy = Math.round(accuracy);

    errors = numberOfErrors;

    typeTime = Math.round(typeTime) + "s";

    //console.log(`allchar: ${numberOfCharacters}`);
    //console.log(`rawCharC: ${rawCharacterCount}`);
    //console.log(`allwords: ${numberOfWords}`);
    //console.log(`errors: ${numberOfErrors}`);
    //console.log(`time: ${typeTime}`);
    //console.log(`allincor: ${allIncorrects}`);

    result();
}

function result() {
    displayNone([typeField, languageButton, timerTimeTypeMode, liveRawWpmElem, liveAccuracyElem]);

    docWpm.innerHTML = wpm.toString();
    docAcc.innerHTML = accuracy + "%";
    docRaw.innerHTML = rawWpm.toString();

    resultColoring();

    docConsis.innerHTML = consistency + "%";
    docTime.innerHTML = typeTime.toString();
    docError.innerHTML = errors.toString();

    displayBlock([resultField, buttonsResult]);
    displayNone([capsLockState, timerTimeTypeMode]);
}

function resultColoring() {
    let wdiff = resultBestWpm - resultWorstWpm;
    let rwdiff = resultBestWpmRaw - resultWorstWpmRaw;
    let adiff = resultBestAcc - resultWorstAcc;
    let errdiff = Math.ceil(rawCharacterCount * resultAllCharToErrRatio);
    let condiff = resultBestConsis - resultWorstConsis;

    let wpmperc = ((wpm - resultWorstWpm) / wdiff) * 100;
    let wpmrawperc = ((rawWpm - resultWorstWpmRaw) / rwdiff) * 100;
    let accperc = ((accuracy - resultWorstAcc) / adiff) * 100;
    let errprec = (errors / errdiff) * 100;
    let conperc = (((typeof consistency === "number" ? consistency : 0) - resultWorstConsis) / condiff) * 100;

    if (wpm > resultBestWpm) wpmperc = 100;
    else if (wpm < resultWorstWpm) wpmperc = 0;
    if (rawWpm > resultBestWpmRaw) wpmrawperc = 100;
    else if (rawWpm < resultWorstWpmRaw) wpmrawperc = 0;
    if (accuracy > resultBestAcc) accperc = 100;
    else if (accuracy < resultWorstAcc) accperc = 0;
    if (errors > errdiff) errprec = 100;
    else if (errors <= 0) errprec = 0;
    if (Number(consistency) > resultBestConsis) conperc = 100;
    else if (Number(consistency) < resultWorstConsis) conperc = 0;

    let color1 = rgbToArray(hexToRgb(resultWorstColorHEX));
    let color2 = rgbToArray(hexToRgb(resultBestColorHEX));

    let wpmC: string = arrayToRgb(betweenTwoColor(color1, color2, wpmperc));
    let rawwpmC: string = arrayToRgb(betweenTwoColor(color1, color2, wpmrawperc));
    let accC: string = arrayToRgb(betweenTwoColor(color1, color2, accperc));
    let errC: string = arrayToRgb(betweenTwoColor(color2, color1, errprec));
    let conC: string = arrayToRgb(betweenTwoColor(color1, color2, conperc));

    color(docWpm, wpmC);
    color(docRaw, rawwpmC);
    color(docAcc, accC);
    color(docConsis, conC);
    color(docError, errC);
    color(docTime, wpmC);

    if (consistency == "0%") color(docConsis, resultWorstColorHEX);
}

function resetLiveColors() {
    color([timerTimeTypeMode, liveAccuracyElem, liveRawWpmElem], resultBestColorHEX);
}

function restart() {
    if (TYPEMODE === "time-type-mode") {
        clearInterval(inter);
        // timerTimeTypeMode.style.display = "none";
    }
    POSITION = 0;
    TEXT = "";
    focusMode(false);

    numberOfCharacters = 0;
    numberOfErrors = 0;
    rawCharacterCount = 0;
    startTime = 0;
    finishTime = 0;
    typeTime = 0;

    everyCharTimeBetweenArray = [];
    t1 = 0;

    typeTestStarted = false;
    readyToStart = true;

    displayNone(resultField);
    isCapsLockOn ? displayBlock(capsLockState) : displayNone(capsLockState);
    displayBlock([typeField, languageButton]);

    textGenerator();
    clearLiveArrays();
    clearLiveInters();
    liveShowOnPage();
    showTimerOnPage();
}

function repeat() {
    if (TYPEMODE === "time-type-mode") {
        clearInterval(inter);
        // timerTimeTypeMode.style.display = "none";
    }
    POSITION = 0;
    focusMode(false);

    numberOfErrors = 0;
    rawCharacterCount = 0;
    startTime = 0;
    finishTime = 0;
    typeTime = 0;

    everyCharTimeBetweenArray = [];
    t1 = 0;

    typeTestStarted = false;
    readyToStart = true;

    displayNone(resultField);
    isCapsLockOn ? displayBlock(capsLockState) : displayNone(capsLockState);
    displayBlock([typeField, languageButton]);

    textToHTML(TEXT);
    clearLiveArrays();
    clearLiveInters();
    liveShowOnPage();
    showTimerOnPage();
}

restartButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        restartButton.blur();
        restart();
        settings.focus();
        settings.blur();
    }
});

repeatButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        repeatButton.blur();
        repeat();
        settings.focus();
        settings.blur();
    }
});

restartButton.addEventListener("click", () => {
    restartButton.blur();
    restart();
    settings.focus();
    settings.blur();
});

repeatButton.addEventListener("click", () => {
    repeatButton.blur();
    repeat();
    settings.focus();
    settings.blur();
});

function checkCapsLock(event: KeyboardEvent) {
    isCapsLockOn = event.getModifierState('CapsLock');
    if (isBlock(resultField)) return;
    if (isCapsLockOn) {
        displayBlock(capsLockState);
    } else {
        displayNone(capsLockState);
    }
}

document.addEventListener('keydown', checkCapsLock);

function typeModeToLocalStorage() {
    let typeModeItems = $$(".type-mode-item")!;
    let actives: Element[] = [];
    for (let i = 0; i < typeModeItems.length; i++) {
        if (typeModeItems[i].classList.contains("mode-active")) {
            actives.push(typeModeItems[i]);
        }
    }
    for (let i = 0; i < actives.length; i++) {
        let activeParent = actives[i].parentElement!;
        if (actives[i].id === "word-type-mode") {
            lsSet("TYPEMODE", "word-type-mode");
            TYPEMODE = "word-type-mode";
        } else if (actives[i].id === "time-type-mode") {
            lsSet("TYPEMODE", "time-type-mode");
            TYPEMODE = "time-type-mode";
        } else if (activeParent.id === "word-type-mode-options") {
            lsSet("nWordsInput", actives[i].innerHTML);
            nWordsInput = Number(actives[i].innerHTML);
        } else if (activeParent.id === "time-type-mode-options") {
            lsSet("nTimeInput", actives[i].innerHTML);
            nTimeInput = Number(actives[i].innerHTML);
        }
    }
    if (TYPEMODE === "word-type-mode") {
        wordTypeModeOptions.style.display = "inline-block";
        timeTypeModeOptions.style.display = "none";
    } else if (TYPEMODE === "time-type-mode") {
        wordTypeModeOptions.style.display = "none";
        timeTypeModeOptions.style.display = "inline-block";
    }
    afterTypeModeHandler();
}

function typeModeToStyle() {
    let typeModeItems = $$(".type-mode-item");
    for (let i = 0; i < typeModeItems.length; i++) {
        if (typeModeItems[i].classList.contains("mode-active")) {
            typeModeItems[i].classList.remove("mode-active");
        }
        if (typeModeItems[i].id === TYPEMODE && TYPEMODE === "word-type-mode") {
            wordTypeModeOptions.style.display = "inline";
            timeTypeModeOptions.style.display = "none";
            typeModeItems[i].classList.add("mode-active");
        } else if (typeModeItems[i].id === TYPEMODE && TYPEMODE === "time-type-mode") {
            wordTypeModeOptions.style.display = "none";
            timeTypeModeOptions.style.display = "inline";
            typeModeItems[i].classList.add("mode-active");
        } else if (typeModeItems[i].innerHTML == nWordsInput.toString()) {
            typeModeItems[i].classList.add("mode-active");
        } else if (typeModeItems[i].innerHTML == nTimeInput.toString()) {
            typeModeItems[i].classList.add("mode-active");
        } else if (typeModeItems[i].id === "punctuation" && PUNCTUATION === "ON") {
            typeModeItems[i].classList.add("mode-active");
        } else if (typeModeItems[i].id === "numbers" && NUMBERS === "ON") {
            typeModeItems[i].classList.add("mode-active");
        }
    }
}
typeModeToStyle();

function selectTypeMode(node: HTMLDivElement) {
    if (node.id === "word-type-mode") {
        if (node.classList.contains("mode-active")) return;
        else {
            node.classList.add("mode-active");
            docTimeTypeMode.classList.remove("mode-active");
            TYPEMODE = "word-type-mode";
            lsSet("TYPEMODE", "word-type-mode");
            typeModeToLocalStorage();
            return;
        }
    } else if (node.id === "time-type-mode") {
        if (node.classList.contains("mode-active")) return;
        else {
            node.classList.add("mode-active");
            docWordTypeMode.classList.remove("mode-active");
            TYPEMODE = "time-type-mode";
            lsSet("TYPEMODE", "time-type-mode");
            typeModeToLocalStorage();
            return;
        }
    } else if (node.id === "punctuation") {
        if (node.classList.contains("mode-active")) {
            node.classList.remove("mode-active");
            PUNCTUATION = "OFF";
            lsSet("PUNCTUATION", "OFF");
            restart();
            return;
        } else {
            node.classList.add("mode-active");
            PUNCTUATION = "ON";
            lsSet("PUNCTUATION", "ON");
            restart();
            return;
        }
    } else if (node.id === "numbers") {
        if (node.classList.contains("mode-active")) {
            node.classList.remove("mode-active");
            NUMBERS = "OFF";
            lsSet("NUMBERS", "OFF");
            restart();
            return;
        } else {
            node.classList.add("mode-active");
            NUMBERS = "ON";
            lsSet("NUMBERS", "ON");
            restart();
            return;
        }
    }
    let parent = node.parentNode!;
    let children = Array.from(parent.children);

    rmClasses(children, "mode-active");

    node.classList.add("mode-active");
    typeModeToLocalStorage();
}

function afterTypeModeHandler() {
    restart();
}

($$(".type-mode-item") as NodeListOf<HTMLDivElement>).forEach((e) => {
    e.addEventListener("click", () => {
        selectTypeMode(e);
        showTimerOnPage();
    });
});

window.addEventListener("keydown", function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});

let inter: ReturnType<typeof setInterval>;

function timerForTimeTypeMode(time: number) {
    timerTimeTypeMode.style.display = "block";
    timerTimeTypeMode.innerHTML = time.toString();
    timerColoring(time, time);
    let initTime = time;
    let t = time;
    timerTimeTypeMode.innerHTML = time.toString();
    inter = setInterval(() => {
        t--;
        if (t <= 0) {
            clearInterval(inter);
            timerTimeTypeMode.style.display = "none";
            finished();
        } else {
            timerColoring(initTime, t);
            timerTimeTypeMode.innerHTML = t.toString();
        }
    }, second);
}

function showTimerOnPage() {
    if (TYPEMODE === "time-type-mode") {
        timerTimeTypeMode.style.display = "block";
        timerTimeTypeMode.innerHTML = "TIME";
        timerTimeTypeMode.style.color = resultBestColorHEX;
    } else {
        timerTimeTypeMode.style.display = "none";
    }
}
showTimerOnPage();

function positioningTypeFieldOnCaret() {
    let firstWord: HTMLElement = $(".word")!;
    let allWords: NodeListOf<HTMLElement> = ($$(".word") as NodeListOf<HTMLElement>)!;
    let caretLetter = $(".position");
    let caretWord = caretLetter?.parentElement;
    let caretWordTop = caretWord?.offsetTop;

    let typeFieldFontSize = window.getComputedStyle(typeField).getPropertyValue("font-size").replace(/\D/g, "");
    typeFieldFontSize = Number(typeFieldFontSize).toString();
    let caretHeight = Number(typeFieldFontSize) * 1.25;
    if (typeof caretWordTop !== "undefined" && caretWordTop > caretHeight) {
        let firstWordTop = parseInt(firstWord.style.top);
        firstWordTop -= caretHeight;
        let firstWordTopString = firstWordTop + "px";
        for (let i = 0; i < allWords.length; i++) {
            allWords[i].style.top = firstWordTopString;
        }
        if (TYPEMODE === "word-type-mode") return;
        textGeneratorToHtmlTimeTypeMode();
    }
    updateCaretOnScreen();
}

function updateCaretOnScreen() {
    if (caretStyleState === "block" && smoothCaretState === "OFF") return;
    else {
        let pos: HTMLElement = $(".position")!;
        let parent = pos.parentElement;
        let posX = pos.offsetLeft + (parent?.offsetLeft || 0);
        let posY = pos.offsetTop + (parent?.offsetTop || 0);
        let caret: HTMLElement = $(".block-caret")!;
        if (caretStyleState === "BLOCK") {
            caret = $(".block-caret")!;
        } else if (caretStyleState === "LINE") {
            caret = $(".line-caret")!;
        } else if (caretStyleState === "OUTLINE-BLOCK") {
            caret = $(".outline-block-caret")!;
        } else if (caretStyleState === "UNDERLINE") {
            caret = $(".underline-block-caret")!;
        }

        if (caret != undefined) {
            caret.style.top = posY + "px";
            caret.style.left = posX + "px";
        }
        try {
            if (caret == undefined) return;
            if (caret.getAnimations().length === 1) {
                caret.getAnimations()[0].currentTime = 0;
                return;
            }
            caret.getAnimations()[1].currentTime = 0;
        } catch (err) {
            console.error(err);
        }
    }
}

window.addEventListener("resize", updateCaretOnScreen);

$$(".lang").forEach((e) => {
    e.addEventListener("click", () => {
        let langStr: LanguageNames = e.id as LanguageNames;
        console.log(langStr);
        lsSet("LANGUAGE", langStr);
        LANGUAGENAME = langStr;
        LANGUAGE = LanguagesObj[LANGUAGENAME];
        restart();
        displayNone([languagePopup, darkBack]);
        languageButton.innerHTML = langStr.replace("-", " ").toUpperCase();
    });
});

$$(".theme").forEach((e) => {
    e.addEventListener("click", () => {
        THEME = themeObj[e.id as ThemeNames];
        lsSet("THEME", e.id);
        resultBestColorHEX = THEME["--best-score-color"] || themeObj["tokyo-night-dark"]["--best-score-color"];
        resultWorstColorHEX = THEME["--worst-score-color"] || themeObj["tokyo-night-dark"]["--worst-score-color"];
        themeUpdateOnScreen();
        resultColoring();
    });
});
themeUpdateOnScreen();
function themeUpdateOnScreen() {
    let root = ($(":root") as HTMLElement)!;
    let sheet = (byId("new-animation") as HTMLStyleElement)!.sheet;
    for (const key in THEME) {
        root.style.setProperty(key, THEME[key as keyof Theme]);
    }
    let rule = ".position { animation-name: blinker; }";
    if (sheet!.cssRules.length > 0) {
        sheet!.deleteRule(0);
        sheet!.insertRule(rule, 0);
    } else {
        sheet!.insertRule(rule, 0);
    }
    resetLiveColors();
}
function positionUpdate() {
    let head = $("head")!;
    if (caretStyleState === "BLOCK") {
        if (smoothCaretState === "ON") {
            head.insertAdjacentHTML(
                "beforeend",
                `<style id="new-position" type="text/css">
                                                .position { background-color: var(--background-color); animation-name: none}; }
                                 </style>
                        `
            );
        } else {
            head.insertAdjacentHTML(
                "beforeend",
                `<style id="new-position" type="text/css">
                                .position {
                                                background-color: var(--caret-color);
                                                /* color: var(--first-color); */
                                                animation: blinker 1s infinite;
                                                z-index: 99;
                                }
                                 </style>
                        `
            );
        }
    } else if (caretStyleState === "LINE" || caretStyleState === "OUTLINE-BLOCK" || caretStyleState === "UNDERLINE") {
        head.insertAdjacentHTML(
            "beforeend",
            `<style id="new-position" type="text/css">
                                                .position { background-color: var(--background-color); animation-name: none}; }
                                 </style>
                        `
        );
    }
}
positionUpdate();

function rgbToArray(string: string): [number, number, number] {
    let str: string[] = string.split(",");
    let result: [number, number, number] = [0, 0, 0];
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].replace(/\D/g, "");
        result[i] = parseInt(str[i]);
    }
    return result;
}

function betweenTwoColor(
    color1: [number, number, number],
    color2: [number, number, number],
    percent: number
): [number, number, number] {
    let diff1 = Math.abs(color1[0] - color2[0]);
    let diff2 = Math.abs(color1[1] - color2[1]);
    let diff3 = Math.abs(color1[2] - color2[2]);

    let smaller1 = color1[0] > color2[0] ? color2[0] : color1[0];
    let smaller2 = color1[1] > color2[1] ? color2[1] : color1[1];
    let smaller3 = color1[2] > color2[2] ? color2[2] : color1[2];

    let sign1 = smaller1 === color2[0] ? -1 : 1;
    let sign2 = smaller2 === color2[1] ? -1 : 1;
    let sign3 = smaller3 === color2[2] ? -1 : 1;

    return [
        color1[0] + (sign1 * (diff1 * percent)) / 100,
        color1[1] + (sign2 * (diff2 * percent)) / 100,
        color1[2] + (sign3 * (diff3 * percent)) / 100,
    ];
}
function arrayToRgb(arr: [number, number, number]) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

// not mine
function hexToRgb(h: string) {
    let r: string, g: string, b: string;
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return "rgb(" + +r! + "," + +g! + "," + +b! + ")";
}

custom.addEventListener("click", () => {
    themesSettingItemsDisplay.style.display = "none";
    customTheme.style.display = "block";
});

type InputIdWithColorKey = {
    "bg-color-input": ["--background-color", "bgC"];
    "first-color-input": ["--first-color", "fstC"];
    "second-color-input": ["--second-color", "sC"];
    "third-color-input": ["--third-color", "tC"];
    "fourth-color-input": ["--fourth-color", "frthC"];
    "error-color-input": ["--error-color", "eC"];
    "caret-color-input": ["--caret-color", "cC"];
    "best-color-input": ["--best-score-color", "bsC"];
    "worst-color-input": ["--worst-score-color", "wsC"];
};

type InputIdWithColorKeyKeys = keyof InputIdWithColorKey;

type InputIdWithColorKeyFirstElements = {
    [key in keyof InputIdWithColorKey]: InputIdWithColorKey[key][0];
}[keyof InputIdWithColorKey];

const inputIdWithColorKey: InputIdWithColorKey = {
    "bg-color-input": ["--background-color", "bgC"],
    "first-color-input": ["--first-color", "fstC"],
    "second-color-input": ["--second-color", "sC"],
    "third-color-input": ["--third-color", "tC"],
    "fourth-color-input": ["--fourth-color", "frthC"],
    "error-color-input": ["--error-color", "eC"],
    "caret-color-input": ["--caret-color", "cC"],
    "best-color-input": ["--best-score-color", "bsC"],
    "worst-color-input": ["--worst-score-color", "wsC"],
};

($$(".color-input") as NodeListOf<HTMLInputElement>).forEach((e) => {
    e.value = THEME[inputIdWithColorKey[e.id as InputIdWithColorKeyKeys][0] as InputIdWithColorKeyFirstElements];
});

($$(".color-input") as NodeListOf<HTMLInputElement>).forEach((e) => {
    e.addEventListener("input", () => {
        let id: InputIdWithColorKeyKeys = e.id as InputIdWithColorKeyKeys;
        let value = e.value;

        THEME[inputIdWithColorKey[id][0]] = value;
        lsSet(inputIdWithColorKey[id][1], value);

        resultBestColorHEX = THEME["--best-score-color"];
        resultWorstColorHEX = THEME["--worst-score-color"];
        themeUpdateOnScreen();
        resetLiveColors();
    });
});

function setupOnOffSettings() {
    for (let i = 0; i < onOffSettingsElements.length; i++) {
        let ofsetting = onoffsetttings[onOffSettingsElements[i].id as onOffSettingsIds];

        ofsetting.state = (lsGet(ofsetting.localStorageKey) as "OFF" | "ON") || ofsetting.state;

        ofsetting.ofButton.innerHTML = ofsetting.state;

        onOffSettingsElements[i].addEventListener("click", () => {
            let ofButton = ofsetting.ofButton;
            let lsKey = ofsetting.localStorageKey;

            if (ofButton.innerHTML === "OFF") {
                ofButton.innerHTML = "ON";
                lsSet(lsKey, "ON");
                ofsetting.state = "ON";
            } else {
                ofButton.innerHTML = "OFF";
                lsSet(lsKey, "OFF");
                ofsetting.state = "OFF";
            }

            ofButtonStyle(ofsetting.ofButton);

            updateStates();

            if (ofsetting.onClickFunction !== undefined) {
                ofsetting.onClickFunction();
            }
        });
    }
    for (let i = 0; i < ofButtonsElements.length; i++) {
        ofButtonStyle(ofButtonsElements[i]);
    }
}

function elementsArrayToByIdObject(array: HTMLCollectionOf<HTMLElement> | HTMLElement[]) {
    let result: { [key: string]: HTMLElement } = {};

    for (let i = 0; i < array.length; i++) {
        result[array[i].id] = array[i];
    }

    return result;
}

caretStyleElem.addEventListener("click", () => {
    let index = caretStyleStates.indexOf(switchCaretStyle.innerHTML);
    if (index === caretStyleStates.length - 1) {
        caretStyleState = caretStyleStates[0];
        lsSet("caretStyleState", caretStyleState);
        switchCaretStyle.innerHTML = caretStyleState.toUpperCase();
    } else {
        caretStyleState = caretStyleStates[index + 1];
        lsSet("caretStyleState", caretStyleState);
        switchCaretStyle.innerHTML = caretStyleState.toUpperCase();
    }
    addCaretStyleOnScreen();
    positionUpdate();
    updateCaretOnScreen();
});

function ofButtonStyle(elem: HTMLSpanElement) {
    if (elem.innerHTML === "OFF") {
        switchClass(elem, "on-color", "off-color");
    } else {
        switchClass(elem, "off-color", "on-color");
    }
}

function nextWordPosition(txt: string, currentPosition: number) {
    let i = currentPosition;
    while (txt[i] !== " ") {
        i++;
    }
    return ++i;
}

function spaceToNextWordHandler(nextPosition: number) {
    let positionElem = $(".position")!;
    let positionParent = positionElem.parentElement;
    if (isLastChild(positionParent)) {
        return;
    }
    let tempNode: Element | undefined = positionElem;
    let parent = tempNode.parentElement!;
    let nextParent = parent.nextElementSibling;
    tempNode = nextParent?.children[0];
    positionElem.classList.remove("position");
    tempNode?.classList.add("position");

    POSITION = nextPosition;
    positioningTypeFieldOnCaret();
    updateCaretOnScreen();
}

function checkWordForHighlight() {
    let pos = $(".position")!;
    if (pos.classList.contains("highlight") === false) {
        let parent = pos.parentElement!;
        if (isFirstChild(parent) === false) {
            let previousParent = parent.previousElementSibling!;

            rmClasses(Array.from(previousParent.children), "highlight");
        }
        if (isLastChild(parent) === false) {
            let nextParent = parent.nextElementSibling!;

            rmClasses(Array.from(nextParent.children), "highlight");
        }
        addClasses(Array.from(parent.children), "highlight");
    }
}

function checkNextWordForHighlight() {
    let pos = $(".position")!;
    let parent = pos.parentNode!;
    let parentElem = pos.parentElement!;
    let nextParent = parentElem.nextElementSibling;
    if (nextParent == null || parentElem.nextElementSibling?.tagName === "SPAN") {
        rmClasses(Array.from(parent.children), "next-highlight");
        return;
    }
    if (
        parentElem.nextElementSibling?.tagName !== "SPAN" &&
        nextParent.children[0].classList.contains("next-highlight") === false
    ) {
        if (isFirstChild(nextParent) === false) {
            rmClasses(Array.from(parent.children), "next-highlight");
        }
        if (isLastChild(nextParent) === false) {
            let nextNextParent = nextParent.nextElementSibling!;

            rmClasses(Array.from(nextNextParent.children), "next-highlight");
        }
        addClasses(Array.from(nextParent.children), "next-highlight");
    }
}

resetCustomTheme.addEventListener("click", () => {
    for (const key in inputIdWithColorKey) {
        if (inputIdWithColorKey[key as InputIdWithColorKeyKeys][1] in localStorage) {
            lsSet(
                inputIdWithColorKey[key as InputIdWithColorKeyKeys][1],
                tokyoNightDark[inputIdWithColorKey[key as InputIdWithColorKeyKeys][0]]
            );
        }
    }
    ($$(".color-input") as NodeListOf<HTMLInputElement>).forEach((e) => {
        e.value = tokyoNightDark[inputIdWithColorKey[e.id as InputIdWithColorKeyKeys][0]];
        customThemeObj[inputIdWithColorKey[e.id as InputIdWithColorKeyKeys][0]] = e.value;
    });
    themeUpdateOnScreen();
});

function addCaretStyleOnScreen() {
    try {
        if (caretStyleState === "LINE") {
            caretClassRemove();
            let elem = document.createElement("span");
            elem.classList.add("line-caret");
            typeField.appendChild(elem);
            if (smoothCaretState === "ON") {
                elem.classList.add("smooth-caret");
            } else {
                elem.classList.add("flash-caret");
            }
        } else if (caretStyleState === "BLOCK") {
            if (smoothCaretState === "ON") {
                caretClassRemove();
                let elem = document.createElement("span");
                elem.classList.add("block-caret");
                typeField.appendChild(elem);
                elem.classList.add("smooth-caret");
            } else {
                caretClassRemove();
            }
        } else if (caretStyleState === "OUTLINE-BLOCK") {
            caretClassRemove();
            let elem = document.createElement("span");
            elem.classList.add("outline-block-caret");
            typeField.appendChild(elem);
            if (smoothCaretState === "ON") {
                elem.classList.add("smooth-outline-block-caret");
            } else {
                elem.classList.add("flash-outline-block-caret");
            }
        } else if (caretStyleState === "UNDERLINE") {
            caretClassRemove();
            let elem = document.createElement("span");
            elem.classList.add("underline-block-caret");
            typeField.appendChild(elem);
            if (smoothCaretState === "ON") {
                elem.classList.add("smooth-caret");
            } else {
                elem.classList.add("flash-caret");
            }
        }
    } catch (err) {
        console.error(err);
    }
}

function caretClassRemove() {
    while ($(".block-caret") != undefined) {
        $(".block-caret")!.remove();
    }
    while ($(".line-caret") != undefined) {
        $(".line-caret")!.remove();
    }
    while ($(".outline-block-caret") != undefined) {
        $(".outline-block-caret")!.remove();
    }
    while ($(".underline-block-caret") != undefined) {
        $(".underline-block-caret")!.remove();
    }
    return 0;
}

let liveRawWpmArray: number[] = [];
let prevRawCharCount = 0;

function calculateRawWpmSecond() {
    let rawCharCountInOneSecond = rawCharacterCount - prevRawCharCount;
    prevRawCharCount = rawCharacterCount;
    liveRawWpmArray.push(rawCharCountInOneSecond);
    let liveRawWpm;
    let sum = 0;
    for (let i = 0; i < liveRawWpmArray.length; i++) {
        sum += liveRawWpmArray[i];
    }
    if (liveRawWpmArray.length === 0) {
        showLiveRawWpmHandler(0);
        return;
    }
    liveRawWpm = sum / liveRawWpmArray.length;

    let roundedValue = Math.round((liveRawWpm * 120) / 25) * 5;
    showLiveRawWpmHandler(roundedValue);
}

function calculateAccuracySecond() {
    let accuracy = ((POSITION + 1 - numberOfErrors) / (POSITION + 1)) * 100;
    showLiveAccuracyHandler(Math.round(accuracy));
}

function clearLiveArrays() {
    liveRawWpmArray = [];
    prevRawCharCount = 0;
    liveRawWpmElem.innerHTML = "RAW";
    liveAccuracyElem.innerHTML = "ACC";
    timerTimeTypeMode.innerHTML = "TIME";
}

function liveShowOnPage() {
    if (showLiveRawWpmState === "ON") {
        liveRawWpmElem.style.display = "block";
    } else {
        liveRawWpmElem.style.display = "none";
    }
    if (showLiveAccuracyState === "ON") {
        liveAccuracyElem.style.display = "block";
    } else {
        liveAccuracyElem.style.display = "none";
    }
}
liveShowOnPage();

let liveRawWpmInter: ReturnType<typeof setInterval>;
let liveAccuracyInter: ReturnType<typeof setInterval>;
function liveRawWpmStart() {
    liveRawWpmInter = setInterval(() => {
        if (isBlock(resultField)) clearInterval(liveRawWpmInter);
        calculateRawWpmSecond();
    }, 500);
}
function liveAccuracyStart() {
    liveAccuracyInter = setInterval(() => {
        if (isBlock(resultField)) clearInterval(liveAccuracyInter);
        calculateAccuracySecond();
    }, 500);
}

function clearLiveInters() {
    clearInterval(liveRawWpmInter);
    clearInterval(liveAccuracyInter);
}

function showLiveRawWpmHandler(wpm: number) {
    liveRawWpmColoring(wpm);
    liveRawWpmElem.innerHTML = wpm.toString();
}
function showLiveAccuracyHandler(acc: number) {
    liveAccuracyColoring(acc);
    liveAccuracyElem.innerHTML = acc.toString();
}

function liveRawWpmColoring(wpm: number) {
    let rwdiff = resultBestWpmRaw - resultWorstWpmRaw;
    let wpmrawperc = ((wpm - resultWorstWpmRaw) / rwdiff) * 100;

    if (wpm > resultBestWpmRaw) wpmrawperc = 100;
    else if (wpm < resultWorstWpmRaw) wpmrawperc = 0;

    let color1 = rgbToArray(hexToRgb(resultWorstColorHEX));
    let color2 = rgbToArray(hexToRgb(resultBestColorHEX));

    let rawwpmC = betweenTwoColor(color1, color2, wpmrawperc);
    let rawwpmCstring = arrayToRgb(rawwpmC);

    color(liveRawWpmElem, rawwpmCstring);
}

function liveAccuracyColoring(acc: number) {
    let accdiff = resultBestAcc - resultWorstAcc;
    let accperc = ((acc - resultWorstAcc) / accdiff) * 100;

    if (acc > resultBestAcc) accperc = 100;
    else if (acc < resultWorstAcc) accperc = 0;

    let color1 = rgbToArray(hexToRgb(resultWorstColorHEX));
    let color2 = rgbToArray(hexToRgb(resultBestColorHEX));

    let accC = betweenTwoColor(color1, color2, accperc);

    let accCstring = arrayToRgb(accC);

    color(liveAccuracyElem, accCstring);
}

function timerColoring(time: number, now: number) {
    let perc = (now / time) * 100;

    if (now >= time) perc = 100;
    else if (now <= 0) perc = 0;

    let color1 = rgbToArray(hexToRgb(resultWorstColorHEX));
    let color2 = rgbToArray(hexToRgb(resultBestColorHEX));

    let colorBetween = betweenTwoColor(color1, color2, perc);

    let colorString = arrayToRgb(colorBetween);

    color(timerTimeTypeMode, colorString);
}
// TEST //
// TEST //
