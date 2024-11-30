document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const response = await fetch('/login', {
        method: 'POST',
        body: formData
    });

    const messageDiv = document.getElementById('message');
    if (response.ok) {
        messageDiv.textContent = 'Logado com sucesso';
        messageDiv.style.color = 'green';
        setTimeout(() => {
            window.location.href = '/';
        }, 5000);
    } else {
        const errorMessage = await response.text();
        messageDiv.textContent = errorMessage;
        messageDiv.style.color = 'red';
    }
});