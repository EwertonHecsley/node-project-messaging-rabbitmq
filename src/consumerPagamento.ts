import * as amqp from 'amqplib'
import { logger } from './logger'

export async function consumerPagamento(channel: amqp.Channel) {
    const queue = 'pagamento.processar'
    const exchangePedido = 'pedido.events'

    await channel.consume(
        queue,
        async (msg) => {
            if (!msg) return
            const dados = JSON.parse(msg.content.toString())
            logger.info(`💳 Processando pagamento do pedido ${dados.id}`)

            await new Promise(r => setTimeout(r, 2000))

            const aprovado = Math.random() > 0.4
            const routingKey = aprovado ? 'pedido.pago' : 'pedido.cancelado'
            const evento = {
                pedidoId: dados.id,
                status: aprovado ? 'PAGO' : 'CANCELADO',
                data: new Date().toISOString(),
            }

            channel.publish(exchangePedido, routingKey, Buffer.from(JSON.stringify(evento)), { persistent: true })
            logger.info(`Pagamento do pedido ${dados.id} ${aprovado ? 'APROVADO' : 'RECUSADO'}`)

            channel.ack(msg)
        },
        { noAck: false }
    )
}
