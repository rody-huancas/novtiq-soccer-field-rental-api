import { User } from "@modules/users/entities/user.entity";

export interface JwtPayload {
  id: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}