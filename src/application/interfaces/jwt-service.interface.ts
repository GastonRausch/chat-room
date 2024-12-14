export abstract class JWTService {
  abstract generateToken(payload: Record<string, any>): Promise<string>;
  abstract verifyToken(token: string): boolean;
  abstract getPermissions(token: string): string[];
}
