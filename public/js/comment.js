
const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.query('.comment-content').value.trim();
    const post_id = document.querySelector('.post-list').value.trim();


    if (comment && post_id) {

        const response =await  fetch(`/api/comments`, {
            method: 'post',
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

// document
//     .querySelector('.')
//     .addEventListener('.post-list', commentFormHandler);