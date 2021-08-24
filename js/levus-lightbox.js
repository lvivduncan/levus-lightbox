// 23-08-2021

// 1 gallery. TODO: all gallery
const gallery = document.querySelector('.levus-lightbox');

// links to full image
const href = gallery.querySelectorAll('a');

// small images
const images = gallery.querySelectorAll('img');

const body = document.getElementsByTagName('body')[0];
body.style.position = 'relative';

// create full block
const wiev = document.createElement('div');
wiev.setAttribute('id', 'levus-full');
wiev.style.cssText = 'position:absolute;z-index:3;max-width:95%;height:auto;display:block;overflow:hidden;';

// create block to click for close
const bg = document.createElement('div');
bg.setAttribute('id', 'levus-bg');
bg.style.cssText = 'position:absolute;z-index:2;background:rgba(0,0,0,.3);top:0;left:0;width:100vw;height:100vh;display:block;';

// array with full images
const elements = [];

// translateX
let translate = [];

for(let i = 0, length = images.length; i<length; i++){

    // temp var
    const img = images[i];

    // fill full images
    elements.push(img.parentNode.href);

    // set data-attr
    images[i].dataset.id = i;

    img.addEventListener('click', function(event) {
        event.preventDefault();

        // add fixed for body
        body.style.overflow = 'hidden';

        // add padding-right if sroll exists
        if(body.scrollHeight !== body.clientHeight){
            // TODO: body.style.paddingRight = `${body.offsetWidth - body.clientWidth}px`;
            body.style.paddingRight = '15px';
        }

        // e.target change to this
        // render(event);
        render(this);
    });

}

translateDefault();

// check insert divs
let insertFlag = false;

/* // temporary images elements
const fragment = new DocumentFragment();

// create full images
for(let i = 0, length = images.length; i<length; i++){

    const img = document.createElement('img');
    img.src = href[i].href;

    // set default options
    img.style.cssText = 'position:absolute;top:0;left:0;';

    // set translate 
    img.style.cssText = `transform:translateX(${translate[i]}%)`;

    // set data-attr
    img.dataset.id = i;

    fragment.append(img);
} */

document.addEventListener('click', event => {

    if(event.target.id === 'levus-bg'){

        // removed divs
        wiev.remove();
        bg.remove();

        body.style.paddingRight = '';
        body.style.overflow = '';

        // reset translate array
        translateDefault();

        // flag set null
        insertFlag = false;
    }
});


// wiev full image
function render(self){

    // item id
    const id = self.dataset.id;

    // TODO: shift() and push()
    for(let i = 0; i < id; i++){
        let first = translate.pop(i);
        translate.unshift(first);
    }

    // temporary images elements
    const fragment = new DocumentFragment();

    // create full images
    for(let i = 0, length = images.length; i<length; i++){

        const img = document.createElement('img');
        img.src = href[i].href;

        // set default options
        img.style.cssText = 'position:absolute;top:0;left:0;width:800px;height:600px;object-fit:cover;';

        // set translate 
        img.style.transform = `translateX(${translate[i]}%)`;

        // set data-attr
        img.dataset.id = i;

        fragment.append(img);
    }

    // check gallery. render divs if gallery exists
    if(insertFlag === false){

        // insert
        body.append(wiev);

        // TODO: params width from the picture
        // temp
        wiev.style.width = '800px';
        wiev.style.height = '600px';
        wiev.style.top = 'calc(50% - 300px)';
        wiev.style.left = 'calc(50% - 400px)';

        body.append(bg);

        insertFlag = true;
    }

    // insert full images after click
    wiev.append(fragment);
}

// fill default data and reset
function translateDefault(){
    translate = [];
        
    for(let i = 0, length = images.length; i<length; i++){
    
        // fill transform 
        if(i === length-1){
            
            translate.push(-100);
        } else {
    
            translate.push(i * 100);
        }
    }
}



// TODO: close before mousedown 'esc'
// TODO: left and right scroll from keyboard