import { SetMetadata } from "@nestjs/common";

import { UserRole } from "../../user/interfaces";

export const Roles = (...roles: Array<UserRole>): ((target: any, key?: any, descriptor?: any) => any) =>
  SetMetadata("roles", [...roles]);
