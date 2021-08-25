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
wiev.setAttribute('id', 'levus-lightbox-wiev');

// create click-block for close
const backwrapper = document.createElement('div');
backwrapper.setAttribute('id', 'levus-lightbox-backwrapper');

// translateX
let translate = [];

for(let i = 0, length = images.length; i<length; i++){

    // temp var
    const img = images[i];

    // set data-attr
    img.dataset.id = i;

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

// close window
backwrapper.addEventListener('click', () => {

    // removed divs
    wiev.remove();
    backwrapper.remove();

    body.style.paddingRight = '';
    body.style.overflow = '';

    // reset translate array
    translateDefault();

    // flag set null
    insertFlag = false;

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

    console.log('innerHeight: ',innerHeight, 'innerWidth: ', innerWidth)

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

    wiev.innerHTML = returnFragment();

    // check gallery. render divs if gallery exists
    if(insertFlag === false){

        // якщо розмір десктопний 4:3, якщо мобільний 3:4?
        wiev.style.cssText = `
            width:${width}px;
            height:${height}px;
            top:calc(50% - ${height/2}px);
            left:calc(50% - ${width/2}px);
            overflow:hidden;
            position:fixed;
            z-index:3;`;

        // insert
        body.append(wiev);

        body.append(backwrapper);

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
}

function returnFragment(){

    // inline fragment for insert
    let fragment = '';
    
    for(let i = 0, length = images.length; i<length; i++){

        fragment += `<img src="${bigImages[i].href}" alt="" style="transform:translateX(${translate[i]}%);">`;
    }

    return fragment;
}


// test sizes
const tempArr = [];

let img = new Image();

img.onload = function() {
  console.log(img.width, img.height)

  for(let i = 0, length = images.length; i<length; i++){

    tempArr.push({num: i, width: img.width, height: img.height});
  }
};

for(let i = 0, length = images.length; i<length; i++){

    img.src = bigImages[i].href;
}

console.log(tempArr)




// TODO: close before mousedown 'esc'
// TODO: left and right scroll from keyboard