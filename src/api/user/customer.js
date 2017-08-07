import fetch from '@/api/fetch';

export function CustomerLogin(params) {
    return fetch({
        url: '/v1/user/customer/loginex',
        method: 'post',
        params
    });
}

export function getInfo(params) {
    return fetch({
        url: '/v1/user/customer/ex/info',
        method: 'get',
        params
    });
}

export function updateInfo(params) {
    return fetch({
        url: '/v1/user/customer/info',
        method: 'put',
        params
    });
}

export function updatePassword(params) {
    return fetch({
        url: '/v1/user/customer/password',
        method: 'put',
        params
    });
}
