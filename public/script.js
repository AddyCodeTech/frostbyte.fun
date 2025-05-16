document.getElementById('post-button').addEventListener('click', () => {
    const postContent = document.getElementById('new-post').value;
    if (postContent) {
        const postDiv = document.createElement('div');
        postDiv.className = 'bg-white p-4 rounded shadow';
        postDiv.innerHTML = `
            <h4 class="text-xl font-semibold">New Post</h4>
            <p>${postContent}</p>
            <button class="text-blue-600 hover:underline">Comment</button>
        `;
        document.getElementById('posts').prepend(postDiv);
        document.getElementById('new-post').value = '';
    }
});