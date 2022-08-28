// static imports do currently not work with shared libs,
// hence the dynamic one inside an async IIFE below
import * as rxjs from 'rxjs';
import * as sharedLib from 'shared-lib';

const sharedData = sharedLib.getData();

class Microfrontend1 extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {

        this.shadowRoot.innerHTML = `
            <div id="container">
                <h1>Flights</h1>
                <div>
                    Message: ${sharedData}
                </div>
                <div>
                    <input type="text" placeholder="From">
                </div>
                <div>
                    <input type="text" placeholder="To">
                </div>
                <div>
                    <button id="search">Search</button>
                    <button id="terms">Terms...</button>
                </div>
            </div>
        `;

        const search = this.shadowRoot.getElementById('search');
        const terms = this.shadowRoot.getElementById('terms');
        const container = this.shadowRoot.getElementById('container');

        // const rxjs = await require('rxjs');
        rxjs.fromEvent(search, 'click').subscribe(_ => {
            alert('Not implemented for this demo!');
        });

        rxjs.fromEvent(terms, 'click').subscribe(async _ => {
            const module = await import('./lazy');
            const elm = document.createElement(module.elementName);
            container.appendChild(elm);
        });

    }
}

const elementName = 'microfrontend-one';
customElements.define(elementName, Microfrontend1);

export { elementName };