import { NextRequest, NextResponse } from "next/server";
import { taskController } from "./task-controllers";
import { TaskDTO } from "./task-dto";

export async function GET() {
  const tasks = await taskController.getAll();

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  try {
    const body: TaskDTO = await req.json();
    const task = await taskController.create(body);

    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
