import { useState } from 'react';

const initialTasks = [
  {
    id: 'task-1',
    title: 'Dividir a tela em componentes reutilizáveis',
    category: 'Componentes',
    priority: 'Alta',
    done: false,
  },
  {
    id: 'task-2',
    title: 'Passar informações usando props',
    category: 'Props',
    priority: 'Média',
    done: false,
  },
  {
    id: 'task-3',
    title: 'Exibir as tarefas com map() e uma key única',
    category: 'Listas',
    priority: 'Alta',
    done: false,
  },
  {
    id: 'task-4',
    title: 'Revisar a sintaxe JSX da aplicação',
    category: 'JSX',
    priority: 'Baixa',
    done: true,
  },
];

const filterOptions = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendentes', label: 'Pendentes' },
  { id: 'concluidas', label: 'Concluídas' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('todas');

  const completedCount = tasks.filter((task) => task.done).length;
  const pendingCount = tasks.length - completedCount;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === 'pendentes') return !task.done;
    if (activeFilter === 'concluidas') return task.done;
    return true;
  });

  const taskCounts = {
    todas: tasks.length,
    pendentes: pendingCount,
    concluidas: completedCount,
  };

  function addTask(title, priority) {
    const id = globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}`;

    setTasks((currentTasks) => [
      {
        id,
        title,
        category: 'Minha tarefa',
        priority,
        done: false,
      },
      ...currentTasks,
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function removeTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  return (
    <div className="app-shell">
      <TopBar />

      <main className="dashboard">
        <WelcomePanel
          progress={progress}
          completedCount={completedCount}
          total={tasks.length}
        />

        <section className="metrics-grid" aria-label="Resumo das tarefas">
          <MetricCard
            icon="▤"
            label="No quadro"
            value={tasks.length}
            note="tarefas cadastradas"
            tone="violet"
          />
          <MetricCard
            icon="◷"
            label="Em andamento"
            value={pendingCount}
            note="prontas para continuar"
            tone="amber"
          />
          <MetricCard
            icon="✓"
            label="Concluídas"
            value={completedCount}
            note="passos já finalizados"
            tone="green"
          />
        </section>

        <section
          className="workspace-grid"
          aria-label="Gerenciador de tarefas"
        >
          <div className="task-panel" id="tarefas">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Seu espaço de foco</p>
                <h2>Minhas tarefas</h2>
                <p className="panel-description">
                  Organize os próximos passos da sua jornada React.
                </p>
              </div>
              <span className="task-total">{tasks.length} no total</span>
            </div>

            <TaskFilters
              activeFilter={activeFilter}
              counts={taskCounts}
              onChange={setActiveFilter}
            />

            <TaskList
              tasks={visibleTasks}
              filter={activeFilter}
              onToggle={toggleTask}
              onRemove={removeTask}
            />
          </div>

          <aside className="side-column">
            <TaskForm onAdd={addTask} />
            <ConceptCard />
          </aside>
        </section>

        <footer className="page-footer">
          <span className="footer-mark" aria-hidden="true">
            &lt;/&gt;
          </span>
          <p>Feito para aprender, uma tarefa de cada vez.</p>
          <span>Aula 08 · Projeto React</span>
        </footer>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Estuda.dev, início">
        <span className="brand-mark" aria-hidden="true">
          &lt;/&gt;
        </span>
        <span className="brand-name">
          estuda<span>.dev</span>
        </span>
      </a>

      <div className="topbar-right">
        <span className="course-label">
          <span className="status-dot" /> Projeto de React
        </span>
        <span className="avatar" aria-label="Perfil do estudante">
          D
        </span>
      </div>
    </header>
  );
}

function WelcomePanel({ progress, completedCount, total }) {
  return (
    <section className="welcome-panel" id="inicio">
      <div className="welcome-copy">
        <p className="welcome-kicker">
          <span /> UM PASSO DE CADA VEZ
        </p>
        <h1>
          Seu próximo grande projeto começa <em>aqui.</em>
        </h1>
        <p className="welcome-text">
          Planeje o que precisa fazer e acompanhe seu progresso na jornada de
          React.
        </p>
        <a className="welcome-link" href="#tarefas">
          Ver minhas tarefas <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div
        className="progress-card"
        role="progressbar"
        aria-label="Progresso das tarefas"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="progress-orbit"
          style={{ '--progress': `${progress}%` }}
        >
          <div className="progress-orbit-inner">
            <span className="progress-value">{progress}%</span>
            <span className="progress-caption">concluído</span>
          </div>
        </div>

        <div className="progress-summary">
          <strong>
            {completedCount} de {total}
          </strong>
          <span>tarefas concluídas</span>
        </div>

        <span className="sparkle sparkle-one" aria-hidden="true">
          ✦
        </span>
        <span className="sparkle sparkle-two" aria-hidden="true">
          ✧
        </span>
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value, note, tone }) {
  return (
    <article className="metric-card">
      <span className={`metric-icon ${tone}`} aria-hidden="true">
        {icon}
      </span>
      <div className="metric-content">
        <span className="metric-label">{label}</span>
        <strong className="metric-value">{value}</strong>
        <span className="metric-note">{note}</span>
      </div>
      <span className="metric-arrow" aria-hidden="true">
        ↗
      </span>
    </article>
  );
}

function TaskFilters({ activeFilter, counts, onChange }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filtrar tarefas">
      {filterOptions.map((option) => (
        <button
          className={`filter-button ${
            activeFilter === option.id ? 'active' : ''
          }`}
          key={option.id}
          type="button"
          aria-pressed={activeFilter === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
          <span className="filter-count">{counts[option.id]}</span>
        </button>
      ))}
    </div>
  );
}

function TaskList({ tasks, filter, onToggle, onRemove }) {
  if (tasks.length === 0) {
    const message =
      filter === 'concluidas'
        ? 'As tarefas que você concluir vão aparecer aqui.'
        : filter === 'pendentes'
          ? 'Tudo em dia! Não há tarefas pendentes.'
          : 'Adicione sua primeira tarefa para começar.';

    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ✦
        </span>
        <h3>Nenhuma tarefa por aqui</h3>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onRemove={() => onRemove(task.id)}
        />
      ))}
    </ul>
  );
}

function TaskRow({ task, onToggle, onRemove }) {
  return (
    <li className={`task-row ${task.done ? 'completed' : ''}`}>
      <label className="task-check-wrap">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          aria-label={`${task.done ? 'Reabrir' : 'Concluir'}: ${task.title}`}
        />
        <span className="custom-check" aria-hidden="true">
          ✓
        </span>
      </label>

      <div className="task-main">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          <span className="category-tag">{task.category}</span>
          <span className={`priority-tag ${task.priority.toLowerCase()}`}>
            <span /> {task.priority}
          </span>
        </div>
      </div>

      <button
        className="remove-task"
        type="button"
        onClick={onRemove}
        aria-label={`Remover tarefa: ${task.title}`}
        title="Remover tarefa"
      >
        ×
      </button>
    </li>
  );
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Média');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle, priority);
    setTitle('');
    setPriority('Média');
  }

  return (
    <section className="composer-card" aria-labelledby="composer-title">
      <div className="composer-heading">
        <span className="composer-icon" aria-hidden="true">
          ＋
        </span>
        <div>
          <p className="eyebrow">Tire do papel</p>
          <h2 id="composer-title">Nova tarefa</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="task-title">
          O que você precisa fazer?
        </label>
        <input
          id="task-title"
          className="text-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: praticar componentes"
          maxLength={90}
          required
        />

        <label className="field-label" htmlFor="task-priority">
          Prioridade
        </label>
        <select
          id="task-priority"
          className="select-input"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>

        <button className="add-button" type="submit">
          <span aria-hidden="true">＋</span> Adicionar tarefa
        </button>
      </form>

      <p className="composer-hint">
        <span aria-hidden="true">↳</span> Você consegue. Comece pequeno.
      </p>
    </section>
  );
}

function ConceptCard() {
  const concepts = ['JSX', 'Componentes', 'Props', 'Listas', 'Condicional'];

  return (
    <section className="concept-card" aria-labelledby="concept-title">
      <div className="concept-topline">
        <span className="concept-symbol" aria-hidden="true">
          {'{ }'}
        </span>
        <span className="concept-label">AULA 08</span>
      </div>

      <h2 id="concept-title">Aprender fazendo.</h2>
      <p>Esta atividade coloca os conceitos da aula em prática:</p>

      <ul className="concept-list">
        {concepts.map((concept) => (
          <li key={concept}>
            <span aria-hidden="true">✓</span>
            {concept}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;