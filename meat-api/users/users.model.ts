const users = [
    {id: '1', name: 'Leandro Bellini', email: 'leandro@gmail.com'},
    {id: '2', name: 'Aline Silva', email: 'aline@uol.com'}
]

export class User{
    static findAll(): Promise<any[]>{   //metodo estático nao preciso estanciar classe para chamar
        return Promise.resolve(users)
    }

    static findById(id: String): Promise<any>{
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id == id)
            let user = undefined
            if(filtered.length > 0)
                user = filtered[0]
            resolve(user)
        })
    }
}