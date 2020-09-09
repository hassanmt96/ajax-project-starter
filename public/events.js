window.addEventListener('DOMContentLoaded', (e)=>{
   
    fetch('/kitten/image')
        .then(res => {
            return res.json();

        })
        .then(data =>{
            let pic = document.querySelector('.cat-pic')
            console.log(data)
            pic.src = data.src
        })
document.getElementById('new-pic')
        .addEventListener('click', ()=>{
            document.querySelector('.loader').innerHTML= 'loading'

            fetch('/kitten/image')
            .then(res => {
                return res.json();
    
            })
            .then(data =>{
                let pic = document.querySelector('.cat-pic')
                console.log(data)
                pic.src = data.src
                document.querySelector('.loader').innerHTML= ''
        })




    })







})



