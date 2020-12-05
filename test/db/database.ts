import 'dotenv/config';
import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create(): Promise<void> {
    await createConnection();
  },

  async close(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    for (const entity of entities) {
      if (entity.tableName !== 'user') {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      }
    }
  },
};
export default connection;
