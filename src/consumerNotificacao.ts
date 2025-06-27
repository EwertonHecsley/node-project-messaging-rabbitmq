import * as amqp from 'amqplib'
import { logger } from './logger'

export async function consumerNotificacao(channel: amqp.Channel) {
    const queue = 'notificacao.enviar'

    await channel.consume(
        queue,
        (msg) => {
            if (!msg) return
            const dados = JSON.parse(msg.content.toString())
            if (msg.fields.routingKey === 'pedido.pago') {
                logger.info(`🔔 Notificação: Pedido ${dados.pedidoId} pago com sucesso.`)
            } else if (msg.fields.routingKey === 'pedido.cancelado') {
                logger.error(`🔕 Notificação: Pedido ${dados.pedidoId} cancelado.`)
            }
            channel.ack(msg)
        },
        { noAck: false }
    )
}
