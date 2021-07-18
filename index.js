import process from 'process'
import readline from 'readline'
import createMemory from "./create-memory.js";
import Cpu from "./cpu.js";
import instructions from "./instruction.js";

const IP = 0
const ACC = 1
const R1 = 2
const R2 = 3

const memory = createMemory(256 * 256)
const writebleBytes = new Uint8Array(memory.buffer)

const cpu = new Cpu(memory)

let i = 0

writebleBytes[i++] = instructions.MOV_LIT_REG
writebleBytes[i++] = 0x12
writebleBytes[i++] = 0x34
writebleBytes[i++] = R1

writebleBytes[i++] = instructions.MOV_LIT_REG
writebleBytes[i++] = 0xAB
writebleBytes[i++] = 0xCD
writebleBytes[i++] = R2

writebleBytes[i++] = instructions.ADD_REG_REG
writebleBytes[i++] = R1
writebleBytes[i++] = R2


writebleBytes[i++] = instructions.MOV_REG_MEM
writebleBytes[i++] = ACC
writebleBytes[i++] = 0x01
writebleBytes[i++] = 0x00

writebleBytes[i++] = instructions.JMP_NOT_EQ
writebleBytes[i++] = 0x00
writebleBytes[i++] = 0x03
writebleBytes[i++] = 0x00
writebleBytes[i++] = 0x00


const rl = readline.createInterface({
       input : process.stdin,
       output: process.stdout
})

rl.on('line', () => {
       cpu.step()
       cpu.debug()
       cpu.viewMermoryAt(cpu.getRegister('ip'))
       cpu.viewMermoryAt(0x0100)
})
