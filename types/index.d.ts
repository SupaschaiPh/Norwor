export { userSession };
declare global {
  interface userSession {
    displayName?: String;
    id?: Number;
    username?: String;
  }
}
