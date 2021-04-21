
const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.query('#floatingTextarea2').value.trim();
    const post_id = document.querySelector('#post-id').value.trim();


    if (comment && post_id) {

        const response =await  fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({comment, post_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to comment on post')
        }
    }


}

document
    .querySelector('.comment-form')
    .addEventListener('.comment-btn', commentFormHandler);