<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';

const store = useStore();
const router = useRouter();
const { layoutConfig } = useLayout();
const username = ref('');
const password = ref('');
const checked = ref(false);
const loading = ref(false);
const message = ref('');
// const loginLabel = $t('resource_authen.sign_in');

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

/**
 * Đăng nhập
 */
function signIn() {
    message.value = '';
    loading.value = true;

    store.dispatch('auth/login', { userName: username.value, password: password.value }).then(
        (res) => {
            //request done
            loading.value = false;

            if (res?.success) {
                router.push({
                    name: 'dashboard'
                });
            } else {
                let loginResMessage = 'Đăng nhập thất bại';
                switch (res?.responseCode) {
                    case 'WRONG_USERNAME_OR_PASSWORD':
                        loginResMessage = 'Sai tên đăng nhập hoặc mật khẩu';
                        break;
                    case 'NOT_EXIST_USER':
                        loginResMessage = 'Không tồn tại người dùng';
                        break;
                }
                message.value = loginResMessage;
            }
        },
        (error) => {
            console.log(error);
            message.value = error.message;
            loading.value = false;
        }
    );
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">{{ $t('resource_authen.welcome') }}</div>
                        <span class="text-600 font-medium">{{ $t('resource_authen.sign_to_continue') }}</span>
                    </div>

                    <div>
                        <label for="username1" class="block text-900 text-xl font-medium mb-2">{{ $t('resource_authen.username') }}</label>
                        <InputText id="username1" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="username" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">{{ $t('resource_authen.password') }}</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="p-error mb-3" v-if="message">{{ message }}</div>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">{{ $t('resource_authen.remember') }}</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">{{ $t('resource_authen.forgot_password') }}</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" :loading="loading" @click="signIn()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
