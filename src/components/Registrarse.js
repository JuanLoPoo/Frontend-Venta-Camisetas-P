// src/components/Registrarse.js
import React, { useState } from 'react';
import './Registrarse.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Iconos de Font Awesome para el ojo

//Este componente podrían pensar que es redundante pero no lo es.
//Ofrece otra interfaz para poderse registrar directamente.
//Además que incorpora una interfaz más amigable
//Y aquí también hay validaciones.

const Registrarse = () => {
  const [nombre, setNombre] = useState('');
  const [nickname, setNickname] = useState(''); // Estado para el nickname
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Segundo campo de contraseña
  const [numCelular, setNumCelular] = useState('');
  const [direccionResidencia, setDireccionResidencia] = useState('');
  const [rol, setRol] = useState('cliente');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estados para controlar los caracteres restantes
  const [nombreMaxReached, setNombreMaxReached] = useState(false);
  const [emailMaxReached, setEmailMaxReached] = useState(false);
  const [passwordMaxReached, setPasswordMaxReached] = useState(false);
  const [celularMaxReached, setCelularMaxReached] = useState(false);
  const [direccionMaxReached, setDireccionMaxReached] = useState(false);
  const [nicknameMaxReached, setNicknameMaxReached] = useState(false); // Estado para el límite del nickname

  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Función para alternar la visibilidad de la confirmación de la contraseña
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!nombre || !email || !password || !numCelular || !direccionResidencia) {
      setError('Por favor, completa todos los campos');
      return;
    }

    // Validación de que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validación de longitud de nombre
    if (nombre.length < 3 || nombre.length > 20) {
      setError('El nombre debe tener entre 3 y 20 caracteres');
      return;
    }

    // Validación de nickname
    if (nickname.length < 3 || nickname.length > 15) {
      setError('El nickname debe tener entre 3 y 15 caracteres');
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email) || email.length < 5 || email.length > 50) {
      setError('El email debe tener entre 5 y 50 caracteres y un formato válido');
      return;
    }

    // Validación de contraseña (números, letras, caracteres especiales)
    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[A-Za-z\d@$!%*?&.])(?=.*[!@$%^&*()_+=[\]{}|;:'",.<>/?\\/-]).{7,30}$/;
    if (!passwordRegex.test(password) || password.length > 30) {
      setError('La contraseña debe tener al menos 4 letras, 4 números,1 caracter especial, 2 mayúsculas y no puede exceder los 30 caracteres');
      return;
    }

    // Validación de celular (número entre 9 y 15 dígitos)
    if (numCelular.length < 9 || numCelular.length > 15) {
      setError('El número de celular debe tener entre 9 y 15 dígitos');
      return;
    }

    // Validación de longitud de la dirección
    if (direccionResidencia.length < 10 || direccionResidencia.length > 100) {
      setError('La dirección debe tener entre 10 y 100 caracteres');
      return;
    }

    // Si todo es válido
    setMensaje('¡Registro exitoso!');
    setError('');
    setNombre('');
    setEmail('');
    setPassword('');
    setConfirmPassword(''); 
    setNumCelular('');
    setDireccionResidencia('');
    setNickname(''); // Limpiar el estado del nickname
    setRol('cliente');
  };

  // Manejo de los caracteres restantes
  const handleNombreChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setNombre(value);
      setNombreMaxReached(value.length === 20);
    }
  };

  // Manejo de los caracteres restantes para el nickname
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setNickname(value);
      setNicknameMaxReached(value.length === 15);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setEmail(value);
      setEmailMaxReached(value.length === 50);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setPassword(value);
      setPasswordMaxReached(value.length === 30);
    }
  };

  const handleCelularChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setNumCelular(value);
      setCelularMaxReached(value.length === 15);
    }
  };

  const handleDireccionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setDireccionResidencia(value);
      setDireccionMaxReached(value.length === 100);
    }
  };
  
  return (
    <div className="registro-container">
      <h1>Registrarse</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={handleNombreChange}
            minLength="3" // Requiere un mínimo de 3 caracteres
            maxLength="20" // Limita el máximo a 20 caracteres
            required
          />
          {nombreMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (20).</p>}
        </div>

        <div>
          <label>Nickname</label>
          <input
            type="text"
            placeholder="Nickname (3-15 caracteres)"
            value={nickname}
            onChange={handleNicknameChange}
            minLength="3" // Requiere un mínimo de 3 caracteres
            maxLength="15" // Limita el máximo a 15 caracteres
            required
          />
          {nicknameMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (15).</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            minLength="5" // Requiere un mínimo de 5 caracteres
            maxLength="50" // Limita el máximo a 50 caracteres
            required
          />
          {emailMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (50).</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            minLength="7" // Requiere un mínimo de 7 caracteres
            maxLength="30" // Limita el máximo a 30 caracteres
            required
          />
          <button type="button" onClick={togglePasswordVisibility} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
            {passwordMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (30).</p>}
        </div>

        <div>
          <label>Confirmar Contraseña</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength="30"
              required
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="eye-icon">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label>Celular</label>
          <input
            type="text" // Cambié a texto para que pueda contener el formato adecuado
            placeholder="Celular (9-15 dígitos)"
            value={numCelular}
            onChange={handleCelularChange}
            minLength="9" // Requiere un mínimo de 9 dígitos
            maxLength="15" // Limita el máximo a 15 dígitos
            required
          />
          {celularMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (15).</p>}
        </div>

        <div>
          <label>Dirección de Residencia</label>
          <input
            type="text"
            placeholder="Dirección de Residencia"
            value={direccionResidencia}
            onChange={handleDireccionChange}
            minLength="10" // Requiere un mínimo de 10 caracteres
            maxLength="100" // Limita el máximo a 100 caracteres
            required
          />
          {direccionMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (100).</p>}
        </div>

        <div>
          <label>
            Rol:
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="cliente">Cliente</option>
              <option value="artista">Artista</option>
            </select>
          </label>
        </div>

        {error && <p className="error">{error}</p>}
        {mensaje && <p className="success">{mensaje}</p>}

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registrarse;

