import amqp from 'amqplib'

async function setup() {
    const connection = await amqp.connect('amqp://admin:admin@localhost')
    const channel = await connection.createChannel()

    // Exchanges
    await channel.assertExchange('pedido.events', 'topic', { durable: true })
    await channel.assertExchange('pagamento.commands', 'direct', { durable: true })
    await channel.assertExchange('notificacao.events', 'fanout', { durable: true })

    // Filas e bindings
    await channel.assertQueue('pagamento.processar', { durable: true })
    await channel.bindQueue('pagamento.processar', 'pagamento.commands', 'pagamento.processar')

    await channel.assertQueue('pedido.status.atualizar', { durable: true })
    await channel.bindQueue('pedido.status.atualizar', 'pedido.events', 'pedido.*')

    await channel.assertQueue('notificacao.enviar', { durable: true })
    await channel.bindQueue('notificacao.enviar', 'notificacao.events', '')

    console.log('RabbitMQ setup completo ✅')
    await channel.close()
    await connection.close()
}

setup().catch((err) => {
    console.error('Erro ao configurar RabbitMQ:', err)
})
