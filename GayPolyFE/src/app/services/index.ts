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
export const SetOderById = baseURL + 'Product/SetOderById';
export const postProduct = baseURL + 'Product/Create';
export const putProduct = baseURL + 'Product/Update?id=';
export const putDelProduct = baseURL + 'Products/Delete?id=';
export const deleteProduct = baseURL + 'Product/Delete?id=';
export const uploadImge = baseURL + 'Product/UploadImg'
export const uploadGalery = baseURL + 'Product/UploadImgs'
//LoginAPI
export const postLogin = baseURL + 'Account/Login';
export const createAccount = baseURL + 'Account/createAcount';
export const getAccountId= baseURL + 'Account/GetById';
export const getListUser= baseURL + 'Account/GetListUser';
export const lockAccount = baseURL + 'Account/Lock?id=';
export const deleteUser= baseURL + 'Account/Delete?id=';
export const UpdateAccount = baseURL + 'Account/Update?id=';
export const getUserName = baseURL + 'Users/name';
export const GetByEmail = baseURL + 'Account/GetByEmail?email=';
export const ResetPass = baseURL + 'Account/ResetPass';

export const emailservice ='http://servicemail.somee.com/SendMailService/SendMail';
//oderApi
export const getOder = baseURL + 'Oder/GetList';
export const getOderId = baseURL + 'Oder/GetById';
export const getByEmail= baseURL + 'Oder/GetByEmail?email=';
export const createOder = baseURL + 'Oder/Create';
export const updateOder = baseURL + 'Oder/Update?id=';
export const deleteOder = baseURL + 'Oder/Delete?id=';

//voucherApi
export const getVoucher = baseURL + 'Voucher/GetList';
export const getVoucherId = baseURL + 'Voucher/GetById';
export const geVouchertByEmail= baseURL + 'Voucher/GetByEmail?email=';
export const createVoucher = baseURL + 'Voucher/Create';
export const updateVoucher = baseURL + 'Voucher/Update?id=';
export const getVoucherCode = baseURL + 'Voucher/GetByCode?code=';
export const deleteVoucher = baseURL + 'Voucher/Delete?id=';

//category
export const categoryGet = baseURL + 'Category/GetList';
export const categoryGetById= baseURL + 'Category/GetById';
export const updateCategory= baseURL + 'Category/Update?id=';
export const createCategory = baseURL + 'Category/Create';
export const deleteCategory = baseURL + 'Category/Delete?id=';

//category
export const productDetaiCreate = baseURL + 'ProductDetail/Create';
export const productDetaiGet = baseURL + 'ProductDetail/GetList';
export const productDetaiUpdate = baseURL + 'ProductDetail/Update?id=';
export const productDetaiDelete= baseURL + 'ProductDetail/Delete?id=';
export const productGetById= baseURL + 'ProductDetail/GetById';
// export const categoryGetById= baseURL + 'Category/GetById';
// export const updateCategory= baseURL + 'Category/Update?id=';
// export const createCategory = baseURL + 'Category/Create';
// export const deleteCategory = baseURL + 'Category/Delete?id=';

// CommentAPI
export const commentGet = baseURL + 'Comment/GetList';
export const commentGetById = baseURL + 'Comment/GetById';
export const commentCreate = baseURL + 'Comment/Create';
export const commentUpdate = baseURL + 'Comment/Update?id=';
export const commentDelete = baseURL + 'Comment/Delete?id=';
export const commentGetByEmail = baseURL + 'Comment/GetByEmail';
export const commentGetByProductId = baseURL + 'Comment/GetByProductId';
