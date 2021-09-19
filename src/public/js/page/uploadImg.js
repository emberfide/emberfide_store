// handel choose img
const imgs = document.querySelectorAll('.upload-img');



for(let i=0; i < imgs.length; i++){
        imgs[i].addEventListener('click', function(e){
            if(e.shiftKey){
                console.log('press shift');
                this.classList.add('active-img');   
            }
            else{
                const active = document.querySelectorAll('.active-img');
                console.log('click');
                if(active.length > 0){
                    for(let j=0; j < active.length; j++){
                        active[j].classList.remove('active-img');
                        this.classList.add('active-img');   
                    }
                }
                else{
                    this.classList.add('active-img');   
                }
            }
        });   
    }  
// import img
document.querySelector('.import-img').onclick = function() {
    console.log('click import');
    document.querySelector('.input-img').innerHTML = '';
    const active = document.querySelectorAll('.active-img img');
    var input = [];
    // let mutiImg = '';
    for(let i=0; i < active.length; i++){
        input[i] =  document.createElement('input');
        input[i].value = active[i].attributes.src.value;
        input[i].name = `urlImg${i}`;
        document.querySelector('.input-img').appendChild(input[i]);
    }
    // document.querySelector('.url-img').value = mutiImg;
    document.querySelector('.close-upload-img').click();
}




