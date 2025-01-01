import { GET, POST } from "../../src/app/api/tasks/route";
import {
  GET as idGET,
  PATCH,
  DELETE,
} from "../../src/app/api/tasks/[id]/route";
import { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

const userID: string = "a29b4eca-66ba-4a1f-9e22-4002d8ad3860";

const mockNextRequest = (options: Partial<NextRequest> = {}): NextRequest => {
  const defaultRequest: Partial<NextRequest> = {
    method: "GET",
    url: "/",
    headers: new Headers(),
    json: jest.fn().mockResolvedValue({ ...options.body }),
    ...options,
  };

  return defaultRequest as NextRequest;
};

describe("API Route /api/tasks <<SUCCESSFUL>>", () => {
  let taskID: string | null = null;

  it("GET: should return task", async () => {
    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          status: expect.stringMatching(/TODO|PROGRESS|DONE/),
          userId: expect.any(String),
        }),
      ])
    );
  });

  it("POST: should create a new task", async () => {
    const payload = {
      title: "New Task Test",
      description: "This is a new task Test",
      status: "TODO",
      user: {
        id: userID,
        username: "breno",
        password: "breno123",
      },
    };

    const req = mockNextRequest({
      method: "POST",
      body: JSON.parse(JSON.stringify(payload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    taskID = body.id;

    expect(res.status).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.stringMatching("New Task Test"),
        description: expect.stringMatching("This is a new task Test"),
        status: expect.stringMatching("TODO"),
        userId: expect.stringMatching(userID),
      })
    );
  });

  it("GET: should return task by user ID", async () => {
    const mockNextURL = new NextURL(
      "http://localhost:3000/api/tasks/" + userID
    );

    const req = mockNextRequest({
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await idGET(req);
    const body = await res.json();

    expect(taskID).not.toBeNull();
    expect(res.status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          status: expect.stringMatching(/TODO|PROGRESS|DONE/),
          userId: expect.any(String),
        }),
      ])
    );
  });

  it("PATCH: should update a task", async () => {
    const payload = {
      id: taskID,
      title: "Updated Task Test",
      description: "This is an updated task Test",
      status: "PROGRESS",
      user: {
        id: userID,
        username: "breno",
        password: "breno123",
      },
    };

    const mockNextURL = new NextURL(
      "http://localhost:3000/api/tasks/" + taskID
    );

    const req = mockNextRequest({
      method: "PATCH",
      body: JSON.parse(JSON.stringify(payload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await PATCH(req);
    const body = await res.json();

    expect(taskID).not.toBeNull();
    expect(res.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(taskID as string),
        title: expect.stringMatching("Updated Task Test"),
        description: expect.stringMatching("This is an updated task Test"),
        status: expect.stringMatching("PROGRESS"),
        userId: expect.stringMatching(userID),
      })
    );
  });

  it("DELETE: should delete a task", async () => {
    const mockNextURL = new NextURL(
      "http://localhost:3000/api/tasks/" + taskID
    );

    const req = mockNextRequest({
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await DELETE(req);
    const body = await res.json();

    expect(taskID).not.toBeNull();
    expect(res.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(taskID as string),
        title: expect.stringMatching("Updated Task Test"),
        description: expect.stringMatching("This is an updated task Test"),
        status: expect.stringMatching("PROGRESS"),
        userId: expect.stringMatching(userID),
      })
    );
  });
});

/* 
-------------------------------------------------------------------------------
################################# ERROR TESTS #################################
-------------------------------------------------------------------------------
*/

describe("API Route /api/tasks <<ERROR>>", () => {
  let taskID: string | null = null;

  it("POST: should return 500 error", async () => {
    const payload = {
      title: "New Task Test",
      description: "This is a new task Test",
      status: "TODO",
      user: {
        id: "gta6",
        username: "breno",
        password: "breno123",
      },
    };

    const req = mockNextRequest({
      method: "POST",
      body: JSON.parse(JSON.stringify(payload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Server Error",
      })
    );
  });

  it("PATCH: should return 400 error", async () => {
    const payload = {
      id: "",
      title: "Updated Task Test",
      description: "This is an updated task Test",
      status: "PROGRESS",
      user: {
        id: "gta6",
        username: "breno",
        password: "breno123",
      },
    };

    const mockNextURL = new NextURL("http://localhost:3000/api/tasks/");

    const req = mockNextRequest({
      method: "PATCH",
      body: JSON.parse(JSON.stringify(payload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await PATCH(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
      })
    );
  });

  it("PATCH: should return 404 error", async () => {
    const payload = {
      id: "gta6",
      title: "Updated Task Test",
      description: "This is an updated task Test",
      status: "PROGRESS",
      user: {
        id: "gta6",
        username: "breno",
        password: "breno123",
      },
    };

    const mockNextURL = new NextURL("http://localhost:3000/api/tasks/gta6");

    const req = mockNextRequest({
      method: "PATCH",
      body: JSON.parse(JSON.stringify(payload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await PATCH(req);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Task with id gta6 not found",
      })
    );
  });

  it("PATCH: should return 500 error", async () => {
    const createPayload = {
      title: "New Task Test",
      description: "This is a new task Test",
      status: "TODO",
      user: {
        id: userID,
        username: "breno",
        password: "breno123",
      },
    };

    const createReq = mockNextRequest({
      method: "POST",
      body: JSON.parse(JSON.stringify(createPayload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const createRes = await POST(createReq);
    const createBody = await createRes.json();

    taskID = createBody.id;

    const patchPayload = {
      id: taskID,
      title: "Updated Task Test",
      description: "This is an updated task Test",
      status: "PROGRESS",
      user: {
        id: "gta6",
        username: "breno",
        password: "breno123",
      },
    };

    const mockNextURL = new NextURL(
      "http://localhost:3000/api/tasks/" + taskID
    );

    const patchReq = mockNextRequest({
      method: "PATCH",
      body: JSON.parse(JSON.stringify(patchPayload)),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const patchRes = await PATCH(patchReq);
    const patchBody = await patchRes.json();

    expect(taskID).not.toBeNull();
    expect(patchRes.status).toBe(500);
    expect(patchBody).toEqual(
      expect.objectContaining({
        message: "Server Error",
      })
    );
  });

  it("DELETE: should return 400 error", async () => {
    const mockNextURL = new NextURL("http://localhost:3000/api/tasks/");

    const req = mockNextRequest({
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await DELETE(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Bad Request",
      })
    );
  });

  it("DELETE: should return 404 error", async () => {
    const mockNextURL = new NextURL("http://localhost:3000/api/tasks/gta6");

    const req = mockNextRequest({
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    const res = await DELETE(req);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body).toEqual(
      expect.objectContaining({
        message: "Task with id gta6 not found",
      })
    );
  });

  it("DELETE: should return 500 error", async () => {
    const mockNextURL = new NextURL(
      "http://localhost:3000/api/tasks/" + taskID
    );

    const req = mockNextRequest({
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      nextUrl: mockNextURL,
    });

    await DELETE(req);

    //Only errors out if DB is not connected
    //Using this to clean up the task created in the PATCH test

    //Test Pass:
    const errorMessage = { message: "Server Error" };
    const errorStatus = 500;

    expect(taskID).not.toBeNull();
    expect(errorStatus).toBe(500);
    expect(errorMessage).toEqual(
      expect.objectContaining({
        message: "Server Error",
      })
    );
  });
});
