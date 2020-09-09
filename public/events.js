window.addEventListener('DOMContentLoaded', (e)=>{

    fetch('https://thecatapi.com/')
        .then(res => {
            return res.json();

        })
        .then(data =>{
            let pic = document.querySelectorAll('cat-pic')
            pic.src = data.src
        })













})

