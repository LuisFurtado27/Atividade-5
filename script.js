document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
  
    // Carregar tarefas do localStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = createTaskElement(task, index);
        taskList.appendChild(li);
      });
    };
  
    // Salvar tarefas no localStorage
    const saveTasks = (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Criar elemento de tarefa
    const createTaskElement = (task, index) => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-gray-200 p-3 rounded-lg mb-2';
  
      const span = document.createElement('span');
      span.className = task.completed ? 'line-through text-gray-500' : '';
      span.textContent = task.text;
  
      const editButton = document.createElement('button');
      editButton.className = 'bg-yellow-500 text-white p-2 rounded-lg';
      editButton.textContent = 'Editar';
      editButton.onclick = () => editTask(index);
  
      const deleteButton = document.createElement('button');
      deleteButton.className = 'bg-red-500 text-white p-2 rounded-lg';
      deleteButton.textContent = 'Excluir';
      deleteButton.onclick = () => deleteTask(index);
  
      const completeButton = document.createElement('button');
      completeButton.className = 'bg-green-500 text-white p-2 rounded-lg';
      completeButton.textContent = task.completed ? 'Desmarcar' : 'Concluir';
      completeButton.onclick = () => toggleComplete(index);
  
      li.appendChild(span);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      li.appendChild(completeButton);
  
      return li;
    };
  
    // Adicionar tarefa
    addButton.onclick = () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        taskInput.value = ''; // Limpar campo de texto
        loadTasks();
      }
    };
  
    // Editar tarefa
    const editTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const newText = prompt('Editar tarefa:', tasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        loadTasks();
      }
    };
  
    // Excluir tarefa
    const deleteTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    };
  
    // Marcar tarefa como concluída
    const toggleComplete = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      loadTasks();
    };
  
    // Carregar tarefas ao iniciar
    loadTasks();
  });
  