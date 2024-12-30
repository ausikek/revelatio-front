import { NextRequest, NextResponse } from "next/server";
import { taskController } from "../task-controllers";
import { UpdateTaskDTO } from "../task-dto";

export async function PATCH(req: NextRequest) {
  const id: string | undefined = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
    });
  }

  const taskID = taskController.getById(id);

  if (!taskID) {
    return NextResponse.json({
      status: 404,
      message: `Task with id ${id} not found`,
    });
  }

  try {
    const body: UpdateTaskDTO = await req.json();
    const updatedTask = await taskController.update(id, body);

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const id: string | undefined = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
    });
  }

  const taskID = taskController.getById(id);

  if (!taskID) {
    return NextResponse.json({
      status: 404,
      message: `Task with id ${id} not found`,
    });
  }

  try {
    const deletedTask = await taskController.delete(id);

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Server Error",
    });
  }
}
