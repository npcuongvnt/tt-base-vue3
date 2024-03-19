/**
 * Những mode hiển thị của trang detail
 */
const ViewMode = {
    VIEW: 0,
    ADD: 1,
    EDIT: 2
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

const ExampleStatus = {
    None: 0,
    Send: 1,
    Reject: 2
};

export {
    ViewMode, 
    ModelState, 
    PagingDataType,
    ExampleStatus
};
