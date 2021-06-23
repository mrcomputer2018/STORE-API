import pg from "pg";

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }
    //* Criando o pool para agilizar a conexao com o banco
    const pool = new pg.Pool({
       connectionString: "postgres://mgkwxtyu:TAKB4CEoG5--tuAxliHoM7wL0-Ja1ZW7@batyr.db.elephantsql.com/mgkwxtyu"
    })
    //* Colocando como global para nao criar varios pools
    // * a aplicacao nao ficar lenta
    global.connection = pool;
    return pool.connect();
}

export {
    connect
};