import { formatDate } from '@angular/common';

export const getDateString = (datetime: string) => {
    var datetimeString = formatDate(
        new Date(datetime).toLocaleString(),
        'dd/MM/yyyy hh:mm:ss a',
        'en-US',
        'GMT+07:00'
    );

    var arrDatetime = datetimeString.split(' ');

    arrDatetime.forEach((element) => {
        if (arrDatetime.indexOf(element) === 2) {
            if (element == 'PM') {
                arrDatetime[2] = 'CH';
            } else {
                arrDatetime[2] = 'SA';
            }
        }
    });

    return arrDatetime[0] + ' ' + arrDatetime[1] + ' ' + arrDatetime[2];
};

// Define API


//BrandsAPI
export const host = "https://localhost:44319";
const baseURL = host + '/api/';
export const getAllBrands = baseURL + 'Brands';
export const getBrandsByCatId = baseURL + 'Brands/';
export const getBrandsByBrandId = baseURL + 'Brands/name/';

//CategoriesAPI
export const getAllCategories = baseURL + 'Categories';
export const getCategoriesByCatId = baseURL + 'Categories/name/';
export const getCategoriesByBrandId = baseURL + 'Categories/';

//ProductAPI
export const getAllProduct = baseURL + 'Product/GetList';
export const getProductById = baseURL + 'Product/GetById';
export const postProduct = baseURL + 'Product/Create';
export const putProduct = baseURL + 'Product/Update?id=';
export const putDelProduct = baseURL + 'Products/Delete?id=';
export const deleteProduct = baseURL + 'Product/Delete?id=';
export const uploadImge = baseURL + 'Product/UploadImg'

//LoginAPI
export const postLogin = baseURL + 'Account/Login';
export const getUserName = baseURL + 'Users/name';
