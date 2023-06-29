/**
 * Returns an object containing all elements with an `id` attribute in the document, with keys converted to camelCase.
 * @returns {object} An object containing all elements with an `id` attribute in the document, with keys converted to camelCase.
 * @requires {@link kebabToCamel}
 */
export function getElementsByIds(): object {
        let elementsById: { [key: string]: Element } = {};
        let allElements: NodeListOf<Element> = document.querySelectorAll("*");
        for (let i = 0; i < allElements.length; i++) {
                if (allElements[i].id != null && allElements[i].id !== "") {
                        elementsById[kebabToCamel(allElements[i].id)] = allElements[i];
                }
        }
        return elementsById;
}

/**
 * Creates a new element with the specified tag name and attributes, and appends it to the provided parent element.
 * @param {string} tagName - The tag name of the element to create.
 * @param {object} attributes - An object containing the attributes to set on the new element.
 * @param {HTMLElement} parentElem - The parent element to append the new element to.
 * @returns {void}
 */
export function createAndAppendElement(tagName: string, attributes: { [key: string]: string }, parentElem: Element): void {
        const newElem = document.createElement(tagName);
        for (const attr in attributes) {
                newElem.setAttribute(attr, attributes[attr]);
        }
        parentElem.appendChild(newElem);
}

/**
 * Converts a string from kebab-case to camelCase.
 * @param {string} str - The string to convert.
 * @returns {string} The converted string in camelCase.
 */
export function kebabToCamel(str: string): string {
        let spliced: string[] = str.split("");
        for (let i = 0; i < spliced.length; i++) {
                if (spliced[i] === "-" && spliced[i + 1] != null) {
                        spliced[i + 1] = spliced[i + 1].toUpperCase();
                        spliced.splice(i, 1);
                        i--;
                }
        }
        return spliced.join("");
}

/**
 * Changes the case of a string to the specified format.
 * @param {string} str - The string to change the case of.
 * @param {("camel"|"pascal"|"snake"|"kebab"|"scream"|"upper"|"lower")} changeTo - The case format to change the string to.
 * @returns {string} - The original string with its case changed to the specified format.
 * @example
 * // Returns "exampleStringWithAllCases"
 * changeCase("-Example_string-with all-_ CASES__", "camel");
 *
 * // Returns "ExampleStringWithAllCases"
 * changeCase("-Example_string-with all-_ CASES__", "pascal");
 *
 * // Returns "_example_string_with_all_cases_"
 * changeCase("-Example_string-with all-_ CASES__", "snake");
 *
 * // Returns "-example-string-with-all-cases-"
 * changeCase("-Example_string-with all-_ CASES__", "kebab");
 *
 * // Returns "_EXAMPLE_STRING_WITH_ALL_CASES_"
 * changeCase("-Example_string-with all-_ CASES__", "scream");
 *
 * // Returns "EXAMPLESTRINGWITHALLCASES"
 * changeCase("-Example_string-with all-_ CASES__", "upper");

 * // Returns "examplestringwithallcases"
 * changeCase("-Example_string-with all-_ CASES__", "lower");
 */
type Case = "camel" | "pascal" | "snake" | "kebab" | "scream" | "upper" | "lower";

