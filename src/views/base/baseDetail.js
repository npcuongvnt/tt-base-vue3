import { ref, onMounted } from 'vue';
import { useI18n, useStore, useRouter, useRoute, useConfirm, useToast, ENUM, CONSTANT } from '@/composables';

export default (config) => {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const confirm = useConfirm();
    const toast = useToast();

    const loading = ref(false);
    const model = ref({});
    const viewMode = ref(ENUM.ViewMode.ADD);
    const id = ref();

    onMounted(() => {
        console.log('Mounted');
        loading.value = true;

        viewMode.value = config.viewMode; 
        id.value = config.id; 

        setViewMode(viewMode.value);

        var data = await loadData();
        
        beforeBinding(data);
        
        bindingData(data);
        
        afterBinding(data);
    });

    const loadData = async() => {
        return {}
    };

    const beforeBinding = (data) => {

    },

    const bindingData = (data) => {

    },

    const afterBinding = (data) => {

    },

    const setViewMode = (mode) => {
        viewMode.value = mode;
    },

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

    const save = (data) => {
        console.log(data);
    };

    const edit = (data) => {
        console.log(data);
    };

    const deletes = () => {
        let datas = [model.value]

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
        router.back();
    };

    return {
        model,
        viewMode,
        onCommandClick
    };
};
