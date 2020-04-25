import dev from './dev.config'
import prod from './prod.config'

const ENV = process.env.NODE_ENV;


export const socketConf = ENV === 'development' ? dev.socketConf : prod.socketConf;
export const cloudRenderConf = ENV === 'development' ? dev.cloudRender : prod.cloudRender;

