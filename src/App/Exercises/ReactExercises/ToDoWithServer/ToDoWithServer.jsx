import { useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import './style.css';
import { List } from './Features/List/List';
import { Form } from './Features/Form/Form';

/* 
  Step 4
  Przełączanie między List and AddTodo
  Formularz
*/

export function ToDoWithServer() {
  // 'list, add, edit
  const [state, setState] = useState('list');

  const handleAddTodoClicked = () => {
    setState('add');
  };

  const handleShowList = () => {
    setState('list');
  };

  return (
    <div className="todo">
      <MasterHeader value="TODO" />
      {state === 'list' && <List addToDo={handleAddTodoClicked} />}
      {state === 'add' && <Form showList={handleShowList} />}
    </div>
  );
}
