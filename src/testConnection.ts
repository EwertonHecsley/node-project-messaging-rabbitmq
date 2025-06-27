import * as amqp from 'amqplib'

async function testConnection() {
    try {
        const connection = await amqp.connect('amqp://admin:admin@localhost')
        console.log('✅ Conexão com RabbitMQ estabelecida com sucesso!')
        await connection.close()
    } catch (err) {
        console.error('❌ Falha ao conectar com RabbitMQ:', err)
    }
}

testConnection()
