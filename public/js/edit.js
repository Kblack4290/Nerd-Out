

const editFormHandler = async (event) => {
event.preventDefault();

const title = document.querySelector('#floatingInput').value.trim();
const content = document.querySelector('#floatingTextarea2').value.trim();
const postId = document.querySelector('.postId').value
console.log(postId);
if (postId && title && content) {
    const response = await fetch (`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({title, content}),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert('DID NOT EDIT POST')
    }
}
};


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-postId')) {
        const id = event.target.getAttribute('data-postId');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};


document
    .querySelector('.edit-post-form')
    .addEventListener('submit',editFormHandler);
    
document
    .querySelector('.edit-post-form')
    .addEventListener('click', delButtonHandler);

