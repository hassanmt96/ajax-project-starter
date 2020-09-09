window.addEventListener('DOMContentLoaded', (e)=>{

    fetch('/kitten/image')
        .then(res => {
            console.log(res);
            if(!res.ok){
                throw Error(res);
            }
            return res.json();
        })
        .then(data =>{
            let pic = document.querySelector('.cat-pic')
            // console.log(data)
            pic.src = data.src
        })
        .catch(err => {
            document.querySelector('.error').innerHTML ="Something went wrong! Please try again."
            // alert("Something went wrong! Please try again.")
        });

document.getElementById('new-pic')
        .addEventListener('click', ()=>{
            document.querySelector('.loader').innerHTML= 'loading'
            document.querySelector('.error').innerHTML =""

            fetch('/kitten/image')
            .then(res => {
                if(!res.ok){
                    throw Error(res);
                }
                return res.json();
            })
            .then(data =>{
                let pic = document.querySelector('.cat-pic')
                // console.log(data)
                pic.src = data.src
                document.querySelector('.loader').innerHTML= ''
            })
            .catch(err => {
                document.querySelector('.error').innerHTML ="Something went wrong! Please try again."
                // alert("Something went wrong! Please try again.")
            });
    })




})
