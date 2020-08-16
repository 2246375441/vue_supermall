import {request} from './request';

export function getCategory(){
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}


export const BACKTOP_DISTANCE = 1000

export const POP = 'pop';
export const NEW = 'new';
export const SELL = 'sell';
