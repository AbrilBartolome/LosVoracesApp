async function getUserData() {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      credentials: 'include'
    });

    if (!res.ok) {
      window.location.href = 'login.html';
      return;
    }

    const user = await res.json();
    document.getElementById('username').textContent = user.username;
    document.getElementById('role-info').textContent = `Rol: ${user.role}`;

    if (user.role !== 'owner') {
      document.getElementById('management-section').style.display = 'none';
    }
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    window.location.href = 'login.html';
  }
}

async function logout() {
  await fetch(`${BACKEND_URL}/auth/logout`, {
    method: 'GET',
    credentials: 'include'
  });
  window.location.href = 'login.html';
}

getUserData();

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('librosLink').href = `${BACKEND_URL}/book/catalog`;
  document.getElementById('revistasLink').href = `${BACKEND_URL}/magazine/catalog`;
  document.getElementById('utilesLink').href = `${BACKEND_URL}/schoolSupply/catalog`;

  document.getElementById('ordenesLink').href = `${BACKEND_URL}/order`;
  document.getElementById('ventasLink').href = `${BACKEND_URL}/sale`;
  document.getElementById('proveedoresLink').href = `${BACKEND_URL}/supplier`;
});

