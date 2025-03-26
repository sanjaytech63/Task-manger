import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSun, FiMoon, FiCheck, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Reorder } from "framer-motion";

const Todo = () => {
  const [todos, setTodos] = useState({
    title: "",
  });

  const [isDark, setIsDark] = useState("dark");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const toggleDarkMode = () => {
    setIsDark((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todos.title.trim() !== "") {
      if (editIndex !== null) {
        const updatedList = list.map((item, index) =>
          index === editIndex ? todos : item
        );
        setList(updatedList);
        setEditIndex(null);
      } else {
        setList((prev) => [...prev, { ...todos, completed: false }]);
      }
      setTodos({ title: "" });
    }
  };

  const handleDelete = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const todoToEdit = list[index];
    setTodos(todoToEdit);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-300 ${
        isDark === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex justify-between items-center mb-8"
        >
          <motion.h1
            className={`text-3xl font-bold ${
              isDark === "dark" ? "text-white" : "text-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            Todo List
          </motion.h1>
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDark === "dark"
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle dark mode"
          >
            {isDark === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </motion.div>

        {/* Todo Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex gap-3 mb-8"
          layout
        >
          <motion.input
            type="text"
            name="title"
            value={todos.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`flex-1 p-3 rounded-lg border ${
              isDark === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            whileFocus={{ scale: 1.01 }}
          />
          <motion.button
            type="submit"
            className={`px-6 py-3 rounded-lg font-medium ${
              editIndex !== null
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {editIndex !== null ? "Update" : "Add"}
          </motion.button>
        </motion.form>

        {/* Todo List */}
        <div
          className={`rounded-lg overflow-hidden shadow-lg ${
            isDark === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <AnimatePresence>
            {list.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-8 text-center ${
                  isDark === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <FiX size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl">No todos yet. Add one above!</p>
              </motion.div>
            ) : (
              <Reorder.Group
                axis="y"
                values={list}
                onReorder={setList}
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <AnimatePresence>
                  {list.map((todo, index) => (
                    <Reorder.Item
                      key={todo.title + index}
                      value={todo}
                      as="div"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        todo.completed
                          ? isDark === "dark"
                            ? "bg-gray-700"
                            : "bg-gray-100"
                          : ""
                      }`}
                    >
                      <motion.div
                        className={`flex items-center p-4 ${
                          isDark === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }`}
                        whileHover={{ scale: 1.005 }}
                      >
                        <motion.button
                          onClick={() => toggleComplete(index)}
                          className={`mr-3 p-1 rounded-full ${
                            todo.completed
                              ? "bg-green-500 text-white"
                              : isDark === "dark"
                              ? "border border-gray-500"
                              : "border border-gray-300"
                          }`}
                          whileTap={{ scale: 0.9 }}
                        >
                          {todo.completed && <FiCheck size={16} />}
                        </motion.button>
                        <motion.span
                          className={`flex-1 text-lg ${
                            todo.completed
                              ? "line-through opacity-70"
                              : isDark === "dark"
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                          layout="position"
                        >
                          {todo.title}
                        </motion.span>
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => handleEdit(index)}
                            className={`p-2 rounded-full ${
                              isDark === "dark"
                                ? "text-blue-400 hover:bg-gray-600"
                                : "text-blue-500 hover:bg-gray-200"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiEdit size={18} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(index)}
                            className={`p-2 rounded-full ${
                              isDark === "dark"
                                ? "text-red-400 hover:bg-gray-600"
                                : "text-red-500 hover:bg-gray-200"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiTrash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        {list.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 p-3 rounded-lg ${
              isDark === "dark" ? "bg-gray-800" : "bg-gray-100"
            } flex justify-between items-center`}
          >
            <span className={isDark === "dark" ? "text-gray-300" : "text-gray-600"}>
              {list.filter((t) => t.completed).length} of {list.length} completed
            </span>
            <motion.button
              onClick={() => setList((prev) => prev.filter((t) => !t.completed))}
              className={`px-3 py-1 rounded text-sm ${
                isDark === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear completed
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Todo;