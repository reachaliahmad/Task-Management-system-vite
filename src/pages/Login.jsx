import { useState } from 'react';
import api from '../services/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('team_member');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/users/register' : '/users/login';
      const data = isRegister ? { name, email, password, role } : { email, password };
      const response = await api.post(endpoint, data);
      if (!isRegister) {
        onLogin(response.data.user, response.data.token);
      } else {
        alert('Registration successful! Please login.');
        setIsRegister(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card card-custom shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 fw-bold text-primary">
            {isRegister ? '📝 Register' : '🔐 Login'}
          </h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label fw-semibold">Role</label>
                  <select
                    className="form-select form-control-custom"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="team_member">Team Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-custom"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-custom"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary-custom btn-custom">
                {isRegister ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
