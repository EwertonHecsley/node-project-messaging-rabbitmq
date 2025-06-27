import * as amqp from 'amqplib'
import { logger } from './logger'

export async function consumerPedido(channel: amqp.Channel) {
    const queue = 'pedido.status.atualizar'

    await channel.consume(
        queue,
        (msg) => {
            if (!msg) return
            const dados = JSON.parse(msg.content.toString())
            logger.info(`Pedido recebido (consumerPedido): ${dados.id || dados.pedidoId} - Atualizando status`)
            channel.ack(msg)
        },
        { noAck: false }
    )
}
