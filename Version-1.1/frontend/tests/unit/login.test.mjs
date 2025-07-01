// Test unitarios para el Login

/**
 * @jest-environment jest-environment-jsdom
 */

import { handleLogin } from "../../js/login.js";

// Mock de fetch, alert y location para controlarlos con los tests
global.fetch = jest.fn();
global.alert = jest.fn();
delete window.location;
window.location = { href: '' };

beforeEach(() => {
    // Se setea un DOM básico con form y campos antes de cada test
    document.body.innerHTML =  `
        <form id="loginForm">
            <input id="username" value="usuarioTest" /> 
            <input id="password" value="claveTest" />
        <form/>
        `;

        fetch.mockClear();
        alert.mockClear();
        window.location.href = '';
});

test('login exitoso: hace fetch, muestra alerta y redirige', async () => {
    // Se simula que fetch devuelve una respuesta exitosa
    fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Login correcto' }),
    })
})

// Se crea un evento simulado con preventDefault mockeado
const fakeEvent = { preventDefault: jest.fn()};

// Se ejecuta la función handlelogin con el evento simulado
await handleLogin(fakeEvent);

// Se verifica que preventDefault haya sido llamado para evitar el submit real
expect(fakeEvent.preventDefault).toHaveBeenCalled();

// Se verifica que fetch haya sido llamado con la URL y opciones correctas
expect(fetch).toHaveBeenCalledWith('https:////auth/login', expect.objectContaining({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username: 'usuarioTest', password: 'claveTest'}),
}));

// Se verifica que alert haya sido llamado con el mensaje de éxito
expect(alert).toHaveBeenCalledWith('Login exitoso');

// Se verifica que la página redirija a dashboard
expect(window.location.href).toBe('dashboard.html')

test('login fallido: muestra alerta de error', async () => {
    //Se simula que fetch devuelve error
    fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Credenciales inválidas' })
    })

    const fakeEvent = { preventDefault: jest.fn() };
    await handleLogin(fakeEvent);

    //Se verifica que alert muestre el mensaje de error
    expect(alert).toHaveBeenCalledWith('Credenciales invalidas');
});

test('error en fetch: muestra alerta de error de servidor', async () => {
    // Se simula que fetch lanza una excepción
    fetch.mockRejectedValue(new Error('Error de red'));

    const fakeEvent = { preventDefault: jest.fn() };
    await handleLogin(fakeEvent);

    // Se verifica que alert muestre el mensaje de error del servidor
    expect(alert).toHaveBeenCalledWith('Error en el servidor');
})

