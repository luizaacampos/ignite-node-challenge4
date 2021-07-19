import { Request, Response } from "express";
import { validate } from "uuid";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    if (!user_id || !validate(user_id)) {
      return response
        .status(400)
        .json({ error: "id is required and must be an uuid!" });
    }

    try {
      const user = this.showUserProfileUseCase.execute({ user_id });

      return response.json(user);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }
}

export { ShowUserProfileController };
