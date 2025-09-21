

export const users = [
    {id: 0, name: "Egor",           email: "me@192.168.0.10",          isActive: true},
    {id: 1, name: "General Kenobi", email: "kenobi@stujon.spc",     isActive: false},
    {id: 2, name: "You",            email: "totalyNotAScam@g00gle.ru", isActive: true}
];

export const orders = [
    {id: 0, userId: 0, products: ['fox', 'time'],             total: 1199999.99, status: "processed"},
    {id: 1, userId: 2, products: ['complited homework'],      total: 100.00,        status: "arrived"},
    {id: 2, userId: 1, products: ['laser sword', 'bathrobe'], total: 1199.99,    status: "arrived"}, // The sword was deffinetly cheap lol
    {id: 3, userId: 0, products: ['500 kg mango'],            total: 200000.00,  status: "sent"}
];