export function changeCase(string: string, changeTo: Case): string {
        let arr: string[] = string.split("");
        if (changeTo === "camel" || changeTo === "pascal") {
                for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === "-" || arr[i] === "_" || arr[i] === " ") {
                                arr.splice(i, 1);
                                arr[i] = arr[i].toUpperCase();
                        } else {
                                arr[i] = arr[i].toLowerCase();
                        }
                }
                if (changeTo === "camel") {
                        arr[0] = arr[0].toLowerCase();
                } else {
                        arr[0] = arr[0].toUpperCase();
                }
                for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === "-" || arr[i] === "_" || arr[i] === " ") {
                                arr.splice(i, 1);
                                i--;
                        }
                }
        } else if (changeTo === "snake" || changeTo === "kebab" || changeTo === "scream") {
                for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === "-" || arr[i] === "_" || arr[i] === " ") {
                                if (changeTo === "snake" || changeTo === "scream") {
                                        arr[i] = "_";
                                } else {
                                        arr[i] = "-";
                                }
                        } else if (arr[i] === arr[i].toUpperCase() && arr[i + 1] != null && arr[i + 1] !== arr[i + 1].toUpperCase()) {
                                arr[i] = arr[i].toLowerCase();
                                if (changeTo === "snake" || changeTo === "scream") {
                                        arr.splice(i, 0, "_");
                                } else {
                                        arr.splice(i, 0, "-");
                                }
                                i++;
                        } else {
                                arr[i] = arr[i].toLowerCase();
                        }
                }
                for (let i = 0; i < arr.length - 1; i++) {
                        if ((arr[i] === "_" && (arr[i + 1] === "_" || arr[i + 1] === "-")) || (arr[i] === "-" && (arr[i + 1] === "_" || arr[i + 1] === "-"))) {
                                arr.splice(i, 1);
                                i--;
                        }
                }
                if (changeTo === "scream") {
                        for (let i = 0; i < arr.length; i++) {
                                arr[i] = arr[i].toUpperCase();
                        }
                }
        } else if (changeTo === "upper" || changeTo === "lower") {
                for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === "-" || arr[i] === "_" || arr[i] === " ") {
                                arr.splice(i, 1);
                                i--;
                        }
                }
                if (changeTo === "upper") {
                        for (let i = 0; i < arr.length; i++) {
                                arr[i] = arr[i].toUpperCase();
                        }
                } else {
                        for (let i = 0; i < arr.length; i++) {
                                arr[i] = arr[i].toLowerCase();
                        }
                }
        }
        return arr.join("");
}

// console.log(changeCase("-Example_string-with all-_ CASES__", "camel"));
// console.log(changeCase("-Example_string-with all-_ CASES__", "pascal"));
// console.log(changeCase("-Example_string-with all-_ CASES__", "snake"));
// console.log(changeCase("-Example_string-with all-_ CASES__", "kebab"));
// console.log(changeCase("-Example_string-with all-_ CASES__", "scream"));
// console.log(changeCase("-Example_string-with all-_ CASES__", "upper"));
// console.log(changeCase("-Example_string-with all-_ CASES__", "lower"));

/**
 * removes a character at the index given.
 * @param {string} str
 * @param {number} index
 * @returns {string}
 */
export function rmCharAt(str: string, index: number): string {
        return str.slice(0, index) + str.slice(index + 1);
}

/**
 * splice for strings
 * @param {string} string
 * @param {number} start
 * @param {number} deleteCount
 * @param {string} insertString
 * @returns {string}
 */
export function spice(string: string, start: number, deleteCount: number, insertString: string): string {
        return string.slice(0, start) + (insertString || "") + string.slice(start + (deleteCount || 0));
}

/**
 * adds strToAdd to str at index.
 * @param {string} str
 * @param {string} strToAdd
 * @param {number} index
 * @returns {string}
 */
export function addCharAt(str: string, strToAdd: string, index: number): string {
        return str.slice(0, index) + strToAdd + str.slice(index);
}

/**
 * Retrieves all items from local storage and updates the values in the provided object.
 * @param {object} lsItems - The object containing key-value pairs to be updated.
 * @returns {object} The `lsItems` object with updated values (if any).
 */
export function lsGetAll(lsItems: { [key: string]: string }): void {
        for (const key in lsItems) {
                lsItems[key] = localStorage.getItem(key) || lsItems[key];
        }
}

/**
 * Sets all key-value pairs in the provided object to the localStorage.
 * @param {object} lsItems - An object containing key-value pairs to be set in localStorage.
 * @returns {void}
 */
export function lsSetAll(lsItems: { [key: string]: string }): void {
        for (const key in lsItems) {
                localStorage.setItem(key, lsItems[key]);
        }
}

/**
 * Sets a key-value pair to the localStorage.
 * @param {string} lsKey - The key to set in localStorage.
 * @param {string} lsVal - The value to set in localStorage.
 * @returns {void}
 */
export function lsSet(lsKey: string, lsVal: string): void {
        localStorage.setItem(lsKey, lsVal);
}

