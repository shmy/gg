export interface Datasource {
  connect: (connectionOptions: ConnectionOptions) => Promise<void>;
  query: (command: string, args?: any[]) => Promise<any>;
  disconnect: () => void;
}
export interface ConnectionOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
