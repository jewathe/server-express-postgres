import { Client, QueryResult } from 'pg';

let client: Client | null = null;

export function connect(): void {
    client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'kiwidatabase',
        user: 'postgres',
        password: 'postgres'
    });

    client.connect((error: Error | undefined) => {
        if (error) {
            throw error;
        }
    });
}

export function query(query: string, values: any[], resultCallback: (result: QueryResult) => void): void {
    if (!client) {
        throw new Error('Client is not connected');
    }

    client.query(query, values, (error: Error | null, result: QueryResult) => {
        if (error) {
            throw error;
        }
        resultCallback(result);
    });
}

export function disconnect(): void {
    if (client) {
        client.end();
    }
}