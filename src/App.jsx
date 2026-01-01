import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    fetchTasks();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTasks([]);
  };

  const handleTaskCreate = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      fetchTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskEdit = async (taskData) => {
    try {
      await api.put(`/tasks/${editingTask._id}`, taskData);
      fetchTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskUpdate = async (id, taskData) => {
    try {
      await api.put(`/tasks/${id}`, taskData);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App container-fluid">
      <nav className="navbar navbar-custom">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-primary fw-bold">🚀 Task Management System</span>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">Welcome, {user.name}!</span>
            <button className="btn btn-danger-custom btn-custom" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <Dashboard tasks={tasks} user={user} />
      {user.role === 'admin' && (
        <div className="text-center mb-4">
          <button className="btn btn-primary-custom btn-custom btn-lg" onClick={() => setShowTaskForm(true)}>✨ Create New Task</button>
        </div>
      )}
      {showTaskForm && (
        <TaskForm
          onSubmit={editingTask ? handleTaskEdit : handleTaskCreate}
          onCancel={() => { setShowTaskForm(false); setEditingTask(null); }}
          task={editingTask}
        />
      )}
      <TaskList
        tasks={tasks}
        user={user}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        onEdit={(task) => { setEditingTask(task); setShowTaskForm(true); }}
      />
    </div>
  );
}

export default App;
