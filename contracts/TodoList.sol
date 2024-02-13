//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TodoList {
    struct Todo {
        uint256 id;
        string title;
        string description;
        bool completed;
    }

    Todo[] public todos;
    uint256 public nextId;

    function createTodo(string calldata _title, string calldata _description) public {
        todos.push(Todo(nextId, _title, _description, false));
        nextId++;
    }

    function updateTodo(uint256 _id, string calldata _title, string calldata _description, bool _completed) public {
        require(_id < todos.length, "Todo does not exist");
        Todo storage todo = todos[_id];
        todo.title = _title;
        todo.description = _description;
        todo.completed = _completed;
    }

    function deleteTodo(uint256 _id) public {
        require(_id < todos.length, "Todo does not exist");
        delete todos[_id];
    }

    function toggleCompleted(uint256 _id) public {
        require(_id < todos.length, "Todo does not exist");
        todos[_id].completed = !todos[_id].completed;
    }

    function getTodoCount() public view returns (uint256) {
        return todos.length;
    }
}
