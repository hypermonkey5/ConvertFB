const fs = require('fs')
class FileConverter{
	constructor(){
	}

	toBuffer(path,call){
		// まずはファイルの読み込み
		this.readFile(path)
			.then((dataBuffer)=>{ // 読み込みが完了したら

				const name = this.getFileName(path) // ファイル名
				const length = name.length // ファイル名の長さ

				const nameBuffer = new Buffer(name, 'utf-8') // ファイル名をバッファにする

				const tmpUInt8Array = new Uint8Array(1)
				tmpUInt8Array[0] = length
				const lengthBuffer = new Buffer(tmpUInt8Array.buffer) // ファイル名の長さをバッファにする
				// 一度uint8arrayに入れてからバッファに変換
				// uint8に変換するのがめんどいため

				const fullBuffer = Buffer.concat([dataBuffer, nameBuffer, lengthBuffer]) // 丸ごとひとつのバッファにする．
				// [構成]始めのnバイト: ファイル，次のmバイト: ファイル名，最後の1バイト: ファイル名のバッタの長さ(m)

				call(fullBuffer) // コールバック
			})
	}

	// ファイル読み込み
	readFile(path){
		return new Promise((resolve)=>{
			fs.readFile(path,(err,buf)=>{
				if(err){
					throw err
					return
				} else {
					resolve(buf)
				}
			})
		})
	}

	// パスからファイル名を取得
	getFileName(path){
		return path.split('/').pop()
	}

	// バッファから名前とデータを取得
	toFile(buf,call){
		const length = buf.readUInt8(buf.length-1)
		const name = buf.toString('utf-8', buf.length-1-length,buf.length-1)
		const data = buf.slice(0,buf.length-1-length)
		return {name,data}

		// TODO エラー処理
	}

	// 一応書き込みも対応
	writeFile(path,data,call){
		return new Promise((resolve)=>{
			fs.writeFile(path,data,(err)=>{
				if(err){
					throw err
					return
				} else {
					resolve()
				}
			})
		})
	}
}

module.exports = FileConverter