/**
 * Gets the value associated with the provided key from localStorage.
 * @param {string} lsKey - The key to retrieve from localStorage.
 * @returns {string|null} - The value associated with the provided key, or null if the key is not found in localStorage.
 */
export function lsGet(lsKey: string): string | null {
        return localStorage.getItem(lsKey);
}

/**
 * Removes one or more classes from one or more elements in the DOM.
 *
 * @param {Array<Element>|Element} elements - The element(s) to remove classes from.
 * @param {string|string[]} classesToRemove - The class(es) to remove from the element(s).
 *
 * @example
 *
 * // Remove class "example" from all elements with class "container"
 * const containers = document.querySelectorAll('.container');
 * rmClasses(containers, 'example');
 *
 * // Remove classes "class1" and "class2" from a single element
 * const elem = document.querySelector('#my-element');
 * rmClasses(elem, ['class1', 'class2']);
 */
export function rmClasses(elements: Element | Element[] | null | undefined, classesToRemove: string | string[]): void {
        if (elements == undefined) return;
        const classes = Array.isArray(classesToRemove) ? classesToRemove : [classesToRemove];
        const elems = Array.isArray(elements) ? elements : [elements];

        for (let i = 0; i < elems.length; i++) {
                for (let j = 0; j < classes.length; j++) {
                        if (elems[i].classList.contains(classes[j])) {
                                elems[i].classList.remove(classes[j]);
                        }
                }
        }
}

/**
 * Adds one or more classes to one or more elements in the DOM.
 *
 * @param {Array<Element>|Element} elements - The element(s) to add classes to.
 * @param {string|string[]} classesToAdd - The class(es) to add to the element(s).
 *
 * @example
 *
 * // Add class "example" to all elements with class "container"
 * const containers = document.querySelectorAll('.container');
 * addClasses(containers, 'example');
 *
 * // Add classes "class1" and "class2" to a single element
 * const elem = document.querySelector('#my-element');
 * addClasses(elem, ['class1', 'class2']);
 */
export function addClasses(elements: Array<Element> | Element, classesToAdd: string | string[]) {
        const classes = Array.isArray(classesToAdd) ? classesToAdd : [classesToAdd];
        const elems = Array.isArray(elements) ? elements : [elements];

        for (let i = 0; i < elems.length; i++) {
                for (let j = 0; j < classes.length; j++) {
                        elems[i].classList.add(classes[j]);
                }
        }
}

/**
 * removes class of a given array of HTMLElements or one HTMLElement.
 * and adds class to every HTMLElement.
 * @param {Array<HTMLElement> | HTMLElement} elements
 * @param {string} classToRemove
 * @param {string} classToAdd
 * @returns {void}
 */
export function switchClass(elements: Array<HTMLElement> | HTMLElement, classToRemove: string, classToAdd: string): void {
        const elems = Array.isArray(elements) ? elements : [elements];

        for (let i = 0; i < elems.length; i++) {
                if (elems[i].classList.contains(classToRemove)) {
                        elems[i].classList.remove(classToRemove);
                }
                elems[i].classList.add(classToAdd);
        }
}

/**
 * Removes all elements from the DOM that match a given CSS selector.
 *
 * @param {string} querySelectorAll - The CSS selector to match elements to be removed.
 *
 * @example
 *
 * // Remove all elements with class "example"
 * rmAllElemsBy$$('.example');
 */
export function rmAllElemsBy$$(querySelectorAll: string): void {
        let allOccur = document.querySelectorAll(querySelectorAll);
        for (let i = 0; i < allOccur.length; i++) {
                allOccur[i].remove();
        }
}

/**
 * short version of getElementById
 * @param {string} id
 * @returns {HTMLElement}
 */
export function byId(id: string): HTMLElement | null {
        return document.getElementById(id);
}

export function byClassName(className: string): HTMLCollectionOf<HTMLElement> {
        return document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
}

/**
 * querySelector
 * @param {string} querySelector
 * @returns {HTMLElement}
 */
export function $(querySelector: string): HTMLElement | null {
        return document.querySelector(querySelector);
}

/**
 * querySelectorAll
 * @param {string} querySelectorAll
 * @returns {HTMLElement}
 */
