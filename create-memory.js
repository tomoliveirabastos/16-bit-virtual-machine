const createMemory = sizeBytes => {
       const ab = new ArrayBuffer(sizeBytes)
       const dv = new DataView(ab)

       return dv
}

export default createMemory