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
const arr = [];

for(let i = 0, length = images.length; i<length; i++){

    const img = images[i];

    // get full images
    arr.push(img.parentNode.href);

    img.addEventListener('click', function(e) {
        e.preventDefault();

        // add fixed for body
        body.style.overflow = 'hidden';

        // add padding-right if sroll exists
        if(body.scrollHeight !== body.clientHeight){
            // TODO: body.style.paddingRight = `${body.offsetWidth - body.clientWidth}px`;
            body.style.paddingRight = '15px';
        }

        render();

    });

}

// check insert divs
let insertFlag = false;

// temporary images elements
let fragment = new DocumentFragment();

// create full images
for(let i = 0, length = images.length; i<length; i++){

    const img = document.createElement('img');
    img.src = href[i].href;


    console.log(href[i].offsetHeight, href[i].offsetWidth)


    img.style.cssText = 'position:absolute;top:0;left:0;';

    // last element set -100
    if(i === length-1){
        
        img.style.cssText = 'transform:translateX(-100%)';
    } else {
        
        img.style.cssText = `transform:translateX(${i * 100}%)`;
    }

    fragment.append(img);
}

document.addEventListener('click', e => {

    if(e.target.id === 'levus-bg'){

        // removed divs
        wiev.remove();
        bg.remove();

        body.style.paddingRight = '';
        body.style.overflow = '';

        // flag set null
        insertFlag = false;
    }
});


// not exists! TODO: used event!
wiev.querySelectorAll('img').forEach(img => {
    console.log('wiev img')

    img.addEventListener('click', function() {
        console.log(this);
    });
});

// wiev full image
function render(){

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




// TODO: close before mousedown 'esc'
// TODO: left and right scroll from keyboard