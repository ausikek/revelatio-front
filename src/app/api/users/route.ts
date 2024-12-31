import { NextRequest, NextResponse } from "next/server";
import { userController } from "./user-controllers";
import { UserDTO } from "./user-dto";

export async function POST(req: NextRequest) {
  try {
    const body: UserDTO = await req.json();
    const user = await userController.getByUsername(body.username);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.password !== body.password) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(user); // Defaults to 200
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
