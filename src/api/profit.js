import fetch from '@/api/fetch';

export function getProfitList(params) {
    return fetch({
        url: '/v1/profit/page',
        method: 'get',
        params
    });
}

export function addRecive(id,params) {
    return fetch({
        url: '/v1/profit/recive/' + id,
        method: 'put',
        params
    });
}
export function addPay(id,params) {
    return fetch({
        url: '/v1/profit/pay/' + id,
        method: 'put',
        params
    });
}
