import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/Firebase';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import Card from './Card';
import { useAuth } from '../Context/GlobalState';
import AdminNav from './AdminNav';

function AdminDash() {
  const [users, setUsers] = useState([]);
  const { role } = useAuth();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [status1, setStatus1] = useState('');
  const adminAuth = role === "admin";

  // Fetch users excluding admin users
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredUsers = usersList.filter(user => user.role !== "admin");
    setUsers(filteredUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Assign task to selected user
  const assignTaskToUser = async () => {
    if (selectedUserId && taskTitle && taskDescription && taskDate && status1) {
      const userRef = doc(db, 'users', selectedUserId);
      const task = {
        taskname: taskTitle,
        taskdescription: taskDescription,
        taskdate: taskDate,
        taskpriority: status1,
        taskstatus: "Pending",
      };

      // Get current tasks for the selected user
      const userDoc = await getDoc(userRef);
      const currentTasks = userDoc.exists() && userDoc.data().tasks ? userDoc.data().tasks : [];
      const updatedTasks = [...currentTasks, task];

      // Update Firestore with new tasks list
      await updateDoc(userRef, {
        tasks: updatedTasks,
      });

      // Clear form and refresh users list
      setTaskTitle('');
      setTaskDescription('');
      setTaskDate('');
      setStatus1('');
      setSelectedUserId('');
      fetchUsers(); // Refresh users after assigning task
    }
  };

  if (!adminAuth) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="container mx-auto p-4">
        {/* Form Section */}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Assign a Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              onChange={(e) => setStatus1(e.target.value)}
              value={status1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="med">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              onChange={(e) => setSelectedUserId(e.target.value)}
              value={selectedUserId}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={assignTaskToUser}
            disabled={!taskTitle || !taskDescription || !taskDate || !status1 || !selectedUserId}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            Assign Task
          </button>
        </div>

        {/* Tasks Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{user.fullName}</h3>
              {user.tasks?.map((task, index) => (
                <Card
                  key={index}
                  title={task.taskname}
                  dueDate={task.taskdate}
                  description={task.taskdescription}
                  assignee={user.fullName}
                  status={task.taskstatus}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
