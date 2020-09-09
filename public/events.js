window.addEventListener('DOMContentLoaded', (e) => {

    fetch('/kitten/image')
        .then(res => {
            // console.log(res);
            if (!res.ok) {
                // console.log(new Error(res));
                throw res
            }
            return res.json();
        })
        .then(data => {
            let pic = document.querySelector('.cat-pic')
            // console.log(data)
            pic.src = data.src
        })
        .catch(err => {
            err.json()
                .then(data => {
                    // console.log(data)
                    document.querySelector('.error').innerHTML = data.message;
                })
            // console.log(err);
            // alert("Something went wrong! Please try again.")
        });

    document.getElementById('new-pic')
        .addEventListener('click', () => {
            document.querySelector('.loader').innerHTML = 'loading'
            document.querySelector('.error').innerHTML = ""

            fetch('/kitten/image')
                .then(res => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                .then(data => {
                    let pic = document.querySelector('.cat-pic')
                    // console.log(data)
                    pic.src = data.src
                    document.querySelector('.loader').innerHTML = ''
                })
                .catch(err => {
                    err.json()
                        .then(data => {
                            document.querySelector('.error').innerHTML = data.message;
                        })
                    // document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
                    // alert("Something went wrong! Please try again.")
                });
        })

    document.getElementById('upvote')
        .addEventListener('click', () => {
            fetch('/kitten/upvote', { method: 'PATCH' })
                .then(res => {
                    if (!res.ok) {
                        throw Error(res);
                    }
                    return res.json();

                })
                .then(data => {
                    let score = document.querySelector('.score').innerHTML = data.score
                })
                .catch(err => {
                    document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
                })
        })

    document.getElementById('downvote')
        .addEventListener('click', () => {
            fetch('/kitten/downvote', { method: 'PATCH' })
                .then(res => {
                    if (!res.ok) {
                        throw Error(res);
                    }
                    return res.json();

                })
                .then(data => {
                    let score = document.querySelector('.score').innerHTML = data.score
                })
                .catch(err => {
                    document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
                })
        })

    let form = document.querySelector('.comment-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let userComment = document.getElementById('user-comment')
        fetch('/kitten/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "comment": userComment.value })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(res);
                }
                return res.json();

            })
            .then(data => {
                let commentsDiv = document.querySelector(".comments");
                // console.log(data);
                // console.log(commentsDiv)
                finalString = '';
                data.comments.forEach(el => {
                    finalString += `<div>${el} <button class="delete">DELETE</button> </div>`
                    // finalString += `<ul id=${el}>${el}</ul> <button class='delete' id='${el}>DELETE</button>`;
                })
                // console.log(finalString)
                commentsDiv.innerHTML = finalString;

                let nodeList = document.querySelectorAll('.delete')
                nodeList.forEach(el =>{
                    el.addEventListener("click", e => {
                        // console.log(e.target.parentNode)
                        let removed = e.target.parentNode

                        // let removedText = removed.innerText;
                        // // console.log(removedText)
                        // let searchText = removedText.slice(0, removedText.length - 7)
                        // // console.log(searchText)
                        // for(let i = 0; i < data.comments.length; i++){
                        //     if(data.comments[i] === searchText){
                        //         data.comments.splice(i)
                        //     }
                        // }
                        // console.log(data.comments)
                        removed.remove();
                    })
                })


            })
            .catch(err => {
                document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
            })


    })

})
