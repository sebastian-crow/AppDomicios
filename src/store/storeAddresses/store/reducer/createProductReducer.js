import { createAction, createReducer } from "@reduxjs/toolkit";

// Create Actions
export const createProductAction = createAction("CREATE_PRODUCT_ACTION");
export const createProductDoneAction = createAction("CREATE_PRODUCT_DONE_ACTION");
export const errorCreateProduct = createAction("ERROR_CREATE_PRODUCT");
export const errorGetProducts = createAction("ERROR_GET_PRODUCTS")

// Update product actions
export const updateProductAction = createAction(
    "UPDATE_PRODUCT_ACTION",
);
export const updateProductDoneAction = createAction(
    "UPDATE_PRODUCT_DONE_ACTION",
);
export const errorUpdateProduct = createAction(
    "ERROR_UPDATE_PRODUCT"
)

// Delete product actions
export const deleteProductAction = createAction(
    "DELETE_PRODUCT_ACTION",
);
export const deleteProductDoneAction = createAction(
    "DELETE_PRODUCT_DONE_ACTION",
);
export const errorDeleteProduct = createAction(
    "ERROR_DELETE_PRODUCT",
);


// UI state reducers
const initialState = {
    product: {},
    errorCreate: "",
    errorUpdate: "",
    errorDelete: "",
};

const uiReducer = createReducer(initialState, {
    [createProductAction]: (state, action) => {
        state.product = action.payload.data;
    },
    [createProductDoneAction]: (state, action) => {
        state.product = action.payload.data;
    },
    [deleteProductAction]: (state, action) => {
        state.product = {};
    },
    [deleteProductDoneAction]: (state, action) => {
        state.product.product = {};
    },
    [updateProductDoneAction]: (state, action) => {
        state.product.product = action.payload.data;
    },
    [errorCreateProduct]: (state, action) => {
        state.errorCreate = action.payload;
    },
    [errorUpdateProduct]: (state, action) => {
        state.errorUpdate = action.payload;
    },
    [errorDeleteProduct]: (state, action) => {
        state.errorDelete = action.payload;
    },
});

export default uiReducer;
