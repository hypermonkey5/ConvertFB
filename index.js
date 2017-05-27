const FileConverter = require('./converter.js')
const converter = new FileConverter()
converter.toBuffer(process.argv[2],(buf)=>{
	const {name,data} = converter.toFile(buf)
	const path = process.argv[3] ? process.argv[3] : './tmp/'+name
	converter.writeFile(path,data,()=>{console.log('complete')})
})