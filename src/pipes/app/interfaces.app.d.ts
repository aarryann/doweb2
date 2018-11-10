interface IProcessEnv extends NodeJS.ProcessEnv {
  REACT_APP_TOKEN_NAME: string;
  REACT_APP_SOCKET_URL: string;
  REACT_APP_API_URL: string;
}

interface IProcess extends NodeJS.Process {
  env: IProcessEnv;
}
