/**
 * Những mode hiển thị của trang detail
 */
const ViewMode = {
    VIEW: 0,
    ADD: 1,
    EDIT: 2,
    DELETE: 3
};

/**
 * Các nút hành động cơ bản trên chương trình
 */
const CommandName = {
    REFRESH: 'REFRESH',
    VIEW: 'VIEW',
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    SAVE: 'SAVE',
    YES: 'YES',
    NO: 'NO',
    CANCEL: 'CANCEL',
    BACK: 'BACK',
};

/**
 * Trạng thái của bản ghi đẩy lên server
 */
const ModelState = {
    None: 0,
    Insert: 1,
    Update: 2,
    Delete: 3,
    Empty: 4,
    Duplicate: 5,
    OverWrite: 6
};

/**
 * Loại load dữ liệu danh sách
 */
const PagingDataType = {
    DATA: 0,
    SUMMARY: 1
};

module.exports = {
    ViewMode,
    CommandName,
    ModelState,
    PagingDataType
};
