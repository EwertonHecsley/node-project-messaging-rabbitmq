import * as amqp from 'amqplib'
import { logger } from './logger'

export function startProdutor(channel: amqp.Channel, intervaloMs: number) {
    const exchangePedido = 'pedido.events'
    const exchangePagamento = 'pagamento.commands'

    let contador = 1

    setInterval(() => {
        const pedido = {
            id: `pedido-${Date.now()}-${contador++}`,
            clienteId: `cliente-${Math.floor(Math.random() * 1000)}`,
            produtos: [
                { id: 'produto1', quantidade: Math.ceil(Math.random() * 3) },
                { id: 'produto2', quantidade: Math.ceil(Math.random() * 2) },
            ],
            valorTotal: Number((Math.random() * 300 + 50).toFixed(2)),
            data: new Date().toISOString(),
        }

        channel.publish(exchangePedido, 'pedido.criado', Buffer.from(JSON.stringify(pedido)), { persistent: true })
        channel.publish(exchangePagamento, 'pagamento.processar', Buffer.from(JSON.stringify(pedido)), { persistent: true })

        logger.info(`🚀 Pedido criado e comando de pagamento enviado: ${pedido.id}`)
    }, intervaloMs)
}
