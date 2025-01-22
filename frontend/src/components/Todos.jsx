import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCircleUser, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Profile from './Profile';

// Define the local and production URLs
const LOCAL_URL = "http://localhost:5000";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://mongo-todo-authentication.netlify.app";
const BACKEND_URL = import.meta.env.MODE === "production" ? VITE_BACKEND_URL : LOCAL_URL;

// Fetcher function
const fetcher = async (url, options = {}) => {
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const Todos = () => {
  const { data = [], error, mutate, isLoading } = useSWR(`${BACKEND_URL}/api/todos`, fetcher);

  const [currentTodo, setCurrentTodo] = useState('');
  const [editingId, setEditingId] = useState(null);

  if (error) {
    return <h1 className="text-2xl py-2 text-center">Something went wrong</h1>;
  }
  if (isLoading) {
    return <h1 className="text-2xl py-2 text-center">Loading...</h1>;
  }

  async function handleError(error) {
    toast.error(error);
    throw new Error(error);
  }

  async function handleAddOrUpdateTodo(e) {
    e.preventDefault();

    if (!currentTodo.trim().length) {
      toast.error("Todo can't be empty!");
      return;
    }

    if (editingId) {
      // Update existing todo
      await mutate(
        async () => {
          const response = await fetcher(`${BACKEND_URL}/api/todos/${editingId}`, {
            method: 'PUT',
            body: { title: currentTodo },
          });

          if (response.error) {
            handleError(response.error);
          }

          return data.map((todo) =>
            todo._id === editingId ? { ...todo, title: currentTodo } : todo
          );
        },
        {
          optimisticData: data.map((todo) =>
            todo._id === editingId ? { ...todo, title: currentTodo } : todo
          ),
          rollbackOnError: true,
          revalidate: false,
        }
      );

      setEditingId(null);
      toast.success('Todo updated successfully');
    } else {
      // Add new todo
      const newTodo = {
        title: `${currentTodo} adding...`,
        _id: Date.now().toString(),
        isCompleted: false,
      };

      async function addTodo() {
        const response = await fetcher(`${BACKEND_URL}/api/todos`, {
          method: 'POST',
          body: { title: currentTodo },
        });
        if (response.error) {
          handleError(response.error);
        }
        return [...data, response];
      }

      await mutate(addTodo, {
        optimisticData: [...data, newTodo],
        revalidate: true,
        rollbackOnError: true,
      });

      toast.success('Todo added successfully');
    }

    setCurrentTodo(''); // Clear input field after adding or updating
  }

  async function deleteTodo(id) {
    toast.success('Todo deleted');
    await mutate(
      async () => {
        const response = await fetcher(`${BACKEND_URL}/api/todos/${id}`, {
          method: 'DELETE',
        });
        if (response.error) {
          handleError(response.error);
        }
        return data.filter((todo) => todo._id !== id);
      },
      {
        optimisticData: data.filter((todo) => todo._id !== id),
        rollbackOnError: true,
        revalidate: false,
      }
    );
  }

  async function handleCompleteTodo(id, isCompleted) {
    await mutate(
      async () => {
        const response = await fetcher(`${BACKEND_URL}/api/todos/${id}`, {
          method: 'PUT',
          body: { isCompleted: !isCompleted },
        });

        if (response.error) {
          handleError(response.error);
        }

        return data.map((todo) => {
          if (todo._id === id) {
            return { ...todo, isCompleted: !isCompleted };
          }
          return todo;
        });
      },
      {
        optimisticData: data.map((todo) => {
          if (todo._id === id) {
            return { ...todo, isCompleted: !isCompleted };
          }
          return todo;
        }),
        rollbackOnError: true,
        revalidate: false,
      }
    );
  }

  function handleEdit(todo) {
    setCurrentTodo(todo.title); // Put todo title back into the input field
    setEditingId(todo._id); // Set the id of the todo being edited
  }

  return (
    <>
      <div className="bg-blue-600 flex items-center justify-center">
        <div>
          <div className="mx-auto w-[800px] px-24 py-12 max-w-[820px] flex flex-col gap-6 bg-white rounded-lg">
            <div className="flex justify-end">
              <Profile />
            </div>

            <h1 className="text-blue-500 font-bold text-4xl text-center">
              Todo-App
            </h1>

            <form onSubmit={handleAddOrUpdateTodo} className="flex gap-10 justify-center items-center">
              <Input
                type="text"
                placeholder="Enter todo"
                name="title"
                id="title"
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
                required
                className="leading-6 py-7 h-12 text-left text-base shadow-md"
              />

              <Button className="h-9 rounded-md border border-input px-4 py-7 text-base shadow-md flex items-center hover:bg-primary transition ease-linear group">
                <FontAwesomeIcon icon={faAdd} className="transition ease-linear group-hover:stroke-white" />
                <span className="ml-2">{editingId ? 'Save' : 'Add'}</span>
              </Button>
            </form>

            {data?.length ? (
              <div className="py-6 flex flex-col rounded">
                {data.map((todo, index) => (
                  <div key={index} className="flex h-10 items-center w-full bg-[#c5e0e8] rounded-lg px-5 py-9 mt-2 mb-2">
                    <span className={`flex-1 px-3 text-lg ${todo.isCompleted ? 'line-through text-[#63657b]' : ''}`}>
                      {todo.title}
                    </span>
                    <div className="px-3 flex gap-2">
                      <FontAwesomeIcon
                        className={`bg-[#1d18a3] hover:bg-indigo-700 text-white px-2 py-2 size-4 rounded-lg cursor-pointer ${
                          todo.isCompleted ? 'text-primary' : 'text-slate-300'
                        }`}
                        icon={faCheck}
                        onClick={() => handleCompleteTodo(todo._id, todo.isCompleted)}
                      />
                      <FontAwesomeIcon
                        className="bg-[#1d18a3] hover:bg-indigo-700 text-white size-4 px-2 py-2 rounded-lg cursor-pointer"
                        icon={faTrash}
                        onClick={() => deleteTodo(todo._id)}
                      />
                      <FontAwesomeIcon
                        className="bg-[#1d18a3] size-4 hover:bg-indigo-700 text-white px-2 py-2 rounded-lg cursor-pointer"
                        icon={faEdit}
                        onClick={() => handleEdit(todo)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span>You don't have any todos</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
