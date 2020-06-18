const { Pool, Client } = require('pg');
require('dotenv').config();

class DBClass {
    
    constructor () {

        // this._pool = _pool;
        this.pgClient = null;
        this.pool = null;
        this.connected = false;
        this.poolConnected = false;

        this.dbQuery = this.dbQuery.bind(this);

        this.connString = {
            host: process.env.PGHOST,
			database: process.env.PGDATABASE,
			user: process.env.PGUSER,
			password: process.env.PGPASSWORD,
        }
    }

    static async init() {
        const db = new DBClass();
        await db.connect();
        return db;
    }
    
    async poolConnect() {
        console.log('Connect To  Pool ::: ');
        this.client = new Pool(this.connString);
        try {
            await this.pool.connect();
            this.poolConnected = true;
        }catch (err) {
            console.log('Error Connection : ', err);
			throw new Error(err.message);
        }
    }

    async connect() {
        this.client = new Client(this.connString);    
        try {
			await this.client.connect();
			this.connected = true;
		} catch (err) {
            console.log('Error Connection : ', err);
			throw new Error(err.message);
		}
    }

    get Client () {
        return this.client;
    }

    get Query () {
        return this.dbQuery()
    }

    async dbQuery (_query, values) {
        let reponse = null;
        
        try {
            reponse = await this.client.query( _query, values);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }finally {
            this.Client.end();
        }

        return reponse;
    }

    // static getInstance() {
    //     if(!instance) {
    //         instance = new DBClass()
    //     }
    //     return instance
    // }
}


exports.DBClass = DBClass;