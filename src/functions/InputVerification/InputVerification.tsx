export function usernameCharValid(username: string): boolean {
  return /^[0-9a-zA-Z_.-]+$/.test(username);
}
