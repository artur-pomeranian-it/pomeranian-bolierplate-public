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
  const [editId, setEditId] = useState();

  const handleAddToDoClicked = () => {
    setState('add');
    setEditId();
  };

  const handleEditToDoClicked = (id) => {
    setState('edit');
    setEditId(id);
  };

  const handleShowList = () => {
    setState('list');
    setEditId();
  };

  return (
    <div className="todo">
      <MasterHeader value="TODO" />
      {state === 'list' && (
        <List addToDo={handleAddToDoClicked} editToDo={handleEditToDoClicked} />
      )}
      {state === 'add' && <Form isAddForm showList={handleShowList} />}
      {state === 'edit' && <Form id={editId} showList={handleShowList} />}
    </div>
  );
}
