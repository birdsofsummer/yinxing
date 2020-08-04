```javascript

const fs=require("mz/fs")
const dns=require("mz/dns")
const zlib=require("mz/zlib")
const crypto=require("mz/crypto")
const readline=require("mz/readline")
const child_process=require("mz/child_process")
const exec = child_process.exec
const fs1=require('fs')
const path=require('path')

const {
    _makeLong,
    basename,
    delimiter,
    dirname,
    extname,
    format,
    isAbsolute,
    join,
    normalize,
    parse,
    posix,
    relative,
    resolve,
    sep,
    toNamespacedPath,
    win32,
}=path


test=async ()=>{
    r1=await fs.exists(__filename)
    r2=await exec('node --version')
    console.log(__filename,r1,r2)
}

//test()



fs.Dir
fs.Dirent
fs.F_OK
fs.FileReadStream
fs.FileWriteStream
fs.R_OK
fs.ReadStream
fs.Stats
fs.W_OK
fs.WriteStream
fs.X_OK
fs._toUnixTimestamp
fs.access
fs.accessSync
fs.appendFile
fs.appendFileSync
fs.chmod
fs.chmodSync
fs.chown
fs.chownSync
fs.close
fs.closeSync
fs.constants
fs.copyFile
fs.copyFileSync
fs.createReadStream
fs.createWriteStream
fs.exists
fs.existsSync
fs.fchmod
fs.fchmodSync
fs.fchown
fs.fchownSync
fs.fdatasync
fs.fdatasyncSync
fs.fstat
fs.fstatSync
fs.fsync
fs.fsyncSync
fs.ftruncate
fs.ftruncateSync
fs.futimes
fs.futimesSync
fs.lchmod
fs.lchmodSync
fs.lchown
fs.lchownSync
fs.link
fs.linkSync
fs.lstat
fs.lstatSync
fs.mkdir
fs.mkdirSync
fs.mkdtemp
fs.mkdtempSync
fs.open
fs.openSync
fs.opendir
fs.opendirSync
fs.promises
fs.read
fs.readFile
fs.readFileSync
fs.readSync
fs.readdir
fs.readdirSync
fs.readlink
fs.readlinkSync
fs.realpath
fs.realpathSync
fs.rename
fs.renameSync
fs.rmdir
fs.rmdirSync
fs.stat
fs.statSync
fs.symlink
fs.symlinkSync
fs.truncate
fs.truncateSync
fs.unlink
fs.unlinkSync
fs.unwatchFile
fs.utimes
fs.utimesSync
fs.watch
fs.watchFile
fs.write
fs.writeFile
fs.writeFileSync
fs.writeSync
fs.writev
fs.writevSync

```