export function $$(querySelectorAll: string): NodeListOf<Element> {
        return document.querySelectorAll(querySelectorAll);
}

/**
 * toLowerCase but better
 * @param {string} str
 * @returns {string}
 */
export function tolowercase(str: string): string {
        if (str === " ") return " ";
        if (str == null) return " ";
        return str.toLowerCase();
}

/**
 * check if a element isLastChild
 * @param {HTMLElement} el
 * @returns {boolean}
 */
export function isLastChild(el: HTMLElement): boolean {
        if (el.parentNode === null) return false;
        return el === el.parentNode.children[el.parentNode.children.length - 1];
}

/**
 * check if a element isFirstChild
 * @param {HTMLElement} el
 * @returns {boolean}
 */
export function isFirstChild(el: HTMLElement): boolean {
        if (el.parentNode === null) return false;
        return el === el.parentNode.children[0];
}

/**
 * `0 <= random <= n - 1`
 * @param {number} n
 * @returns {number}
 */
export function random(n: number): number {
        return Math.floor(Math.random() * n);
}

/**
 * turns string of rgb to array containing rgb values `[r, g, b]`
 * @param {string} string - rgb representaion of a color
 * @returns {Array<number>}
 * @example rgbToArray("rgb(189, 22, 89)") // [189, 22, 89]
 */
export function rgbToArray(string: string): number[] {
        const str: string[] = string.match(/\d+/g) ?? [];
        return str.map(Number);
}

/**
 *
 * @param {Array<number>} color1
 * @param {Array<number>} color2
 * @param {number} percent
 * @returns {Array<number>}
 */
export function betweenTwoColor(color1: number[], color2: number[], percent: number): number[] {
        let diff1 = Math.abs(color1[0] - color2[0]);
        let diff2 = Math.abs(color1[1] - color2[1]);
        let diff3 = Math.abs(color1[2] - color2[2]);

        let smaller1 = color1[0] > color2[0] ? color2[0] : color1[0];
        let smaller2 = color1[1] > color2[1] ? color2[1] : color1[1];
        let smaller3 = color1[2] > color2[2] ? color2[2] : color1[2];

        let sign1 = smaller1 === color2[0] ? -1 : 1;
        let sign2 = smaller2 === color2[1] ? -1 : 1;
        let sign3 = smaller3 === color2[2] ? -1 : 1;

        return [color1[0] + (sign1 * (diff1 * percent)) / 100, color1[1] + (sign2 * (diff2 * percent)) / 100, color1[2] + (sign3 * (diff3 * percent)) / 100];
}

/**
 * turns array containing rgb values to string `"rgb(r, g, b)"`
 * @param {Array<number>} arr
 * @returns {string}
 * @example arrayToRgb([222, 45, 88]); // "rgb(222, 45, 88)"
 */
