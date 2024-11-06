
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const userTable = document.getElementById("userTable").querySelector("tbody");
    let users = []; // Array para armazenar os cadastros
    let editIndex = null; // Índice do usuário a ser editado

    // Função para renderizar a lista de usuários na tabela
    function renderUserTable() {
        userTable.innerHTML = ""; // Limpa a tabela
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.number}</td>
                <td>${user.gender}</td>
                <td>
                    <button onclick="editUser(${index})">Editar</button>
                    <button onclick="deleteUser(${index})">Excluir</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    // Função para cadastrar ou atualizar usuário
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Coleta os valores dos campos
        const user = {
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            number: document.getElementById("number").value,
            password: document.getElementById("password").value,
            gender: document.querySelector('input[name="gender"]:checked')?.value
        };

        // Validação simples
        if (!user.firstName || !user.lastName || !user.email || !user.number || !user.password || !user.gender) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (editIndex === null) {
            // Adiciona um novo usuário
            users.push(user);
        } else {
            // Atualiza um usuário existente
            users[editIndex] = user;
            editIndex = null;
        }

        renderUserTable(); // Renderiza a tabela com o novo cadastro
        form.reset(); // Limpa o formulário
    });

    // Função para editar um usuário
    window.editUser = function (index) {
        const user = users[index];
        document.getElementById("firstname").value = user.firstName;
        document.getElementById("lastname").value = user.lastName;
        document.getElementById("email").value = user.email;
        document.getElementById("number").value = user.number;
        document.getElementById("password").value = user.password;
        
        document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;
        
        editIndex = index;
    };

    // Função para deletar um usuário
    window.deleteUser = function (index) {
        users.splice(index, 1); // Remove o usuário do array
        renderUserTable(); // Atualiza a tabela
    };

    renderUserTable(); // Exibe a tabela vazia no início
});
