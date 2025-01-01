import { NextRequest, NextResponse } from "next/server";
import { taskController } from "../task-controllers";
import { UpdateTaskDTO } from "../task-dto";

export async function GET(req: NextRequest) {
  const id: string | undefined = req.nextUrl.pathname.split("/").pop();

  const tasks = await taskController.getByUserId(id as string);

  return NextResponse.json(tasks);
}

export async function PATCH(req: NextRequest) {
  const id: string | undefined = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      {
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  const task = await taskController.getById(id);

  if (!task) {
    return NextResponse.json(
      {
        message: `Task with id ${id} not found`,
      },
      { status: 404 }
    );
  }

  try {
    const body: UpdateTaskDTO = await req.json();
    const updatedTask = await taskController.update(id, body);

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id: string | undefined = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      {
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  const taskID = await taskController.getById(id);

  if (!taskID) {
    return NextResponse.json(
      {
        message: `Task with id ${id} not found`,
      },
      { status: 404 }
    );
  }

  const deletedTask = await taskController.delete(id);

  return NextResponse.json(deletedTask);
}
