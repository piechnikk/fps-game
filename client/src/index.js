import './style.css';

import Main from './components/Main';

function init(data) {
    //div
    const container = document.getElementById('root');
    //main class object
    new Main(container, data);
}
function loadProject() {
    fetch("/load", { method: "post" }) // fetch
        .then(response => response.json())
        .then(data => {
            console.log(data);
            init(data.list);
        })

    console.log("fetch load");
}
loadProject();
