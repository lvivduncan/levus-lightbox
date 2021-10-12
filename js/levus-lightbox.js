// 8-09-2021

// TODO: вибірка тільки з 1 галереї

{
    const allLightboxs = document.querySelectorAll('.levus-lightbox');

    allLightboxs && allLightboxs.forEach(item => {
        
        // get parent tag
        const body = document.getElementsByTagName('body')[0];
        
        // get all links        
        const gallery = item.querySelectorAll('a');

        // quantity
        const length = gallery.length;

        // create translate array
        const translate = [];

        // create elements array
        const elements = [];

        // temp container for lightbox elements 
        let insertData = '';

        // opacity current element
        let opacity = 0;
        
        // create lightbox div
        const lightbox = document.createElement('div');
        lightbox.id = 'levus-lightbox';
        
        // set transitions
        setTransition();

        // set data to arrays
        gallery.forEach((element, i) => {

            // set elements
            elements.push({
                alt: gallery[i].title,
                src: gallery[i].href
            });

            // event
            element.addEventListener('click', function(event){

                // because click to link
                event.preventDefault();

                openLightbox(i);
            });
        });

        // close lightbox
        lightbox.addEventListener('click', event => {

            if(event.target.tagName === 'PICTURE'){

                closeLightbox();
            }
        });

        document.addEventListener('keydown', event => {
            
            // close lightbox
            if(event.key === 'Escape' || event.code === 'Escape'){

                closeLightbox();
            }

            // to left
            if(event.key === 'ArrowLeft' || event.code === 'ArrowLeft'){

                const first = translate.pop();
                translate.unshift(first);
            }

            // to right
            if(event.key === 'ArrowRight' || event.code === 'ArrowRight'){
                
                const last = translate.shift();
                translate.push(last);
            }

            const newPictures = document.querySelectorAll('#levus-lightbox picture');

            for(let i = 0; i < length; i++){

                if(translate[i] === 0){

                    opacity = 1;
                } else {
                    
                    opacity = 0;
                }

                newPictures[i] && (newPictures[i].style.transform = `translateX(${translate[i]}%)`);
                newPictures[i] && (newPictures[i].style.opacity = opacity);
            }
        });

        // touch variables
        let flag = false;
        let start = 0;
        let finish = 0;
        let shift = 0;

        document.addEventListener('pointerdown', pointerDown);
        document.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
        document.addEventListener('pointercancel', pointerUp);

        function pointerDown(event){

            if(event.target.classList.contains('levus-lightbox-picture')){

                flag = true;

                event.target.classList.add('touch');

                start = event.pageX;
            }
        }

        function pointerMove(event){

            if(event.target.classList.contains('levus-lightbox-picture')){

                const el = event.target.parentNode;

                if(flag === true){
                
                    finish = event.pageX;

                    // if to left
                    if(finish - start < 0){

                        shift = (finish - start) / 2;
                    } 
                    
                    // if to right
                    if(finish - start > 0) { 

                        shift = Math.abs(start - finish) / 2;
                    }

                    el.style.transform = `translateX(${shift}%)`;
                }
            }
        }

        function pointerUp(event){

            if(flag === true){

                if(finish - start < 0){

                    // manipulation translate[]
                    const first = translate.pop();
                    translate.unshift(first);
                } 
                
                // if to right
                if(finish - start > 0) { 

                    // manipulation translate[]
                    const last = translate.shift();
                    translate.push(last);
                }

                event.target.classList.remove('touch');

                const newPictures = document.querySelectorAll('#levus-lightbox picture');

                for(let i = 0; i < length; i++){

                    if(translate[i] === 0){

                        opacity = 1;
                    } else {
                        
                        opacity = 0;
                    }

                    newPictures[i].style.transform = `translateX(${translate[i]}%)`;
                    newPictures[i].style.opacity = opacity;
                }

            }

            flag = false;
        }

        // open lightbox after click
        function openLightbox(i){

            // test
            insertData = '';

            // check i
            if(i!==0){

                // loop
                const crop = translate.splice(0,length - i);
                translate.push(...crop);
            }

            for(let i = 0; i < length; i++){

                if(translate[i] === 0){

                    opacity = 1;
                } else {
                    
                    opacity = 0;
                }

                // create full element
                insertData += `
                    <picture style="transform:translateX(${translate[i]}%);opacity:${opacity}">
                        <img 
                            src="${elements[i].src}" 
                            alt="${elements[i].alt}" 
                            draggable="false" 
                            class="levus-lightbox-picture">
                    </picture>`;                
            }

            // prepared data to insert to body
            lightbox.innerHTML = insertData;

            // isert data to body
            body.append(lightbox);

            setTimeout(() => {
                
                lightbox.className = 'active';
            }, 60);
        }

        // close lightbox
        function closeLightbox(){

            setTimeout(() => {
        
                lightbox.classList.remove('active');
            }, 60);
        
            setTimeout(() => {
                
                lightbox.remove();
            }, 480); 

            // clear lightbox content
            insertData = '';

            // set default data
            setTransition();
        }

        function setTransition(){

            // clear lightbox content
            // insertData = '';

            translate.length = 0;

            for(let i = 0; i < length; i++){

                if(i === length-1){
    
                    translate.push(-100);
                } else {
    
                    translate.push(i * 100);
                }
            }
        }
    });
}

// 12-09-2021

// TODO: баг, якщо був скрол -- тоді галерею відкриває нe з того зображення, на яке клікнули