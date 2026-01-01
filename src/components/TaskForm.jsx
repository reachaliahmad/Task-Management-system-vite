import { useState, useEffect } from 'react';
import api from '../services/api';

function TaskForm({ onSubmit, onCancel, task = null }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo?._id || '');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, priority, assignedTo });
  };

  return (
    <div className="card card-custom mb-4">
      <div className="card-body">
        <h3 className="card-title mb-4 fw-bold text-primary">
          {task ? '✏️ Edit Task' : '➕ Create New Task'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control form-control-custom"
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control form-control-custom"
              id="description"
              rows="3"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label fw-semibold">Due Date</label>
            <input
              type="date"
              className="form-control form-control-custom"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label fw-semibold">Priority</label>
            <select
              className="form-select form-control-custom"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTo" className="form-label fw-semibold">Assign To</label>
            <select
              className="form-select form-control-custom"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
              ))}
            </select>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary-custom btn-custom">
              {task ? 'Update Task' : 'Create Task'}
            </button>
            <button type="button" className="btn btn-secondary btn-custom" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
