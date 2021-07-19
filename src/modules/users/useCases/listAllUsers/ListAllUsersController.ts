import { Request, Response } from "express";
import { validate } from "uuid";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    if (!user_id || typeof user_id !== "string" || !validate(user_id)) {
      return response
        .status(400)
        .json({ error: "Id is required and must be a uuid!" });
    }

    try {
      const allUsers = this.listAllUsersUseCase.execute({ user_id });

      return response.json(allUsers);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListAllUsersController };
