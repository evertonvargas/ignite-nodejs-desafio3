export class OrgAlreadyExistError extends Error {
  constructor() {
    super('Org already exists.')
  }
}
