import { DataSource } from 'typeorm';
import "reflect-metadata"

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: '1234',  
    database: 'rentx',
});

dataSource.initialize();