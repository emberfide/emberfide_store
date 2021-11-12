// handel choose gallery img
const galleryImgs = document.querySelectorAll('.upload-gallery-img');

for(let i=0; i < galleryImgs.length; i++){
        galleryImgs[i].addEventListener('click', function(e){
            if(e.shiftKey){
                this.classList.add('active-gallery-img');   
            }
            else{
                const galleryImgActive = document.querySelectorAll('.active-gallery-img');
                if(galleryImgActive.length > 0){
                    for(let j=0; j < galleryImgActive.length; j++){
                        galleryImgActive[j].classList.remove('active-gallery-img');
                        this.classList.add('active-gallery-img');   
                    }
                }
                else{
                    this.classList.add('active-gallery-img');   
                }
            }
        });   
    }  
// import gallery img
document.querySelector('.import-gallery-img').onclick = function() {
    document.querySelector('.input-gallery-img').innerHTML = '';
    const active = document.querySelectorAll('.active-gallery-img img');
    var input = [];
    for(let i=0; i < active.length; i++){
        input[i] =  document.createElement('input');
        input[i].value = active[i].attributes.src.value;
        input[i].name = `urlImgGallery[]`;
        document.querySelector('.input-gallery-img').appendChild(input[i]);
    }
    // document.querySelector('.url-img').value = mutiImg;
    document.querySelector('.close-upload-gallery-img').click();
}

// handel choose  img

const imgs = document.querySelectorAll('.upload-img');

for(let i=0; i < imgs.length; i++){
        imgs[i].addEventListener('click', function(e){
            const active = document.querySelectorAll('.active-img');
            if(active.length > 0){
                for(let j=0; j < active.length; j++){
                    active[j].classList.remove('active-img');
                    this.classList.add('active-img');   
                }
            }
            else{
                this.classList.add('active-img');   
            }
        });   
    }  
// import img

document.querySelector('.import-img').onclick = function() {
    document.querySelector('.input-img').innerHTML = '';
    const active = document.querySelector('.active-img img');
    const input =  document.createElement('input');
    input.value = active.attributes.src.value;
    input.name = `urlImg`;

    document.querySelector('.input-img').appendChild(input);
    document.querySelector('.close-upload-img').click();
}
//handle choose img attribute advanced
const attributeImg = document.querySelectorAll('.attribute-advanced-img');
for(let i=0; i < attributeImg.length; i++){
        attributeImg[i].addEventListener('click', function(e){
            const activeAttribute = document.querySelectorAll('.active-attribute-img');
            if(activeAttribute.length > 0){
                for(let j=0; j < activeAttribute.length; j++){
                    activeAttribute[j].classList.remove('active-attribute-img');
                    this.classList.add('active-attribute-img');   
                }
            }
            else{
                this.classList.add('active-attribute-img');   
            }
        });   
    }
//handle import img attribute avanced
document.querySelector('.import-attribute-avanced-img').onclick = function() {
    var index = document.querySelector('.import-attribute-avanced-img').getAttribute('data-index');
    const active = document.querySelector('.active-attribute-img img');
    document.querySelectorAll('.input-url-img-attriibute')[index].value = active.attributes.src.value;
    document.querySelectorAll('.choose-img-information-advanced')[index].src = active.attributes.src.value;

    document.querySelector('.img-avanced-modal-close').click();
}

 



