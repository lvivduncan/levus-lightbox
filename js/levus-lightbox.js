// 23-08-2021
const gallery = document.querySelectorAll('.levus-lightbox img');

const body = document.getElementsByTagName('body')[0];
body.style.position = 'relative';

// create full block
const wiev = document.createElement('div');
wiev.setAttribute('id', 'levus-full-image');
wiev.style.cssText = 'position:absolute;z-index:3;background:rgba(0,0,0,.2);top:0;left:0;width:100vw;height:100vh;display:none;';

// create block to click for close
const bg = document.createElement('div');
bg.setAttribute('id','levus-full-bg');
bg.style.cssText = 'position:absolute;z-index:2;top:0;left:0;width:100vw;height:100vh;display:none;';

// check gallery. render divs if gallery exists
if(gallery.length > 0){
    
    // insert
    body.append(wiev);
    body.append(bg);
}

gallery && gallery.forEach(image => {

    image.addEventListener('click', function(e) {
        e.preventDefault();

        // add fixed for body
        body.style.overflow = 'hidden';
        // wiev.classList.add('active');
        wiev.style.display = 'block';

        // add padding-right if sroll exists
        if(body.scrollHeight !== body.clientHeight){
            body.style.paddingRight = '15px';
        }

        console.log(this)
        console.log(this.parentNode)
        console.log(this.parentNode.href)


    });
});

document.addEventListener('click', e => {
    console.log(e, e.target)
});