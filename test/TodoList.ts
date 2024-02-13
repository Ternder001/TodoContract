import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("TodoList", function () {

  async function deployTodoList() {
    
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.waitForDeployment();

    return { todoList };
  }

  it("Should create a new todo", async function () {
    const { todoList } = await loadFixture(deployTodoList);
    await todoList.createTodo("Test Todo", "This is a test todo");
    const todo = await todoList.todos(0);
    
    expect(todo.title).to.equal("Test Todo");
    expect(todo.description).to.equal("This is a test todo");
    expect(todo.completed).to.equal(false);
  });

  it("Should update a todo", async function () {
    const { todoList } = await loadFixture(deployTodoList);
    await todoList.createTodo("Test Todo", "This is a test todo");
    await todoList.updateTodo(0, "Updated Todo", "This is an updated todo", true);
    const todo = await todoList.todos(0);
    
    expect(todo.title).to.equal("Updated Todo");
    expect(todo.description).to.equal("This is an updated todo");
    expect(todo.completed).to.equal(true);
  });

  it("Should delete a todo", async function () {
    const { todoList } = await loadFixture(deployTodoList);
    await todoList.createTodo("Test Todo", "This is a test todo");
    await todoList.deleteTodo(0);
    
    const todoCount = await todoList.getTodoCount();
    expect(todoCount).to.equal(0);
  });

  it("Should toggle todo completion status", async function () {
    const { todoList } = await loadFixture(deployTodoList);
    await todoList.createTodo("Test Todo", "This is a test todo");
    await todoList.toggleCompleted(0);
    let todo = await todoList.todos(0);
    
    expect(todo.completed).to.equal(true);

    await todoList.toggleCompleted(0);
    todo = await todoList.todos(0);
    expect(todo.completed).to.equal(false);
  });
});
