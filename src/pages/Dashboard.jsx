function Dashboard({ tasks, user }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const toDoTasks = tasks.filter(task => task.status === 'To Do').length;

  const tasksByAssignee = tasks.reduce((acc, task) => {
    const assignee = task.assignedTo?.name || 'Unassigned';
    acc[assignee] = (acc[assignee] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mb-5">
      <h2 className="text-center mb-4 text-white fw-bold">📊 Dashboard Overview</h2>
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card card-custom stats-card">
            <div className="card-body">
              <h5 className="card-title text-muted">Total Tasks</h5>
              <p className="stats-number">{totalTasks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-custom stats-card">
            <div className="card-body">
              <h5 className="card-title text-muted">To Do</h5>
              <p className="stats-number text-warning">{toDoTasks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-custom stats-card">
            <div className="card-body">
              <h5 className="card-title text-muted">In Progress</h5>
              <p className="stats-number text-info">{inProgressTasks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-custom stats-card">
            <div className="card-body">
              <h5 className="card-title text-muted">Completed</h5>
              <p className="stats-number text-success">{completedTasks}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-custom">
        <div className="card-body">
          <h3 className="card-title mb-4 text-primary fw-bold">👥 Tasks by Assignee</h3>
          <div className="row">
            {Object.entries(tasksByAssignee).map(([assignee, count]) => (
              <div key={assignee} className="col-md-6 col-lg-4 mb-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <span className="fw-semibold">{assignee}</span>
                  <span className="badge bg-primary rounded-pill">{count} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
