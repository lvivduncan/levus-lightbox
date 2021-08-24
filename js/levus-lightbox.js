// 23-08-2021

// 1 gallery. TODO: all gallery
const gallery = document.querySelector('.levus-lightbox');

// links to full image
const bigImages = gallery.querySelectorAll('a');

// small images
const images = gallery.querySelectorAll('img');

const body = document.getElementsByTagName('body')[0];
body.style.position = 'relative';

// create full block
const wiev = document.createElement('div');
wiev.setAttribute('id', 'levus-full');
// wiev.style.cssText = 'position:fixed;z-index:3;max-width:95%;height:auto;display:block;overflow:hidden;';

// create block to click for close
const bg = document.createElement('div');
bg.setAttribute('id', 'levus-bg');
bg.style.cssText = 'position:fixed;z-index:2;background:rgba(0,0,0,.3);top:0;left:0;width:100vw;height:100vh;display:block;';

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

// check fragment 
let fragmentFlag = false;

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

// set window height 
let innerHeight = window.innerHeight;

// set window widht
let innerWidth = window.innerWidth;

// set new numbers
window.addEventListener('resize', () => {

    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;
});

// wiev full image
function render(self){

    console.log(innerHeight, innerWidth)

    // TODO: widht and height proportions
    let width = innerWidth - 40; // 40 -- padding
    let height = innerHeight - 40; // 40 -- padding

    // item id
    const id = self.dataset.id;

    // TODO: shift() and push()
    for(let i = 0; i < id; i++){
        let first = translate.pop(i);
        translate.unshift(first);
    }

    // temporary images elements
    const fragment = new DocumentFragment();

    if(fragmentFlag === false){

        // create full images
        for(let i = 0, length = images.length; i<length; i++){

            const img = document.createElement('img');
            img.src = bigImages[i].href;

            // set default options
            img.style.cssText = `
                position:absolute;
                top:0;
                left:0;
                width:${width}px;
                height:${height}px;
                object-fit:cover;
                transform:translateX(${translate[i]}%);`;

            // set data-attr (del?)
            img.dataset.id = i;

            fragment.append(img);

            // insert full images after click
            wiev.append(fragment);
        }        

        fragmentFlag = true;
    }

    // check gallery. render divs if gallery exists
    if(insertFlag === false){

        // якщо розмір десктопний 4:3, якщо мобільний 3:4?
        wiev.style.cssText = `width:800px;height:600px;top:calc(50% - 300px);left:calc(50% - 400px);overflow:hidden;position:fixed;z-index:3;`;

        // insert
        body.append(wiev);

        body.append(bg);

        insertFlag = true;
    }

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

    console.log(translate)
}

// TODO: close before mousedown 'esc'
// TODO: left and right scroll from keyboard