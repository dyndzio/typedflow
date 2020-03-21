export interface ReposInterface {
  id: number,
  name: string,
  fork: boolean,
  error: string,
  owner: {
    login: string
  },
  branches?: [
    {
      name: string,
      commit: {
        sha: string;
      }
    }
  ]
}