export function arrayToRgb(arr: number[]): string {
        return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

/**
 * turns rgb array to hex string
 * @param {Array<number>} array
 * @returns {string}
 * @example rgbToHex([68, 419, 0]); // #44ff00
 */
export function rgbToHex(array: number[]): string {
        return "#" + ((1 << 24) + (array[0] << 16) + (array[1] << 8) + array[2]).toString(16).slice(1);
}

/**
 * (arrayDiff doesnt count duplicated elements as diff).
 * returns a array containing all values that array1 has and array2 doesnt and array2 has and array1 doesnt.
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 * @returns {Array<any>}
 * @example
 * let arr1 = [1, 2, 3, 0];
 * let arr2 = [1, 4, 3, 5, 2];
 * arrayDiff(arr1, arr2); // returns [0, 4, 5]
 */
export function arrayDiff(arr1: any[], arr2: any[]): any[] {
        let set = new Set(arr2);
        let diff = [];

        for (let i = 0; i < arr1.length; i++) {
                if (set.has(arr1[i])) {
                        set.delete(arr1[i]);
                } else {
                        diff.push(arr1[i]);
                }
        }
        for (let i of set) {
                diff.push(i);
        }

        return diff;
}

/**
 * removes duplicated values from an array.
 * @param {Array<any>} array
 * @returns {Array<any>}
 * @example
 * let array = [1, 2, 2, 3];
 * rmDuplicate(array); // returns [1, 2, 3]
 */
export function rmDuplicate(array: any[]): any[] {
        return [...new Set(array)];
}

/**
 * Returns an object containing elements with the given ID(s) that match a CSS selector.
 *
 * @param {string} querySelectorAll - The CSS selector to match elements.
 * @param {string|string[]} ids - The ID(s) of the element(s) to return.
 *
 * @returns {object|undefined} - An object containing the element(s) with the given ID(s), or undefined if no matching elements are found.
 *
 * @example
 *
 * // Get an object containing elements with IDs "elem1" and "elem2"
 * const elems = $$byIds('.example', ['elem1', 'elem2']);
 *
 * // Use the returned object to manipulate the elements
 * elems.elem1.classList.add('active');
 * elems.elem2.innerHTML = 'New content';
 */
export function $$byIds(querySelectorAll: string, ids: string | string[]): { [key: string]: Element } | undefined {
        const elements: { [key: string]: Element } = {};
        const idsArray = Array.isArray(ids) ? ids : [ids];

        document.querySelectorAll(querySelectorAll).forEach((elem) => {
                for (let i = 0; i < idsArray.length; i++) {
                        if (elem.id === idsArray[i]) {
                                elements[idsArray[i]] = elem;
                        }
                }
        });

        if (Object.keys(elements).length === 0) return undefined;

        return elements;
}

/**
 * Applies the given CSS rules to the specified element(s). without removing or duplicating old cssText.
 * (enter valid css like examples and dont put unnecessary semicolons like ";;")
 * @param {string} cssRulesString - The CSS rules to apply.
 * @param {(HTMLElement|HTMLElement[])} elementsArray - The element(s) to apply the CSS rules to.
 * @example
 * // Apply CSS rules to a single element
 * const element = document.getElementById("myElement");
 * cssToElements("color: red; font-size: 16px;", element);
 *
 * // Apply CSS rules to an array of elements
 * const elements = document.querySelectorAll(".myClass");
 * cssToElements("background-color: yellow; border: 1px solid black;", elements);
 */
export function cssToElements(cssRulesString: string, elementsArray: HTMLElement | HTMLElement[]): void {
        const elements = Array.isArray(elementsArray) ? elementsArray : [elementsArray];

        for (let i = 0; i < elements.length; i++) {
                let styleString = elements[i].style.cssText + cssRulesString;
                let style = styleString.split(/[:;]/g).filter((v) => v != "");

                for (let i = 0; i < style.length; i += 2) {
                        style[i] = style[i].trim();
                }
                for (let i = 0; i < style.length; i++) {
                        if (i % 2 === 1) continue;
                        for (let j = i + 2; j < style.length; j++) {
                                if (style[i] === style[j]) {
                                        style.splice(i, 2);
                                        i--;
                                        break;
                                }
                        }
                }
                for (let i = 0; i < style.length; i++) {
                        if (i % 2 === 0) {
                                style[i] += ":";
                        } else {
                                style[i] += ";";
                        }
                }

                elements[i].style.cssText = style.join("");
        }
}

/**
 * Replaces the CSS rules for the specified array of elements with the given CSS rule string.
 *
 * @param {string} cssRulesString - The CSS rule string to be applied to the elements.
 * @param {Array<HTMLElement>| HTMLElement} elementsArray - The array of HTML elements to be updated with the new CSS rules.
 */
export function cssToElementsReplace(cssRulesString: string, elementsArray: HTMLElement | HTMLElement[]): void {
        const elements = Array.isArray(elementsArray) ? elementsArray : [elementsArray];
        for (let i = 0; i < elements.length; i++) {
                elements[i].style.cssText = cssRulesString;
        }
}

/**
 * Adds the given CSS rule string to the existing CSS rules for the specified array of elements.
 *
 * @param {string} cssRulesString - The CSS rule string to be added to the elements' existing CSS rules.
 * @param {Array<HTMLElement> | HTMLElement} elementsArray - The array of HTML elements to be updated with the new CSS rules.
 */
export function cssToElementsAdd(cssRulesString: string, elementsArray: HTMLElement | HTMLElement[]) {
        const elements = Array.isArray(elementsArray) ? elementsArray : [elementsArray];
        for (let i = 0; i < elements.length; i++) {
                elements[i].style.cssText += cssRulesString;
        }
}

/**
 * Creates a deep copy of the given object or array using JSON serialization and deserialization.
 * @param {object|array} source - The object or array to copy.
 * @returns {object|array} A new object or array with the same properties and values as the source.
 */
export function deepCopy(source: object | any[]): object | any[] {
        return JSON.parse(JSON.stringify(source));
}

/**
 * Sets the display property of one or more HTML elements to "block".
 *
 * @param {HTMLElement[]|HTMLElement} elements - The HTML element(s) to modify.
 *
 * @example
 * // Set the display of all elements with class "my-element"
 * const myElements = document.querySelectorAll('.my-element');
 * displayBlock(myElements);
 *
 * // Set the display of a single element with ID "my-element"
 * const myElement = document.getElementById('my-element');
 * displayBlock(myElement);
 */
export function displayBlock(elements: HTMLElement[] | HTMLElement): void {
        const elems = Array.isArray(elements) ? elements : [elements];
        for (let i = 0; i < elems.length; i++) {
                elems[i].style.display = "block";
        }
}

/**
 * Sets the display property of one or more HTML elements to "none".
 *
 * @param {HTMLElement[]|HTMLElement} elements - The HTML element(s) to modify.
 *
 * @example
 * // Hide all elements with class "my-element"
 * const myElements = document.querySelectorAll('.my-element');
 * displayNone(myElements);
 *
 * // Hide a single element with ID "my-element"
 * const myElement = document.getElementById('my-element');
 * displayNone(myElement);
 */
export function displayNone(elements: HTMLElement | HTMLElement[]): void {
        const elems = Array.isArray(elements) ? elements : [elements];
        for (let i = 0; i < elems.length; i++) {
                elems[i].style.display = "none";
        }
}

/**
 * Sets the display property of one or more HTML elements to a specified value.
 *
 * @param {HTMLElement[]|HTMLElement} elements - The HTML element(s) to modify.
 * @param {string} displayString - The value to set the display property to.
 *
 * @example
 * // Set the display of all elements with class "my-element" to "block"
 * const myElements = document.querySelectorAll('.my-element');
 * setDisplay(myElements, 'block');
 *
 * // Hide a single element with ID "my-element"
 * const myElement = document.getElementById('my-element');
 * setDisplay(myElement, 'none');
 */
export function setDisplay(elements: HTMLElement | HTMLElement[], displayString: string): void {
        const elems = Array.isArray(elements) ? elements : [elements];
        for (let i = 0; i < elems.length; i++) {
                elems[i].style.display = displayString;
        }
}

/**
 * checks if element's display is set to block.
 * `element.style.display === "block"`
 * @param element
 * @returns
 */
export function isBlock(element: HTMLElement) {
        return element.style.display === "block";
}

/**
 * checks if element's display is set to none.
 * `element.style.display === "none"`
 * @param element
 * @returns
 */
export function isNone(element: HTMLElement) {
        return element.style.display === "none";
}

/**
 * sets opacity of 1 to a element or elements.
 * @param elements
 */
export function opacity_1(elements: HTMLElement | HTMLElement[]) {
        const elems = Array.isArray(elements) ? elements : [elements];
        for (let i = 0; i < elems.length; i++) {
                elems[i].style.opacity = "1";
        }
}

/**
 * sets opacity of 0 to a element or elements.
 * @param elements
 */
export function opacity_0(elements: HTMLElement | HTMLElement[]) {
        const elems = Array.isArray(elements) ? elements : [elements];
        for (let i = 0; i < elems.length; i++) {
                elems[i].style.opacity = "0";
        }
}

/**
 * sets given color to a element or elements.
 * @param elements
 * @param color
 */
export function color(elements: HTMLElement | HTMLElement[], color: string) {
        const elems = Array.isArray(elements) ? elements : [elements];
        for (let i = 0; i < elems.length; i++) {
                elems[i].style.color = color;
        }
}
