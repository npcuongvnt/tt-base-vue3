import { ref, onMounted } from 'vue';
import { useI18n, useStore, useRouter, useConfirm, useToast, ENUM, CONSTANT } from '@/composables';

export default (config) => {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const confirm = useConfirm();
    const toast = useToast();

    const module = ref();
    const model = ref({});
    const loading = ref(false);
    const viewMode = ref();
    const id = ref();

    onMounted(async () => {
        console.log('Mounted');
        loading.value = true;

        if (config) {
            viewMode.value = config.viewMode || ENUM.ViewMode.ADD;
            id.value = config.id;
            module.value = config.module;
        }

        var data = await loadData();

        beforeBinding(data);

        bindingData(data);

        setFormMode(viewMode.value);
    });

    const beforeBinding = (data) => {
        console.log(data);
    };

    const bindingData = (data) => {
        model.value = data;
    };

    const setFormMode = (mode) => {
        viewMode.value = mode;

        //unmask
        loading.value = false;
    };

    const onCommandClick = (commandName) => {
        switch (commandName) {
            case CONSTANT.CommandName.SAVE:
                save();
                break;
            case CONSTANT.CommandName.EDIT:
                edit();
                break;
            case CONSTANT.CommandName.DELETE:
                deletes();
                break;
            case CONSTANT.CommandName.BACK:
                back();
                break;
        }
    };

    const save = (fnCallback) => {
        //TODO

        if (typeof fnCallback === 'function') {
            fnCallback();
        }
    };

    const edit = () => {
        //TODO
    };

    const checkChange = () => {};

    const deletes = () => {
        let datas = [model.value];

        confirm.require({
            header: t('message.HeaderDelete'),
            message: t('message.MessageDelete'),
            icon: 'pi pi-info-circle',
            rejectLabel: t('commandname.CANCEL'),
            acceptLabel: t('commandname.DELETE'),
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: () => {
                let deleteParam = {
                    Ignores: [],
                    Models: datas,
                    Ids: [id.value]
                };

                store.dispatch(`${module}/delete`, deleteParam).then((res) => {
                    if (res) {
                        toast.add({ severity: 'success', summary: t('message.SummaryAcceptDelete'), detail: t('message.DetailAcceptDelete'), life: 3000 });

                        //back lại danh sách
                        back();
                    }
                });
            },
            reject: () => {
                toast.add({ severity: 'info', summary: t('message.SummaryRejectDelete'), detail: t('message.DetailRejectDelete'), life: 2000 });
            }
        });
    };

    const back = () => {
        let doBack = true;
        if (viewMode.value === ENUM.ViewMode.ADD || viewMode.value === ENUM.ViewMode.EDIT) {
            if (checkChange()) {
                doBack = false;
            }
        }

        if (doBack) {
            router.back();
        } else {
            confirm.require({
                header: t('message.HeaderCheckChange'),
                message: t('message.MessageCheckChange'),
                icon: 'pi pi-info-circle',
                rejectLabel: t('commandname.CANCEL'),
                acceptLabel: t('commandname.SAVE'),
                rejectClass: 'p-button-secondary p-button-outlined',
                accept: () => {
                    const fnCallback = () => {
                        router.back();
                    };
                    save(fnCallback);
                },
                reject: () => {
                    router.back();
                }
            });
        }
    };

    const loadData = async () => {
        let result = {},
            param = {
                id: id.value
            };

        switch (viewMode.value) {
            case ENUM.ViewMode.ADD:
                result = await store.dispatch(`${module.value}/new`, param);
                break;
            case ENUM.ViewMode.EDIT:
                result = await store.dispatch(`${module.value}/getById`, param);
                break;
        }

        return result;
    };

    return {
        model,
        viewMode,
        onCommandClick
    };
};
