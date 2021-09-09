// 8-09-2021

const elements = document.querySelectorAll('.levus-lightbox a');
const length = elements.length;
const body = document.getElementsByTagName('body')[0];

const lightbox = document.createElement('div');
lightbox.id = 'levus-lightbox';

const wrapper = document.createElement('div');
wrapper.id = 'levus-lightbox-wrapper';

const picture = document.createElement('picture');
lightbox.append(picture, wrapper);

const img = document.createElement('img');

for(let i = 0; i < length; i++){
    
    elements[i].addEventListener('click', event => {
        event.preventDefault();
        
        img.alt = elements[i].title;
        img.src = elements[i].href;

        setTimeout(() => {
            
            lightbox.classList.add('active');
        }, 60);
    });
}

picture.append(img);
body.append(lightbox);

wrapper.addEventListener('click', closeLightbox);

document.addEventListener('keydown', event => {

    if(event.key == 'Escape' || event.code == 'Escape'){

        closeLightbox();
    }
});

function closeLightbox(){
    setTimeout(() => {
        
        lightbox.classList.remove('active');
    }, 60);
}

// TODO: body fixed, swipe slides
// TODO: array elements


/*

pointerdown
pointermove
pointerup

*/
