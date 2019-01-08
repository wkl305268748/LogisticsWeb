import fetch from '@/api/fetch';

export function getCar(id) {
    return fetch({
        url: '/v1/fleet/car/'+id,
        method: 'get'
    });
}

export function getCarList(params) {
    return fetch({
        url: '/v1/fleet/car/page',
        method: 'get',
        params
    });
}

export function getCarListEx(params) {
    return fetch({
        url: '/v1/fleet/car/ex/page',
        method: 'get',
        params
    });
}

export function addCar(params) {
    return fetch({
        url: '/v1/fleet/car',
        method: 'post',
        params
    });
}

export function editCar(params,id) {
    return fetch({
        url: '/v1/fleet/car/'+id,
        method: 'put',
        params
    });
}

export function deleteCar(id) {
    return fetch({
        url: '/v1/fleet/car/'+id,
        method: 'delete'
    });
}
