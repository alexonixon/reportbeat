exports.find = function find(db, name) {
    return new Promise((resolve, reject) => {
        try{
            db.get('mysql').find({ name: name }).value()
            return resolve(db.get('mysql').find({ name: name }).value())
        }catch(e){
           return reject(e) 
        }
    })
}

exports.findAll = function findAll(db) {
    return new Promise((resolve, reject) => {
        try{
            db.get('mysql').value()
            return resolve(db.get('mysql').value())
        }catch(e){
           return reject(e) 
        }
    })
}

exports.post = function post(db, params) {
    return new Promise((resolve, reject) => {
        try{
            db.get('mysql')
            .push(params)
            .last()
            .assign({ id: Date.now().toString() })
            .write()
            return resolve(true)
        }catch(e){
           return reject(e) 
        }
    })
}

exports.del = function del(db, name){
    return new Promise((resolve, reject) => {
        try{
            console.log('name ---', name)
            if(db.get('mysql').find({name : name}).value()){
                db.get('mysql').remove({name : name}).write()
                return resolve('delete successfully')
            }else{
                return reject(new Error('name for delete - Not Found'))
            }

        }catch(e){
            console.log('e - ', e)
           return reject(e) 
        }
    })    
}