import { loadRemoteModule } from '@softarc/native-federation';
import * as rxjs from 'rxjs';
import * as sharedLib  from 'shared-lib';

const container = document.getElementById('container');
const flightsLink = document.getElementById('flights');
const homeLink = document.getElementById('home');

function removeFirstChild() {
    if (container.firstChild) {
        container.firstChild.remove();
    }
}

function displayWelcomeMessage() {
    removeFirstChild();
    container.innerHTML = `<h1>Welcome!</h1>`;
}

(async function() { 
   
    sharedLib.setData('Hello from the Shell!');

    displayWelcomeMessage();

    rxjs.fromEvent(flightsLink, 'click').subscribe(async _ => {
        
        const module = await loadRemoteModule({
            remoteName: 'mfe1',
            exposedModule: './component'
        });
        
        const elm = document.createElement(module.elementName);
        removeFirstChild();       
        container.appendChild(elm);
    });

    rxjs.fromEvent(homeLink, 'click').subscribe(_ => {
        displayWelcomeMessage();
    })

})();