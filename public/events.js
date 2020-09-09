window.addEventListener('DOMContentLoaded', (e) => {

    fetch('/kitten/image')
        .then(res => {
            console.log(res);
            if (!res.ok) {
                throw Error(res);
            }
            return res.json();
        })
        .then(data => {
            let pic = document.querySelector('.cat-pic')
            // console.log(data)
            pic.src = data.src
        })
        .catch(err => {
            document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
            // alert("Something went wrong! Please try again.")
        });

    document.getElementById('new-pic')
        .addEventListener('click', () => {
            document.querySelector('.loader').innerHTML = 'loading'
            document.querySelector('.error').innerHTML = ""

            fetch('/kitten/image')
                .then(res => {
                    if (!res.ok) {
                        throw Error(res);
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
                    document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
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
            body: JSON.stringify({"comment": userComment.value})
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(res);
                }
                return res.json();

            })
            .then(data => {
                console.log(data)


            })
            .catch(err => {
                document.querySelector('.error').innerHTML = "Something went wrong! Please try again."
            })


    })
})
