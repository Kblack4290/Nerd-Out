

const editFormHandler = async (event) => {
event.preventDefault();

const title = document.querySelector('#floatingInput').value.trim();
const content = document.querySelector('#floatingTextarea2').value.trim();

if (title && content) {
    const response = await fetch (`/api/post/${id}`, {
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
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

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
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.edit-post-form')
    .addEventListener('submit',editFormHandler);