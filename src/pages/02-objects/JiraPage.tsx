import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores/tast/task.store';

export const JiraPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const getTaskByStatus = useTaskStore((state) => state.getTaskByStatus);
  console.log(getTaskByStatus('open'));
  console.log(getTaskByStatus('in-progress'));
  console.log(getTaskByStatus('done'));
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <JiraTasks title='Pendientes' value='open' />

        <JiraTasks title='Avanzando' value='in-progress' />

        <JiraTasks title='Terminadas' value='done' />

      </div>





    </>
  );
};