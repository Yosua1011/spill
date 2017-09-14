function calculate(data) {
    var hasil = []
    var orders = [];
    for(var i = 0; i < data.length; i++) {
        var nama = [];
        // hasil.push(data[i].order)
        data[i].Payees.forEach(rows => {
            nama.push(rows.name)
        })
        var obj = {
            Order: data[i].order,
            Price: data[i].price/nama.length,
            Payees: nama
        }
        orders.push(obj)
    }
    
    for(var a=0; a < data.length; a++) {
        for(var b=0; b < data[a].Payees.length; b++) {
            hasil.push([data[a].Payees[b].OrderPayee.OrderId,data[a].Payees[b].OrderPayee.PayeeId])
        }
    }
    for(var c=0; c < c.length; c++) {
        
    }
    // data[1].Payees.forEach(rows => {
    //     nama.push(rows.name)
    // })

    let result = data[0].Payees[0].name
    let panjang = data
    console.log(data.length)
    console.log(data[0].Payees.length)
    console.log(hasil)
    // return result
    // return hasil
    // return panjang
    // return nama
    // return orders
    return data
}

module.exports = calculate