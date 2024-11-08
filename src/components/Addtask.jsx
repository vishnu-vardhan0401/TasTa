import React, { useState } from 'react';
import { useAuth } from '../Context/GlobalState';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

function Addtask() {
  const [data, setData] = useState({
    id: "",
    taskname: "",
    taskdate: "",
    taskpriority: "",
    taskdescription: "",
    taskstatus: "Pending"
  });
  const { user } = useAuth();
  const [task, setTask] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData, id: Date.now(),
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.taskname || !data.taskdate || !data.taskpriority || !data.taskdescription) {
      alert("Please fill all fields");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    const existingTasks = docSnap.data().tasks || [];
    const updatedTasks = [...existingTasks, data];
    
    await setDoc(userDocRef, { tasks: updatedTasks }, { merge: true });

    setTask(updatedTasks);
    setData({
      id: "",
      taskname: "",
      taskdate: "",
      taskpriority: "",
      taskdescription: "",
      taskstatus: "Pending"
    });
  };

  return (
    <div className="px-4 sm:px-8 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl gap-4 mx-auto py-8 bg-white rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>

        <label htmlFor="task" className="text-sm sm:text-base font-medium text-gray-700 self-start w-full">Task Name</label>
        <input
          type="text"
          id="task"
          name="taskname"
          placeholder="Enter task name"
          value={data.taskname}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="Due" className="text-sm sm:text-base font-medium text-gray-700 self-start w-full">Due Date</label>
        <input
          type="date"
          id="Due"
          name="taskdate"
          value={data.taskdate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="priority" className="text-sm sm:text-base font-medium text-gray-700 self-start w-full">Priority</label>
        <select
          id="priority"
          name="taskpriority"
          value={data.taskpriority}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="taskDesc" className="text-sm sm:text-base font-medium text-gray-700 self-start w-full">Task Description</label>
        <textarea
          id="taskDesc"
          name="taskdescription"
          placeholder="Enter task description"
          value={data.taskdescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="3"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Addtask;
