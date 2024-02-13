import { ethers } from "hardhat";

async function main() {
  const TodoList = await ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  await todoList.waitForDeployment();

  console.log(
    `TodoList contract deployed to ${todoList.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export {};
