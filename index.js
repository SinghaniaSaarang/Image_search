const accesskey='';
const searchform=document.querySelector('form');
const searchinput=document.getElementById('inputsearchbar');
const imagecontainer=document.getElementById('imagecontainer');
const loadmore=document.getElementById('loadmore');
let pageno=1;


searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputfield=searchinput.value.trim();
    imagecontainer.style='height: auto;overflow:hidden;';
    loadmore.style.display='none';
    imagecontainer.innerHTML='Loading';
    if(inputfield.length>0){
        pageno=1;
        setTimeout(()=>{
            fetchimage(inputfield,pageno);
        },1000);
    }else{
        setTimeout(()=>{
            // imagecontainer.style='height: auto;overflow:hidden;';
            imagecontainer.innerHTML='No data';
        },1000);
        
    }

})

async function fetchimage(query,pageno){

    const url=`https://api.unsplash.com/photos/?query=${query}&per_page=28&page=${pageno}&client_id=${accesskey}`;
    await fetch(url).then((data)=>data.json()).then(value=>{
        console.log(value);
        if(pageno==1){
            imagecontainer.innerHTML='';
            imagecontainer.style='height: 52vh;overflow-y:scroll;';
            loadmore.style.display='block';
        }

        if(value.length<28){
            loadmore.style.display='none';
        }
        value.forEach(photo=>{
            const imageElement=document.createElement('div');
            imageElement.classList.add('imagediv');
            imageElement.innerHTML=`<img src=${photo.urls.regular}>`;

            const overlayElement=document.createElement('div');
            overlayElement.classList.add('overlaydiv');

            const overlaytext=document.createElement('h3');
            overlaytext.innerText=`${photo.alt_description}`;
            overlayElement.appendChild(overlaytext);

            imageElement.appendChild(overlayElement);

            imagecontainer.appendChild(imageElement);
        });
    }).catch((error)=>{
        console.log(error);
        loadmore.style.display='none';
    })


    //console.log(query);
}

loadmore.addEventListener('click',()=>{
    const inputfield=searchinput.value.trim();
    fetchimage(inputfield,++pageno);
})
