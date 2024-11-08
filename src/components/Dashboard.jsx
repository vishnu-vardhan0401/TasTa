import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../Context/GlobalState';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import TaskFilter from './TaskFilter';

function Dashboard() {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState([]); // Store all tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // Store filtered tasks
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const getTasks = async () => {
      const details = doc(db, "users", user.uid);
      const task = await getDoc(details);
      const tasks = task.data().tasks || [];
      setAllTasks(tasks); // Set all tasks initially
      setFilteredTasks(tasks); // Display all tasks by default
    };
    getTasks();
  }, [user.uid]);

  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;
    const task = allTasks.find(task => task.id === id);
  
    // Prevent switching back to "Pending" if status is already "Started", "Completed", or "Failed"
    if (task.taskstatus !== "Pending" && newStatus === "Pending") {
      alert("You cannot revert back to Pending once the task is Started, Completed, or Failed.");
      return; // Exit without making any changes
    }
  
    // Update filteredTasks for immediate UI feedback
    setFilteredTasks(prevFilteredTasks =>
      prevFilteredTasks.map(task =>
        task.id === id ? { ...task, taskstatus: newStatus } : task
      )
    );
  
    // Update allTasks to maintain overall data consistency
    setAllTasks(prevAllTasks =>
      prevAllTasks.map(task =>
        task.id === id ? { ...task, taskstatus: newStatus } : task
      )
    );
  
    // Update Firestore with the new status for the specific task
    const userDocRef = doc(db, "users", user.uid);
    const updatedTasks = allTasks.map(task =>
      task.id === id ? { ...task, taskstatus: newStatus } : task
    );
  
    await updateDoc(userDocRef, { tasks: updatedTasks });
  };
  
  

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === 'All') {
      setFilteredTasks(allTasks);
    } else {
      setFilteredTasks(allTasks.filter(task => task.taskstatus === status));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <TaskFilter onFilterChange={handleFilterChange} />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Your Task Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <div
              key={Date.now()}
              className="p-6 bg-white rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-xl font-bold text-gray-700 mb-2">{task.taskname}</h2>
              <p className="text-gray-600 mb-2">{task.taskdescription}</p>
              <p className="text-sm text-gray-500 mb-2">Due Date: <span className="font-semibold">{task.taskdate}</span></p>
              <p
                className={`text-sm font-semibold mb-4 ${
                  task.taskpriority === 'Low'
                    ? 'text-green-500'
                    : task.taskpriority === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                Priority: {task.taskpriority}
              </p>
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-semibold ${
                    task.taskstatus === 'Completed'
                      ? 'text-green-600'
                      : task.taskstatus === 'Pending'
                      ? 'text-yellow-500'
                      : task.taskstatus === 'Failed'
                      ? 'text-red-600'
                      : 'text-blue-500'
                  }`}
                >
                  Status:
                </p>
                <select
  value={task.taskstatus}
  onChange={(e) => handleStatusChange(e, task.id)}
  className="ml-2 bg-blue-100 text-gray-700 font-medium rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
>
  <option value="Pending" disabled={task.taskstatus !== "Pending"}>
    Pending
  </option>
  <option value="Started">Started</option>
  <option value="Completed">Completed</option>
  <option value="Failed">Failed</option>
</select>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
