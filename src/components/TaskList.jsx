function TaskList({ tasks, user, onUpdate, onDelete, onEdit }) {
  const handleStatusChange = (taskId, newStatus) => {
    onUpdate(taskId, { status: newStatus });
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(taskId);
    }
  };

  return (
    <div>
      <h3 className="text-center mb-4 text-white fw-bold">📋 Task List</h3>
      {tasks.length === 0 ? (
        <div className="card card-custom">
          <div className="card-body text-center">
            <p className="mb-0 text-muted">No tasks found. Create your first task!</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task._id} className="col-lg-6 col-xl-4 mb-4">
              <div className="card card-custom task-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-bold text-truncate">{task.title}</h5>
                    <span className={`badge ${
                      task.status === 'To Do' ? 'badge-todo' :
                      task.status === 'In Progress' ? 'badge-in-progress' : 'badge-completed'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="card-text text-muted mb-3">{task.description}</p>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block">Priority</small>
                      <span className={`badge ${
                        task.priority === 'High' ? 'bg-danger' :
                        task.priority === 'Medium' ? 'bg-warning text-dark' : 'bg-success'
                      }`}>{task.priority}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Due Date</small>
                      <span className="fw-semibold">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted d-block">Assigned To</small>
                    <span className="fw-semibold">{task.assignedTo?.name || 'Unassigned'}</span>
                  </div>
                  {(user.role === 'admin' || task.assignedTo?._id === user.id) && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Update Status</label>
                      <select
                        className="form-select form-control-custom"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  )}
                  {user.role === 'admin' && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm btn-custom"
                        onClick={() => onEdit(task)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm btn-custom"
                        onClick={() => handleDelete(task._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
