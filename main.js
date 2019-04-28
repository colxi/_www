import {Projects as _Projects} from './projects.js';
import './lib/css-global-variables.js';
import {Slider} from './lib/simple-slider.js'; // initial import to grant the inclusion of the CSS in header

let cssVar         = new CSSGlobalVariables();
let maxCardSize    = Number(cssVar.cardSize);

let Projects = _Projects;

let GUI = {
    cardsContainer       : document.getElementById("cardsContainer"),
    filterButton         : document.getElementById('filterButton'),
    filterCategoriesList : document.getElementById('filterCategoriesList'),
    filterCategoryDev    : document.getElementById('filterCategoryDev'),
    filterCategoryLib    : document.getElementById('filterCategoryLib'),
    filterCategoryDsgn   : document.getElementById('filterCategoryDsgn'),
    filterCategoryDraw   : document.getElementById('filterCategoryDraw'),
    projectContainer     : document.getElementById('projectContainer'),
    projectClose         : document.getElementById('projectClose'),
    projectContent       : document.getElementById('projectContent'),
}


let Category = {
    dev  : true,
    lib  : true,
    dsgn : true,
    draw : true
}

/* CATEGORY FILTERS GUI LISTENERS */
GUI.filterButton.addEventListener('click', ()=>{
    if( GUI.filterCategoriesList.hasAttribute('folded') ) GUI.filterCategoriesList.removeAttribute('folded');
    else GUI.filterCategoriesList.setAttribute('folded', true)
});

GUI.filterCategoryDev.addEventListener('click', ()=>{ 
    if( Category.dev ) GUI.filterCategoryDev.setAttribute('disabled', true);
    else GUI.filterCategoryDev.removeAttribute('disabled');
    Category.dev = !Category.dev;
    applyFilters();
});
GUI.filterCategoryLib.addEventListener('click', ()=>{ 
    if( Category.lib ) GUI.filterCategoryLib.setAttribute('disabled', true);
    else GUI.filterCategoryLib.removeAttribute('disabled');
    Category.lib = !Category.lib;
    applyFilters();
});
GUI.filterCategoryDsgn.addEventListener('click', ()=>{ 
    if( Category.dsgn ) GUI.filterCategoryDsgn.setAttribute('disabled', true);
    else GUI.filterCategoryDsgn.removeAttribute('disabled');
    Category.dsgn = !Category.dsgn;
    applyFilters();
});
GUI.filterCategoryDraw.addEventListener('click', ()=>{ 
    if( Category.draw ) GUI.filterCategoryDraw.setAttribute('disabled', true);
    else GUI.filterCategoryDraw.removeAttribute('disabled');
    Category.draw = !Category.draw;
    applyFilters();
});

function applyFilters(){
    Projects = [];
    for(let i=0;i<_Projects.length;i++){
        let project = _Projects[i];
        for(let c=0; c < project.categories.length; c++){
            let projectCategory = project.categories[c];
            if( !Category.hasOwnProperty(projectCategory) ) throw new Error('Unknown category found in project: '+ projectCategory)
            if( Category[projectCategory] === true ){ 
                Projects.push( project );
                break;
            }
        }
    }
    console.log( Projects )
    renderProjects();
}


//
GUI.projectClose.addEventListener('click', ()=>{ 
    GUI.projectContainer.setAttribute('folded', true); 
    document.body.removeAttribute('projectView');
    setTimeout( ()=>{ projectContent.innerHTML = '' } , 700 );
    updateGrid();
});

function updateGrid(){

    // If there is available space in the with of the container not
    // being used, it will expand or reduce the cell area in order to
    // fill all the available space. 
    // It will expand the cells when the increment does not make the cell
    // be bigger than the max allowed size, otherwise it will reduce
    // enought to fit another column, and fill al the free space 
    let containerWidth    = GUI.cardsContainer.getBoundingClientRect().width
    let currentSize       = Number(cssVar.cardSize);
    let columnsCount      = Math.floor(containerWidth / currentSize );
    let usedWidth         = currentSize * columnsCount;
    let availableWidth    = containerWidth - usedWidth;
    let potentialIncrease = Math.floor( availableWidth / columnsCount );
    // decide if enlarge or reduce
    if( currentSize === maxCardSize || currentSize + potentialIncrease > maxCardSize ){
        cssVar.cardSize =  Math.floor( containerWidth / (columnsCount+1) );
    }else{
        cssVar.cardSize = currentSize + potentialIncrease;
    }
}

window.onresize = function(){
    updateGrid();
};




function renderProjects(){
    GUI.cardsContainer.innerHTML = '';
    // render all the cards
    for(let i=0;i<Projects.length;i++){
        let card = document.createElement('div');
        // handle card click
        card.addEventListener('click',async ()=>{
            GUI.projectContainer.removeAttribute('folded');
            document.body.setAttribute('projectView', true);

            // fetch project description HTML
            let html = await (await fetch(`./projects/${Projects[i].URI}/index.html`) ).text();
            // insert HTML
            projectContent.innerHTML= html;
            // make script elements to execute (they are not executed when 
            // inserted using innerHTML )
            let scripts = projectContent.getElementsByTagName('script');
            for( let i=0; i<scripts.length; i++){
                let script = document.createElement('script');
                script.type = scripts[i].type;
                script.innerHTML = scripts[i].innerHTML;
                document.head.appendChild(script);
                document.head.removeChild(script);
            }
        });

        card.className = 'card';
        card.innerHTML = `
            <div class="cardImg" style="background-image:url(./projects/${Projects[i].URI}/thumbail.jpg)"></div>
            <div class="card-button">+</div>
            <div class="card-title">${Projects[i].title}</div>
        `;
        //card.style.backgroundImage = `url(./img/${Projects[i].thumbail})`;
        GUI.cardsContainer.appendChild(card);
    }
    updateGrid()
}



renderProjects()

/*

let last = 0
setInterval( ()=>{
    return;
    let next = Math.floor( Math.random()* GUI.cardsContainer.children.length );
    GUI.cardsContainer.children[last].removeAttribute('brightCard');
    GUI.cardsContainer.children[next].setAttribute('brightCard',true);
    last = next;
}, 400)


*/
