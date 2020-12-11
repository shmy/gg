import {Connection, createConnection} from "mysql2/promise";
import {ConnectionOptions, Datasource} from "./datasource";

class MysqlDatasource implements Datasource {
  private connection: Connection | undefined;

  async connect(connectionOptions: ConnectionOptions): Promise<void> {
    this.connection = await createConnection({
      host: connectionOptions.host,
      port: connectionOptions.port,
      user: connectionOptions.username,
      password: connectionOptions.password,
      database: connectionOptions.database,
    });
  }

  async query(command: string, args?: any[]): Promise<any> {
    return await this.connection!.query(command, args);
  }

  disconnect(): void {
    this.connection!.destroy();
  }
}

export default MysqlDatasource;
