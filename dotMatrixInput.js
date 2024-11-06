// Define the DotMatrixInput class as an ES module
export class DotMatrixInput extends HTMLElement {
    constructor() {
        super();
        // Attach the shadow DOM in closed mode
        const shadowRoot = this.attachShadow({ mode: 'closed' }); // Store the reference

        this.maxDots = 500; // Set a limit on the maximum number of dots to display

        // Set the inner HTML of the shadow root
        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #eee;
                    padding: 10px;
                    border: 1px solid #888;
                    border-radius: 10px;
                }
                .dot-container {
                    margin-top: 10px;
                    display: grid;
                    grid-template-columns: repeat(10, 10px);
                    gap: 5px;
                }
                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: black;
                }
                .dot.ellipsis {
                    background-color: unset;
                    width: 10px;
                    height: 10px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            </style>
        `;

        // Create input element
        this.input = document.createElement('input');
        this.input.type = 'number';
        this.input.addEventListener('input', () => {
            this.updateMatrix();
            this.dispatchEvent(new Event('input')); // Dispatch input event
        });

        // Dispatch change event when the input loses focus
        this.input.addEventListener('change', () => {
            this.dispatchEvent(new Event('change'));
        });

        // Dispatch focus and blur events
        this.input.addEventListener('focus', () => {
            this.dispatchEvent(new Event('focus'));
        });

        this.input.addEventListener('blur', () => {
            this.dispatchEvent(new Event('blur'));
        });

        // Create container for dots
        this.dotContainer = document.createElement('div');
        this.dotContainer.classList.add('dot-container');

        // Append the input and dot container to the shadow root
        shadowRoot.append(this.input, this.dotContainer);
    }

    static get observedAttributes() {
        return ['value', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && oldValue !== newValue) {
            this.value = newValue;
        } else if (name === 'disabled') {
            this.input.disabled = this.hasAttribute('disabled');
        }
    }

    get value() {
        return parseInt(this.input.value, 10) || 0;
    }

    set value(val) {
        const intValue = parseInt(val, 10) || 0;
        if (intValue !== this.value) {
            this.input.value = intValue;
            this.updateMatrix();
            this.setAttribute('value', intValue);
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(isDisabled) {
        if (isDisabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    updateMatrix() {
        const value = this.value;
        const absValue = Math.abs(value);

        // Clear existing dots
        this.dotContainer.innerHTML = '';

        // Limit dots to the maximum defined by maxDots
        const dotsToDisplay = Math.min(absValue, this.maxDots);

        // Create dots and use a document fragment for efficient rendering
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < dotsToDisplay; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.backgroundColor = value < 0 ? 'red' : 'black';
            fragment.appendChild(dot);
        }

        // Add ellipsis if the number of dots exceeds the max limit
        if (absValue > this.maxDots) {
            const ellipsis = document.createElement('div');
            ellipsis.classList.add('dot', 'ellipsis');
            ellipsis.textContent = '…'; // Ellipsis symbol
            fragment.appendChild(ellipsis);
        }

        this.dotContainer.appendChild(fragment);

        // Update the attribute if it does not match
        if (value !== parseInt(this.getAttribute('value'), 10)) {
            this.setAttribute('value', value);
        }
    }
}

// Define the custom element
customElements.define('dot-matrix-input', DotMatrixInput);
