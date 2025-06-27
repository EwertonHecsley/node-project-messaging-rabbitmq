import * as amqp from 'amqplib'
import { setupExchangesQueues } from './exchanges'
import { consumerPedido } from './consumerPedido'
import { consumerPagamento } from './consumerPagamento'
import { consumerNotificacao } from './consumerNotificacao'
import { startProdutor } from './produtor'

async function main() {
    const connection = await amqp.connect('amqp://admin:admin@localhost')
    const channel = await connection.createChannel()

    await setupExchangesQueues(channel)

    // Inicializa consumidores
    consumerPedido(channel)
    consumerPagamento(channel)
    consumerNotificacao(channel)

    // Inicia produtor com intervalo de 10 segundos
    startProdutor(channel, 10000)

    console.log('🐇 Sistema iniciado: consumidores ativos e produção automática de pedidos a cada 10s.')
}

main().catch(console.error)
