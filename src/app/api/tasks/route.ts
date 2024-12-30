import { NextRequest, NextResponse } from "next/server";
import { taskController } from "./task-controllers";
import { TaskDTO } from "./task-dto";

export async function GET() {
  try {
    const tasks = await taskController.getAll();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      status: 500,
      message: "Server Error",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: TaskDTO = await req.json();
    const task = await taskController.create(body);

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      status: 500,
      message: "Server Error",
    });
  }
}
