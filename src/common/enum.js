/**
 * Những mode hiển thị của trang detail
 */
const EditMode = {
    VIEW: 0,
    ADD: 1,
    EDIT: 2,
    DELETE: 3
};

/**
 * Hành động trên trang detail
 */
const Action = {
    INSERT: 1,
    UPDATE: 2,
    DELETE: 0
};

/**
 * Loại load dữ liệu danh sách
 */
const PagingDataType = {
    Data: 0,
    Summary: 1
};

module.exports = {
    EditMode,
    Action,
    PagingDataType
};
