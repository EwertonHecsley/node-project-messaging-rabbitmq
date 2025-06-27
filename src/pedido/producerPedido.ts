import * as amqp from 'amqplib'

async function publishPedidoCriado() {
    const connection = await amqp.connect('amqp://admin:admin@localhost')
    const channel = await connection.createChannel()

    const exchange = 'pedido.events'
    const routingKey = 'pedido.criado'

    await channel.assertExchange(exchange, 'topic', { durable: true })

    const pedido = {
        id: 'pedido-' + Date.now(),
        clienteId: 'cliente123',
        produtos: [
            { id: 'produto1', quantidade: 2 },
            { id: 'produto2', quantidade: 1 }
        ],
        valorTotal: 150.0,
        data: new Date().toISOString()
    }

    const mensagemBuffer = Buffer.from(JSON.stringify(pedido))

    channel.publish(exchange, routingKey, mensagemBuffer, {
        persistent: true
    })

    console.log(`Evento "pedido.criado" publicado: ${JSON.stringify(pedido)}`)

    await channel.close()
    await connection.close()
}

publishPedidoCriado().catch(console.error)
