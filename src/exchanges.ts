import * as amqp from 'amqplib'

export async function setupExchangesQueues(channel: amqp.Channel) {
    await channel.assertExchange('pedido.events', 'topic', { durable: true })
    await channel.assertExchange('pagamento.commands', 'direct', { durable: true })
    await channel.assertExchange('notificacao.events', 'fanout', { durable: true })

    await channel.assertQueue('pagamento.processar', { durable: true })
    await channel.bindQueue('pagamento.processar', 'pagamento.commands', 'pagamento.processar')

    await channel.assertQueue('pedido.status.atualizar', { durable: true })
    await channel.bindQueue('pedido.status.atualizar', 'pedido.events', 'pedido.*')

    await channel.assertQueue('notificacao.enviar', { durable: true })
    await channel.bindQueue('notificacao.enviar', 'pedido.events', 'pedido.pago')
    await channel.bindQueue('notificacao.enviar', 'pedido.events', 'pedido.cancelado')
}
