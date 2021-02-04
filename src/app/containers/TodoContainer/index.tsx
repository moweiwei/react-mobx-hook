import React, { useEffect, useCallback, useState } from 'react';
import style from './style.css';
import { observer } from 'mobx-react';
import { useLocation, useHistory } from 'react-router';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import { TodoList } from 'app/components/TodoList';
import { TodoModel } from 'app/models';
import { useTodoStore } from 'app/stores/TodoStore';
import { TODO_FILTER_LOCATION_HASH, TodoFilter } from 'app/constants';
import { Button } from 'antd';

export const TodoContainer = observer(() => {
  const todoStore = useTodoStore([
    new TodoModel('Use MobX'),
    new TodoModel('Use React'),
  ]);
  const history = useHistory();
  const location = useLocation();
  const [filter, setFilter] = useState(TodoFilter.ALL);

  // location change callback
  useEffect(() => {
    const nextFilter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find((item) => TODO_FILTER_LOCATION_HASH[item] === location.hash);
    setFilter(nextFilter ?? TodoFilter.ALL);
  }, [location.hash, setFilter]);

  // filter change callback
  const handleFilterChange = useCallback(
    (nextFilter: TodoFilter) => {
      setFilter(nextFilter);
      const nextHash = TODO_FILTER_LOCATION_HASH[nextFilter];
      history.replace(nextHash);
    },
    [history, setFilter],
  );

  const itemsToDisplay =
    filter === TodoFilter.ALL
      ? todoStore.todos
      : filter === TodoFilter.ACTIVE
      ? todoStore.activeTodos
      : todoStore.completedTodos;

  return (
    <div className={style.normal}>
      <Header addTodo={todoStore.addTodo} />
      <TodoList
        todos={itemsToDisplay}
        completeAll={todoStore.completeAll}
        deleteTodo={todoStore.deleteTodo}
        editTodo={todoStore.editTodo}
      />
      <Footer
        filter={filter}
        activeCount={todoStore.activeTodos.length}
        completedCount={todoStore.completedTodos.length}
        onClearCompleted={todoStore.clearCompleted}
        onChangeFilter={handleFilterChange}
      />
      {/* <Button type="primary">Button</Button> */}
    </div>
  );
});
