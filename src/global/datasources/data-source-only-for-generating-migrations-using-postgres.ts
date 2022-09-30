import "reflect-metadata"
import { DataSource } from "typeorm/browser"
import { AssetEntry } from "../../modules/biodata-entries/entities/biodata-entry.entity"
import { TransactionEntry } from "../../modules/clinical-records-entries/entities/clinical-entry.entity"

//Here, I use postgres driver to create migrations for production environment
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "testmigration",
    synchronize: false,
    logging: false,
    entities: [TransactionEntry, AssetEntry],
    migrations: [process.cwd() + '/src/migrations/*.ts'],
    subscribers: [],
})
