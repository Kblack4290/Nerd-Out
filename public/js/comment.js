
const commentFormHandler = async (event) => {
    console.log("click");
    event.preventDefault();

    const comment = document.querySelector('#floatingTextarea2').value.trim();
    const post_id = document.querySelector('#post-id').value.trim();



    if (comment && post_id) {

        const response =await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({comment, post_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
        if(response.ok) {
            document.location.replace(`/post/${post_id}`);
            console.log("hello");
        } else {
            alert('Failed to comment on post')
        }
    }


}

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);